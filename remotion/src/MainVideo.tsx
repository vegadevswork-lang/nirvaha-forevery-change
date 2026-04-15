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
const GREEN_BRIGHT = "#5ecc7e";
const GREEN_LIGHT = "#6ba37a";

/*
 * Timeline (12s @ 30fps = 360 frames):
 *
 * 0–30:    Black. Arrow glow appears from left.
 * 30–50:   Arrow speeds across, accelerating.
 * 50–70:   Arrow deposits "N" with flash.
 * 70–85:   Arrow deposits "I".
 * 85–100:  Arrow deposits "R".
 * 100–115: Arrow deposits "V".
 * 115–130: Arrow deposits "A".
 * 130–145: Arrow deposits "H".
 * 145–165: Arrow deposits final "A", arrow fades with trail.
 * 165–230: Hero bloom — letters glow bright green, dramatic reveal.
 * 230–270: "COLLECTION" subtitle + divider appear.
 * 270–330: Hold with shimmer.
 * 330–360: Elegant fade to black.
 */

const TITLE = "NIRVAHA";
const LETTER_SPACING = 105;
const TITLE_WIDTH = (TITLE.length - 1) * LETTER_SPACING;
const TITLE_START_X = 960 - TITLE_WIDTH / 2;
const LETTER_POSITIONS = TITLE.split("").map((_, i) => TITLE_START_X + i * LETTER_SPACING);

const DEPOSIT_START = 55;
const DEPOSIT_GAP = 16;
const LETTER_DEPOSIT_FRAMES = TITLE.split("").map((_, i) => DEPOSIT_START + i * DEPOSIT_GAP);
const LAST_DEPOSIT = LETTER_DEPOSIT_FRAMES[6];

const BEAM_Y = 470;

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Arrow position (fast, sweeping) ──
  const arrowX = interpolate(
    frame,
    [15, 40, ...LETTER_DEPOSIT_FRAMES, LAST_DEPOSIT + 18],
    [-300, -50, ...LETTER_POSITIONS, LETTER_POSITIONS[6] + 400],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow visibility
  const arrowOpacity = interpolate(
    frame,
    [8, 25, LAST_DEPOSIT - 5, LAST_DEPOSIT + 22],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow shape — elongated when traveling, compact when depositing
  const isDepositing = LETTER_DEPOSIT_FRAMES.some(
    (f) => frame >= f - 3 && frame <= f + 8
  );
  const arrowLength = isDepositing ? 90 : 220;

  // ── Hero bloom ──
  const heroBloom = interpolate(
    frame,
    [170, 210, 260, 325, 355],
    [0, 0.9, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Global fade ──
  const globalFade = interpolate(frame, [330, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Arrow trail particles ──
  const trailParticles = Array.from({ length: 24 }, (_, i) => {
    const age = (frame - 20 - i * 3) * 1.0;
    if (age < 0 || age > 40) return null;
    const trailX = interpolate(
      frame - i * 3,
      [15, 40, ...LETTER_DEPOSIT_FRAMES, LAST_DEPOSIT + 18],
      [-300, -50, ...LETTER_POSITIONS, LETTER_POSITIONS[6] + 400],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const drift = Math.sin(i * 2.3 + frame * 0.07) * (12 + i * 0.6);
    const pOp = interpolate(age, [0, 3, 25, 40], [0, 0.6, 0.15, 0]);
    const size = interpolate(age, [0, 40], [3, 0.5]);
    return { x: trailX - i * 10, y: BEAM_Y + drift, opacity: pOp * arrowOpacity, size };
  });

  // ── Ambient dust ──
  const dust = Array.from({ length: 16 }, (_, i) => ({
    x: (i * 137.508 + 15) % 100,
    y: (i * 61.803 + 8) % 100,
    size: 1 + (i % 2),
  }));

  // ── Subtitle ──
  const subtitle = "COLLECTION";
  const subStart = 240;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: globalFade }}>
      {/* Ambient dust */}
      {dust.map((d, i) => {
        const dOp = interpolate(
          frame,
          [30 + i * 4, 60 + i * 4, 320, 355],
          [0, 0.06, 0.1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const dx = d.x + Math.sin(frame * 0.01 + i * 3) * 1.2;
        const dy = ((d.y - frame * 0.025 * (0.3 + (i % 3) * 0.1)) % 100 + 100) % 100;
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

      {/* ── THE ARROW ── */}
      {arrowOpacity > 0.01 && (
        <>
          {/* Arrow core — bright leading edge tapering back */}
          <div
            style={{
              position: "absolute",
              left: arrowX - arrowLength,
              top: BEAM_Y - 1.5,
              width: arrowLength,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${arrowOpacity * 0.15}) 30%, rgba(255,255,255,${arrowOpacity * 0.8}) 85%, rgba(255,255,255,${arrowOpacity}) 100%)`,
              filter: "blur(0.3px)",
            }}
          />
          {/* Warm golden aura */}
          <div
            style={{
              position: "absolute",
              left: arrowX - arrowLength * 1.4,
              top: BEAM_Y - 20,
              width: arrowLength * 1.8,
              height: 40,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,220,140,${arrowOpacity * 0.12}) 40%, rgba(255,240,180,${arrowOpacity * 0.35}) 90%, rgba(255,255,230,${arrowOpacity * 0.45}) 100%)`,
              filter: "blur(10px)",
            }}
          />
          {/* Green-tinted glow (brand color) */}
          <div
            style={{
              position: "absolute",
              left: arrowX - arrowLength * 1.6,
              top: BEAM_Y - 35,
              width: arrowLength * 2,
              height: 70,
              background: `linear-gradient(90deg, transparent 0%, rgba(74,124,89,${arrowOpacity * 0.08}) 50%, rgba(94,204,126,${arrowOpacity * 0.12}) 95%, transparent 100%)`,
              filter: "blur(18px)",
            }}
          />
          {/* Arrowhead point */}
          <div
            style={{
              position: "absolute",
              left: arrowX - 15,
              top: BEAM_Y - 15,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,${arrowOpacity * 0.95}) 0%, rgba(255,250,220,${arrowOpacity * 0.5}) 35%, transparent 70%)`,
              filter: "blur(2px)",
            }}
          />
          {/* Arrowhead chevron shape */}
          <div
            style={{
              position: "absolute",
              left: arrowX - 6,
              top: BEAM_Y - 8,
              width: 0,
              height: 0,
              borderTop: `8px solid transparent`,
              borderBottom: `8px solid transparent`,
              borderLeft: `14px solid rgba(255,255,255,${arrowOpacity * 0.7})`,
              filter: "blur(1px)",
            }}
          />
          {/* Vertical cross-flare */}
          <div
            style={{
              position: "absolute",
              left: arrowX - 1,
              top: BEAM_Y - 40,
              width: 2,
              height: 80,
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,${arrowOpacity * 0.25}) 35%, rgba(255,255,255,${arrowOpacity * 0.25}) 65%, transparent)`,
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
              backgroundColor: "rgba(255,245,210,1)",
              opacity: p.opacity,
              filter: `blur(${p.size > 2 ? 1 : 0}px)`,
            }}
          />
        );
      })}

      {/* ── LETTERS ── */}
      {TITLE.split("").map((letter, i) => {
        const depositFrame = LETTER_DEPOSIT_FRAMES[i];
        const localFrame = frame - depositFrame;

        if (localFrame < -3) return null;

        // Deposit flash — brighter and more dramatic
        const flashIntensity = interpolate(
          localFrame,
          [-3, 0, 5, 18],
          [0, 1, 0.7, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Letter spring — snappier
        const letterSpring = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 25, stiffness: 120, mass: 1.2 },
        });

        // Color transition: white flash → dim → bright green hero
        const heroPhase = interpolate(
          frame,
          [170, 220],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Start with a subtle warm tone, transition to vivid green
        const initialR = 60, initialG = 65, initialB = 55;
        const heroR = 94, heroG = 204, heroB = 126;
        const r = Math.round(initialR + (heroR - initialR) * heroPhase);
        const g = Math.round(initialG + (heroG - initialG) * heroPhase);
        const b = Math.round(initialB + (heroB - initialB) * heroPhase);

        // Per-letter shimmer
        const shimmer = frame > 230
          ? Math.sin(frame * 0.03 + i * 1.5) * 0.04 + 0.96
          : 1;

        const letterY = interpolate(letterSpring, [0, 1], [6, 0]);
        const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]) * shimmer;

        // Hero glow — much stronger
        const heroGlow = interpolate(
          frame,
          [175 + i * 4, 215 + i * 4, 270],
          [0, 1, 0.65],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div key={i} style={{ position: "absolute", left: LETTER_POSITIONS[i], top: BEAM_Y, transform: "translate(-50%, -50%)" }}>
            {/* Deposit flash — green-white burst */}
            {flashIntensity > 0.01 && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 100,
                    height: 100,
                    marginLeft: -50,
                    marginTop: -50,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(255,255,255,${flashIntensity * 0.85}) 0%, rgba(94,204,126,${flashIntensity * 0.4}) 35%, transparent 70%)`,
                    filter: "blur(6px)",
                  }}
                />
                {/* Vertical flash spike */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 2,
                    height: 60 * flashIntensity,
                    marginLeft: -1,
                    marginTop: -30 * flashIntensity,
                    background: `linear-gradient(180deg, transparent, rgba(255,255,255,${flashIntensity * 0.5}), transparent)`,
                    filter: "blur(1px)",
                  }}
                />
              </>
            )}
            {/* The letter */}
            <span
              style={{
                fontFamily,
                fontSize: 130,
                fontWeight: 300,
                letterSpacing: 6,
                color: `rgb(${r},${g},${b})`,
                opacity: letterOpacity,
                transform: `translateY(${letterY}px)`,
                display: "inline-block",
                textShadow: heroGlow > 0.01
                  ? `0 0 ${25 * heroGlow}px rgba(94,204,126,${heroGlow * 0.7}), 0 0 ${55 * heroGlow}px rgba(74,124,89,${heroGlow * 0.4}), 0 0 ${90 * heroGlow}px rgba(74,124,89,${heroGlow * 0.15})`
                  : flashIntensity > 0.01
                    ? `0 0 ${20 * flashIntensity}px rgba(255,255,255,${flashIntensity * 0.6})`
                    : "none",
              }}
            >
              {letter}
            </span>
          </div>
        );
      })}

      {/* ── Hero bloom (full word glow) ── */}
      {heroBloom > 0.01 && (
        <>
          {/* Wide green bloom behind title */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y,
              width: 1000,
              height: 250,
              marginLeft: -500,
              marginTop: -125,
              background: `radial-gradient(ellipse, rgba(94,204,126,${heroBloom * 0.2}) 0%, rgba(74,124,89,${heroBloom * 0.1}) 45%, transparent 75%)`,
              filter: "blur(45px)",
            }}
          />
          {/* Bright center line sweep */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y - 1,
              width: interpolate(frame, [175, 215], [0, 800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              height: 2,
              marginLeft: -400,
              background: `linear-gradient(90deg, transparent, rgba(94,204,126,${heroBloom * 0.25}), rgba(255,255,255,${heroBloom * 0.15}), rgba(94,204,126,${heroBloom * 0.25}), transparent)`,
              filter: "blur(1px)",
            }}
          />
          {/* Ambient green haze */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y,
              width: 600,
              height: 400,
              marginLeft: -300,
              marginTop: -200,
              background: `radial-gradient(ellipse, rgba(74,124,89,${heroBloom * 0.06}) 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        </>
      )}

      {/* ── Divider line ── */}
      {(() => {
        const lineSpring = spring({
          frame: frame - 232,
          fps,
          config: { damping: 200 },
        });
        const lineOp = interpolate(
          frame,
          [230, 242, 325, 355],
          [0, 0.45, 0.45, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: BEAM_Y + 80,
              transform: "translateX(-50%)",
              width: 180 * lineSpring,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GREEN_BRIGHT}, transparent)`,
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
          top: BEAM_Y + 105,
          transform: "translate(-50%, 0)",
          display: "flex",
          gap: 2,
        }}
      >
        {subtitle.split("").map((letter, i) => {
          const lDelay = subStart + i * 3;
          const lSpring = spring({
            frame: frame - lDelay,
            fps,
            config: { damping: 28, stiffness: 90 },
          });
          const lOp = interpolate(lSpring, [0, 1], [0, 1]) *
            interpolate(frame, [325, 355], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const lY = interpolate(lSpring, [0, 1], [8, 0]);

          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 26,
                fontWeight: 400,
                letterSpacing: 14,
                color: GREEN_LIGHT,
                opacity: lOp,
                transform: `translateY(${lY}px)`,
                display: "inline-block",
                textShadow: `0 0 12px rgba(94,204,126,0.25)`,
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
