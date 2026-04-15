import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";

const { fontFamily } = loadFont("normal", { weights: ["300", "400", "600"], subsets: ["latin"] });

// Colors from the reference logo
const BRAND_GREEN = "#4a7c59";
const BRAND_GREEN_LIGHT = "#6ba37a";
const BRAND_GREEN_GLOW = "rgba(74, 124, 89, 0.6)";

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background gradient shift
  const bgShift = interpolate(frame, [0, 300], [0, 20], { extrapolateRight: "clamp" });

  // Phase 1: Ambient atmosphere builds (0-90)
  // Phase 2: Title reveals letter by letter (60-180)
  // Phase 3: Subtitle + glow bloom (150-240)
  // Phase 4: Hold + gentle fade (240-300)

  // Ambient floating light orbs
  const orbs = [
    { x: 35, y: 40, size: 300, delay: 0, speed: 0.008 },
    { x: 65, y: 55, size: 250, delay: 10, speed: 0.006 },
    { x: 50, y: 30, size: 200, delay: 20, speed: 0.01 },
    { x: 25, y: 65, size: 180, delay: 30, speed: 0.007 },
    { x: 75, y: 35, size: 220, delay: 15, speed: 0.009 },
  ];

  // Central glow bloom
  const glowOpacity = interpolate(frame, [60, 150, 240, 290], [0, 0.4, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowScale = interpolate(frame, [60, 180], [0.5, 1.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Title animation
  const title = "NIRVAHA";
  const subtitle = "C O L L E C T I O N";

  // Overall fade out at end
  const fadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Horizontal line
  const lineProgress = spring({ frame: frame - 140, fps, config: { damping: 200 } });
  const lineOpacity = interpolate(frame, [270, 295], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [165, 195, 270, 295], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [165, 195], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Gentle floating particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 137.508) % 100,
    y: (i * 61.803) % 100,
    size: 1 + (i % 3),
    speed: 0.3 + (i % 5) * 0.15,
    delay: i * 3,
    drift: (i % 2 === 0 ? 1 : -1) * (0.5 + (i % 4) * 0.3),
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0f0c" }}>
      {/* Deep gradient background with subtle movement */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% ${50 + bgShift * 0.3}%, rgba(20, 40, 28, 0.8) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at ${48 + Math.sin(frame * 0.02) * 3}% ${45 + Math.cos(frame * 0.015) * 3}%, rgba(30, 55, 38, 0.4) 0%, transparent 60%),
            linear-gradient(180deg, #080d0a 0%, #0c1510 40%, #0a1210 70%, #070b08 100%)
          `,
        }}
      />

      {/* Floating ambient orbs */}
      {orbs.map((orb, i) => {
        const orbOpacity = interpolate(
          frame,
          [orb.delay, orb.delay + 60, 260, 295],
          [0, 0.12, 0.15, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const ox = orb.x + Math.sin(frame * orb.speed + i) * 4;
        const oy = orb.y + Math.cos(frame * orb.speed * 0.7 + i * 2) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${ox}%`,
              top: `${oy}%`,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${BRAND_GREEN_GLOW} 0%, transparent 70%)`,
              opacity: orbOpacity,
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
          />
        );
      })}

      {/* Floating micro particles */}
      {particles.map((p, i) => {
        const pFrame = Math.max(0, frame - p.delay);
        const pOpacity = interpolate(
          frame,
          [p.delay, p.delay + 30, 260, 295],
          [0, 0.3 + (i % 3) * 0.15, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const px = p.x + Math.sin(pFrame * 0.02 + i) * p.drift * 3;
        const py = p.y - pFrame * p.speed * 0.15;
        const wrappedY = ((py % 100) + 100) % 100;

        return (
          <div
            key={`p-${i}`}
            style={{
              position: "absolute",
              left: `${px}%`,
              top: `${wrappedY}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: BRAND_GREEN_LIGHT,
              opacity: pOpacity,
            }}
          />
        );
      })}

      {/* Central glow bloom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: 600,
          height: 200,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          background: `radial-gradient(ellipse, ${BRAND_GREEN_GLOW} 0%, rgba(74, 124, 89, 0.15) 40%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(50px)",
        }}
      />

      {/* Main title: NIRVAHA — per-letter reveal */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: 28,
          opacity: fadeOut,
        }}
      >
        {title.split("").map((letter, i) => {
          const letterDelay = 70 + i * 8;
          const letterSpring = spring({
            frame: frame - letterDelay,
            fps,
            config: { damping: 30, stiffness: 80, mass: 1.2 },
          });
          const letterOpacity = interpolate(letterSpring, [0, 1], [0, 1]);
          const letterY = interpolate(letterSpring, [0, 1], [30, 0]);
          const letterBlur = interpolate(letterSpring, [0, 0.5, 1], [8, 3, 0]);

          // Subtle shimmer on each letter
          const shimmer = Math.sin(frame * 0.04 + i * 0.8) * 0.08 + 0.92;

          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 130,
                fontWeight: 300,
                letterSpacing: 8,
                color: BRAND_GREEN,
                opacity: letterOpacity * shimmer,
                transform: `translateY(${letterY}px)`,
                filter: `blur(${letterBlur}px)`,
                textShadow: `0 0 60px ${BRAND_GREEN_GLOW}, 0 0 120px rgba(74, 124, 89, 0.2)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Horizontal divider line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "54%",
          transform: "translateX(-50%)",
          width: 280 * lineProgress,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${BRAND_GREEN_LIGHT}, transparent)`,
          opacity: lineOpacity * 0.5,
        }}
      />

      {/* Subtitle: COLLECTION */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "57%",
          transform: `translate(-50%, ${subtitleY}px)`,
          fontFamily,
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: 16,
          color: BRAND_GREEN_LIGHT,
          opacity: subtitleOpacity,
          textShadow: `0 0 30px ${BRAND_GREEN_GLOW}`,
        }}
      >
        {subtitle}
      </div>

      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 50%, rgba(5, 8, 6, 0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Film grain overlay */}
      <AbsoluteFill
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
