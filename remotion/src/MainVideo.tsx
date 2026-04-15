import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
});

const GREEN = "#4a7c59";
const GREEN_LIGHT = "#6ba37a";

/*
 * Timeline (19s @ 30fps = 570 frames):
 *
 * 0–60:    Black. A single soft beam fades in from left edge.
 * 60–120:  Beam sweeps rightward across the frame (slow, elegant).
 * 120–150: Beam reaches first letter position, slows, deposits "N".
 * 150–180: Beam continues, deposits "I".
 * 180–210: Beam deposits "R".
 * 210–240: Beam deposits "V".
 * 240–270: Beam deposits "A".
 * 270–300: Beam deposits "H".
 * 300–330: Beam deposits final "A", beam fades out.
 * 330–400: All letters glow brighter — hero reveal bloom.
 * 400–440: "COLLECTION" subtitle + divider appear.
 * 440–520: Hold with gentle shimmer.
 * 520–570: Elegant fade to black.
 */

const TITLE = "NIRVAHA";

// Letter x-positions (centered around 960)
const LETTER_SPACING = 110;
const TITLE_WIDTH = (TITLE.length - 1) * LETTER_SPACING;
const TITLE_START_X = 960 - TITLE_WIDTH / 2;
const LETTER_POSITIONS = TITLE.split("").map((_, i) => TITLE_START_X + i * LETTER_SPACING);

// Each letter deposits at these frames
const DEPOSIT_START = 120;
const DEPOSIT_GAP = 28; // frames between each letter deposit
const LETTER_DEPOSIT_FRAMES = TITLE.split("").map((_, i) => DEPOSIT_START + i * DEPOSIT_GAP);

const BEAM_Y = 475; // vertical center for beam

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Beam position along X axis ──
  // Beam enters from -200 and travels to each letter position, pausing briefly at each
  const beamProgress = interpolate(
    frame,
    [20, 60, ...LETTER_DEPOSIT_FRAMES, LETTER_DEPOSIT_FRAMES[6] + 25],
    [-200, -100, ...LETTER_POSITIONS, LETTER_POSITIONS[6] + 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Beam visibility
  const beamOpacity = interpolate(
    frame,
    [10, 40, LETTER_DEPOSIT_FRAMES[6], LETTER_DEPOSIT_FRAMES[6] + 35],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Beam length varies — shorter when depositing, longer when traveling
  const isDepositing = LETTER_DEPOSIT_FRAMES.some(
    (f) => frame >= f - 5 && frame <= f + 15
  );
  const beamLength = isDepositing ? 120 : 280;

  // ── Hero reveal bloom (after all letters deposited) ──
  const heroBloom = interpolate(
    frame,
    [340, 390, 430, 520, 560],
    [0, 0.6, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Global fade ──
  const globalFade = interpolate(frame, [520, 570], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Particles trailing the beam ──
  const trailParticles = Array.from({ length: 30 }, (_, i) => {
    const age = (frame - 30 - i * 4) * 0.8;
    if (age < 0 || age > 60) return null;
    const trailX = interpolate(
      frame - i * 4,
      [20, 60, ...LETTER_DEPOSIT_FRAMES, LETTER_DEPOSIT_FRAMES[6] + 25],
      [-200, -100, ...LETTER_POSITIONS, LETTER_POSITIONS[6] + 200],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const drift = Math.sin(i * 2.1 + frame * 0.05) * (15 + i * 0.8);
    const particleOpacity = interpolate(age, [0, 5, 40, 60], [0, 0.5, 0.2, 0]);
    const size = interpolate(age, [0, 60], [2.5, 0.5]);
    return { x: trailX - i * 8, y: BEAM_Y + drift, opacity: particleOpacity * beamOpacity, size };
  });

  // ── Ambient floating dust ──
  const dust = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.508 + 15) % 100,
    y: (i * 61.803 + 8) % 100,
    size: 1 + (i % 2),
  }));

  // ── Subtitle ──
  const subtitle = "COLLECTION";
  const subStart = 405;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: globalFade }}>
      {/* Ambient dust */}
      {dust.map((d, i) => {
        const dOp = interpolate(
          frame,
          [40 + i * 6, 80 + i * 6, 510, 560],
          [0, 0.08, 0.12, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const dx = d.x + Math.sin(frame * 0.008 + i * 3) * 1.5;
        const dy = ((d.y - frame * 0.02 * (0.3 + (i % 3) * 0.1)) % 100 + 100) % 100;
        return (
          <div
            key={`d${i}`}
            style={{
              position: "absolute",
              left: `${dx}%`,
              top: `${dy}%`,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              backgroundColor: "#fff",
              opacity: dOp,
            }}
          />
        );
      })}

      {/* ── THE BEAM ── */}
      {beamOpacity > 0.01 && (
        <>
          {/* Core bright line */}
          <div
            style={{
              position: "absolute",
              left: beamProgress - beamLength,
              top: BEAM_Y - 1.5,
              width: beamLength,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${beamOpacity * 0.3}) 20%, rgba(255,255,255,${beamOpacity}) 80%, rgba(255,255,255,${beamOpacity}) 100%)`,
              filter: "blur(0.5px)",
            }}
          />
          {/* Warm glow around beam */}
          <div
            style={{
              position: "absolute",
              left: beamProgress - beamLength * 1.3,
              top: BEAM_Y - 25,
              width: beamLength * 1.6,
              height: 50,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,220,160,${beamOpacity * 0.15}) 30%, rgba(255,240,200,${beamOpacity * 0.35}) 85%, rgba(255,255,255,${beamOpacity * 0.4}) 100%)`,
              filter: "blur(12px)",
            }}
          />
          {/* Cool chromatic fringe */}
          <div
            style={{
              position: "absolute",
              left: beamProgress - beamLength * 1.5,
              top: BEAM_Y - 40,
              width: beamLength * 1.8,
              height: 80,
              background: `linear-gradient(90deg, transparent 0%, rgba(120,160,255,${beamOpacity * 0.06}) 40%, rgba(180,200,255,${beamOpacity * 0.1}) 90%, transparent 100%)`,
              filter: "blur(20px)",
            }}
          />
          {/* Bright head point */}
          <div
            style={{
              position: "absolute",
              left: beamProgress - 20,
              top: BEAM_Y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,${beamOpacity * 0.9}) 0%, rgba(255,245,220,${beamOpacity * 0.4}) 40%, transparent 70%)`,
              filter: "blur(3px)",
            }}
          />
          {/* Vertical cross-flare at head */}
          <div
            style={{
              position: "absolute",
              left: beamProgress - 1,
              top: BEAM_Y - 50,
              width: 2,
              height: 100,
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,${beamOpacity * 0.3}) 40%, rgba(255,255,255,${beamOpacity * 0.3}) 60%, transparent)`,
              filter: "blur(2px)",
            }}
          />
        </>
      )}

      {/* ── Trail particles ── */}
      {trailParticles.map((p, i) => {
        if (!p) return null;
        return (
          <div
            key={`tp${i}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "rgba(255,240,210,1)",
              opacity: p.opacity,
              filter: `blur(${p.size > 1.5 ? 1 : 0}px)`,
            }}
          />
        );
      })}

      {/* ── LETTERS — deposited one by one ── */}
      {TITLE.split("").map((letter, i) => {
        const depositFrame = LETTER_DEPOSIT_FRAMES[i];
        const localFrame = frame - depositFrame;

        // Letter doesn't exist before deposit
        if (localFrame < -5) return null;

        // Initial flash (beam deposits letter)
        const flashIntensity = interpolate(
          localFrame,
          [-5, 0, 8, 25],
          [0, 1, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Letter opacity: emerges from beam
        const letterSpring = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 35, stiffness: 50, mass: 1.8 },
        });

        // Start dark, transition to green during hero reveal
        const heroPhase = interpolate(
          frame,
          [340, 400],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const r = Math.round(25 + (74 - 25) * heroPhase);
        const g = Math.round(28 + (124 - 28) * heroPhase);
        const b = Math.round(25 + (89 - 25) * heroPhase);

        // Subtle per-letter shimmer during hold
        const shimmer = frame > 400
          ? Math.sin(frame * 0.025 + i * 1.4) * 0.05 + 0.95
          : 1;

        const letterY = interpolate(letterSpring, [0, 1], [8, 0]);
        const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]) * shimmer;

        // Hero glow per letter
        const heroGlow = interpolate(
          frame,
          [350 + i * 5, 390 + i * 5, 440],
          [0, 1, 0.5],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div key={i} style={{ position: "absolute", left: LETTER_POSITIONS[i], top: BEAM_Y, transform: "translate(-50%, -50%)" }}>
            {/* Deposit flash */}
            {flashIntensity > 0.01 && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 80,
                  height: 80,
                  marginLeft: -40,
                  marginTop: -40,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(255,255,255,${flashIntensity * 0.7}) 0%, rgba(255,240,200,${flashIntensity * 0.3}) 40%, transparent 70%)`,
                  filter: "blur(8px)",
                }}
              />
            )}
            {/* The letter */}
            <span
              style={{
                fontFamily,
                fontSize: 140,
                fontWeight: 300,
                letterSpacing: 8,
                color: `rgb(${r},${g},${b})`,
                opacity: letterOpacity,
                transform: `translateY(${letterY}px)`,
                display: "inline-block",
                textShadow: heroGlow > 0.01
                  ? `0 0 ${30 * heroGlow}px rgba(74,124,89,${heroGlow * 0.5}), 0 0 ${60 * heroGlow}px rgba(74,124,89,${heroGlow * 0.25}), 0 0 ${100 * heroGlow}px rgba(74,124,89,${heroGlow * 0.1})`
                  : "none",
              }}
            >
              {letter}
            </span>
          </div>
        );
      })}

      {/* ── Hero bloom (centered glow after full reveal) ── */}
      {heroBloom > 0.01 && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y,
              width: 900,
              height: 200,
              marginLeft: -450,
              marginTop: -100,
              background: `radial-gradient(ellipse, rgba(74,124,89,${heroBloom * 0.25}) 0%, rgba(74,124,89,${heroBloom * 0.08}) 50%, transparent 80%)`,
              filter: "blur(40px)",
            }}
          />
          {/* Subtle horizontal light sweep during hero reveal */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y - 1,
              width: interpolate(frame, [345, 395], [0, 700], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              height: 2,
              marginLeft: -350,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${heroBloom * 0.15}), transparent)`,
              filter: "blur(1px)",
            }}
          />
        </>
      )}

      {/* ── Divider line ── */}
      {(() => {
        const lineSpring = spring({
          frame: frame - 395,
          fps,
          config: { damping: 200 },
        });
        const lineOp = interpolate(
          frame,
          [393, 405, 515, 560],
          [0, 0.4, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y + 85,
              transform: "translateX(-50%)",
              width: 200 * lineSpring,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GREEN_LIGHT}, transparent)`,
              opacity: lineOp,
            }}
          />
        );
      })()}

      {/* ── COLLECTION subtitle ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: BEAM_Y + 110,
          transform: "translate(-50%, 0)",
          display: "flex",
          gap: 3,
        }}
      >
        {subtitle.split("").map((letter, i) => {
          const lDelay = subStart + i * 4;
          const lSpring = spring({
            frame: frame - lDelay,
            fps,
            config: { damping: 30, stiffness: 80 },
          });
          const lOp = interpolate(lSpring, [0, 1], [0, 1]) *
            interpolate(frame, [515, 560], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const lY = interpolate(lSpring, [0, 1], [10, 0]);

          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: 16,
                color: GREEN_LIGHT,
                opacity: lOp,
                transform: `translateY(${lY}px)`,
                display: "inline-block",
                textShadow: `0 0 15px rgba(74,124,89,0.2)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ── Vignette ── */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
