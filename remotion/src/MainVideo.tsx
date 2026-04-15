import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600"],
  subsets: ["latin"],
});

const BRAND_GREEN = "#4a7c59";
const BRAND_GREEN_LIGHT = "#6ba37a";

/*
 * Animation timeline (18s @ 30fps = 540 frames):
 *
 * Phase 1 (0–90):    Ambient darkness, first light streak sweeps left→right
 * Phase 2 (90–210):  Multiple light beams sweep & trace, building energy
 * Phase 3 (210–300): Light converges to center, flare blooms, letters emerge dark
 * Phase 4 (300–380): Letters reveal with brand green color + glow
 * Phase 5 (380–440): Divider line + "COLLECTION" subtitle appears
 * Phase 6 (440–540): Hold with gentle shimmer, elegant fade to black
 */

/* ── Light streak component ─────────────────────────────────── */
const LightStreak = ({
  frame,
  startFrame,
  duration,
  startX,
  startY,
  endX,
  endY,
  width: w,
  warmth = 0.5,
}: {
  frame: number;
  startFrame: number;
  duration: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  warmth?: number;
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < -10 || localFrame > duration + 30) return null;

  const progress = interpolate(localFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [duration - 15, duration + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cx = startX + (endX - startX) * progress;
  const cy = startY + (endY - startY) * progress;

  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const opacity = fadeIn * fadeOut;

  // Chromatic aberration colors
  const warmColor = `rgba(255, ${180 + warmth * 75}, ${100 + warmth * 50}, ${opacity * 0.9})`;
  const coolColor = `rgba(${150 - warmth * 50}, ${180 + warmth * 30}, 255, ${opacity * 0.4})`;

  return (
    <>
      {/* Main bright core */}
      <div
        style={{
          position: "absolute",
          left: cx - w * 2,
          top: cy - 2,
          width: w * 4,
          height: 4,
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${opacity}) 30%, rgba(255,255,255,${opacity}) 70%, transparent 100%)`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "center center",
          filter: "blur(1px)",
        }}
      />
      {/* Warm glow */}
      <div
        style={{
          position: "absolute",
          left: cx - w * 3,
          top: cy - 20,
          width: w * 6,
          height: 40,
          background: `radial-gradient(ellipse, ${warmColor} 0%, transparent 70%)`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "center center",
          filter: "blur(8px)",
        }}
      />
      {/* Cool chromatic edge */}
      <div
        style={{
          position: "absolute",
          left: cx - w * 2.5,
          top: cy - 30,
          width: w * 5,
          height: 60,
          background: `radial-gradient(ellipse, ${coolColor} 0%, transparent 60%)`,
          transform: `rotate(${angle + 2}deg)`,
          transformOrigin: "center center",
          filter: "blur(15px)",
        }}
      />
      {/* Bright head flare */}
      <div
        style={{
          position: "absolute",
          left: cx - 30,
          top: cy - 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.8}) 0%, rgba(255,245,220,${opacity * 0.3}) 40%, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />
    </>
  );
};

/* ── Central flare bloom ────────────────────────────────────── */
const CenterFlare = ({ frame }: { frame: number }) => {
  const opacity = interpolate(
    frame,
    [200, 260, 310, 350],
    [0, 0.9, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(frame, [200, 280], [0.3, 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (opacity <= 0) return null;

  return (
    <>
      {/* Core white flash */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          width: 400,
          height: 8,
          marginLeft: -200,
          marginTop: -4,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,${opacity}) 30%, rgba(255,255,255,${opacity}) 70%, transparent)`,
          transform: `scaleX(${scale})`,
          filter: "blur(2px)",
        }}
      />
      {/* Vertical cross flare */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          width: 4,
          height: 200,
          marginLeft: -2,
          marginTop: -100,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${opacity * 0.5}) 30%, rgba(255,255,255,${opacity * 0.5}) 70%, transparent)`,
          transform: `scaleY(${scale * 0.6})`,
          filter: "blur(3px)",
        }}
      />
      {/* Warm bloom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          width: 600,
          height: 300,
          marginLeft: -300,
          marginTop: -150,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(255,220,160,${opacity * 0.3}) 0%, rgba(255,200,100,${opacity * 0.1}) 40%, transparent 70%)`,
          transform: `scale(${scale})`,
          filter: "blur(30px)",
        }}
      />
    </>
  );
};

/* ── Main composition ───────────────────────────────────────── */
export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Light streaks timeline ──
  const streaks = [
    // Phase 1: Initial sweep from left
    { start: 15, dur: 50, x1: -200, y1: 520, x2: 2100, y2: 480, w: 180, warmth: 0.7 },
    // Phase 2: Multiple crossing beams
    { start: 70, dur: 45, x1: 2100, y1: 300, x2: -200, y2: 550, w: 150, warmth: 0.3 },
    { start: 100, dur: 55, x1: -200, y1: 400, x2: 1200, y2: 380, w: 200, warmth: 0.6 },
    { start: 120, dur: 40, x1: 1800, y1: 200, x2: 400, y2: 600, w: 120, warmth: 0.4 },
    { start: 145, dur: 50, x1: -100, y1: 600, x2: 2000, y2: 350, w: 160, warmth: 0.8 },
    // Phase 2b: Tighter beams converging to center area
    { start: 170, dur: 45, x1: 2100, y1: 500, x2: 700, y2: 460, w: 140, warmth: 0.5 },
    { start: 185, dur: 50, x1: -200, y1: 350, x2: 1300, y2: 470, w: 170, warmth: 0.6 },
    { start: 200, dur: 40, x1: 960, y1: -50, x2: 960, y2: 550, w: 100, warmth: 0.9 },
    // Phase 3: Final convergence to center
    { start: 220, dur: 35, x1: -100, y1: 490, x2: 960, y2: 490, w: 200, warmth: 0.7 },
    { start: 230, dur: 35, x1: 2020, y1: 490, x2: 960, y2: 490, w: 200, warmth: 0.7 },
  ];

  // ── Title: NIRVAHA ──
  const title = "NIRVAHA";
  const titleRevealStart = 290;

  // ── Subtitle: COLLECTION ──
  const subtitle = "COLLECTION";
  const subRevealStart = 400;

  // ── Global fade out ──
  const globalFade = interpolate(frame, [490, 540], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Ambient particles (very subtle floating dust) ──
  const dustParticles = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 137.508 + 20) % 100,
    y: (i * 61.803 + 10) % 100,
    size: 1 + (i % 2),
    speed: 0.2 + (i % 4) * 0.1,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", opacity: globalFade }}>
      {/* Very subtle ambient gradient — barely visible */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(15,15,15,1) 0%, rgba(0,0,0,1) 100%)`,
        }}
      />

      {/* Ambient dust particles */}
      {dustParticles.map((p, i) => {
        const pOpacity = interpolate(
          frame,
          [60 + i * 5, 90 + i * 5, 480, 530],
          [0, 0.15, 0.2, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const px = p.x + Math.sin(frame * 0.01 + i * 2) * 2;
        const py = p.y - frame * p.speed * 0.05;
        const wpy = ((py % 100) + 100) % 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${px}%`,
              top: `${wpy}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,1)",
              opacity: pOpacity,
            }}
          />
        );
      })}

      {/* Light streaks */}
      {streaks.map((s, i) => (
        <LightStreak
          key={i}
          frame={frame}
          startFrame={s.start}
          duration={s.dur}
          startX={s.x1}
          startY={s.y1}
          endX={s.x2}
          endY={s.y2}
          width={s.w}
          warmth={s.warmth}
        />
      ))}

      {/* Center flare bloom */}
      <CenterFlare frame={frame} />

      {/* ── NIRVAHA title — per-letter reveal ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 20,
        }}
      >
        {title.split("").map((letter, i) => {
          const letterDelay = titleRevealStart + i * 10;

          // Dark silhouette phase (appears first)
          const darkReveal = interpolate(
            frame,
            [letterDelay - 20, letterDelay],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Color fill phase
          const colorSpring = spring({
            frame: frame - letterDelay,
            fps,
            config: { damping: 25, stiffness: 60, mass: 1.5 },
          });

          // Glow intensity
          const glowIntensity = interpolate(
            frame,
            [letterDelay, letterDelay + 20, letterDelay + 60],
            [0, 1, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const letterY = interpolate(colorSpring, [0, 1], [20, 0]);
          const letterScale = interpolate(colorSpring, [0, 1], [0.95, 1]);

          // Subtle shimmer
          const shimmer = Math.sin(frame * 0.03 + i * 1.2) * 0.06 + 0.94;

          // Color transition: dark → green
          const colorMix = interpolate(colorSpring, [0, 1], [0, 1]);
          const r = Math.round(30 + (74 - 30) * colorMix);
          const g = Math.round(30 + (124 - 30) * colorMix);
          const b = Math.round(30 + (89 - 30) * colorMix);

          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 140,
                fontWeight: 300,
                letterSpacing: 12,
                color: `rgb(${r},${g},${b})`,
                opacity: darkReveal * shimmer,
                transform: `translateY(${letterY}px) scale(${letterScale})`,
                textShadow:
                  glowIntensity > 0.01
                    ? `0 0 ${40 * glowIntensity}px rgba(255,255,255,${glowIntensity * 0.5}), 0 0 ${80 * glowIntensity}px rgba(74,124,89,${glowIntensity * 0.4}), 0 0 ${120 * glowIntensity}px rgba(74,124,89,${glowIntensity * 0.2})`
                    : "none",
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ── Horizontal divider ── */}
      {(() => {
        const lineSpring = spring({
          frame: frame - (subRevealStart - 15),
          fps,
          config: { damping: 200 },
        });
        const lineOpacity = interpolate(
          frame,
          [subRevealStart - 15, subRevealStart, 490, 530],
          [0, 0.5, 0.5, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52.5%",
              transform: "translateX(-50%)",
              width: 240 * lineSpring,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${BRAND_GREEN_LIGHT}, transparent)`,
              opacity: lineOpacity,
            }}
          />
        );
      })()}

      {/* ── COLLECTION subtitle ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "56%",
          transform: "translate(-50%, 0)",
          display: "flex",
          gap: 4,
        }}
      >
        {subtitle.split("").map((letter, i) => {
          const lDelay = subRevealStart + i * 5;
          const lSpring = spring({
            frame: frame - lDelay,
            fps,
            config: { damping: 30, stiffness: 80 },
          });
          const lOpacity = interpolate(lSpring, [0, 1], [0, 1]);
          const lY = interpolate(lSpring, [0, 1], [12, 0]);

          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 30,
                fontWeight: 400,
                letterSpacing: 18,
                color: BRAND_GREEN_LIGHT,
                opacity: lOpacity,
                transform: `translateY(${lY}px)`,
                textShadow: `0 0 20px rgba(74,124,89,0.3)`,
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ── Subtle vignette ── */}
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
