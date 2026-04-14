import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NirvahaIntroProps {
  onComplete: () => void;
}

interface Particle {
  angle: number;
  radius: number;
  targetRadius: number;
  size: number;
  alpha: number;
  speed: number;
  drift: number;
  phase: number;
}

const DURATION = 4000; // total animation ms
const PARTICLE_COUNT = 180;
const BOKEH_COUNT = 8;

const NirvahaIntro = ({ onComplete }: NirvahaIntroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const startRef = useRef(0);
  const animRef = useRef(0);

  const createParticles = useCallback((cx: number, cy: number): Particle[] => {
    const baseRadius = Math.min(cx, cy) * 0.55;
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: baseRadius * (0.8 + Math.random() * 0.4),
      targetRadius: 0,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.4,
      speed: 0.8 + Math.random() * 1.5,
      drift: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;

    const particles = createParticles(cx, cy);
    const bokeh = Array.from({ length: BOKEH_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 20 + Math.random() * 40,
      alpha: 0.03 + Math.random() * 0.06,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }));

    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, w, h);

      // Bokeh orbs
      bokeh.forEach((b) => {
        b.x += b.speedX;
        b.y += b.speedY;
        if (b.x < -50) b.x = w + 50;
        if (b.x > w + 50) b.x = -50;
        if (b.y < -50) b.y = h + 50;
        if (b.y > h + 50) b.y = -50;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
        const bokehAlpha = b.alpha * (1 - progress * 0.7);
        grad.addColorStop(0, `rgba(255,255,255,${bokehAlpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Phase 1 (0-0.6): Swirling ring
      // Phase 2 (0.6-0.85): Particles converge to center
      // Phase 3 (0.85-1): Fade particles, show logo

      particles.forEach((p) => {
        // Swirl
        p.angle += p.speed * 0.015;

        let currentRadius: number;
        let currentAlpha: number;

        if (progress < 0.6) {
          // Swirling ring with slight pulse
          const pulse = Math.sin(elapsed * 0.003 + p.phase) * 8;
          currentRadius = p.radius + pulse + p.drift * elapsed * 0.01;
          currentAlpha = p.alpha * Math.min(progress / 0.15, 1);
        } else if (progress < 0.85) {
          // Converge to center
          const convergeProgress = (progress - 0.6) / 0.25;
          const ease = convergeProgress * convergeProgress * (3 - 2 * convergeProgress); // smoothstep
          currentRadius = p.radius * (1 - ease);
          currentAlpha = p.alpha;
        } else {
          // Fade out
          const fadeProgress = (progress - 0.85) / 0.15;
          currentRadius = p.radius * 0.05;
          currentAlpha = p.alpha * (1 - fadeProgress);
        }

        const x = cx + Math.cos(p.angle) * currentRadius;
        const y = cy + Math.sin(p.angle) * currentRadius;

        // Glow
        const glowSize = p.size * 4;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glow.addColorStop(0, `rgba(255,255,255,${currentAlpha * 0.3})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(255,255,255,${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connecting lines between nearby particles (ring phase only)
      if (progress < 0.7) {
        const lineAlpha = progress < 0.6 ? 0.06 : 0.06 * (1 - (progress - 0.6) / 0.1);
        for (let i = 0; i < particles.length; i += 3) {
          const p1 = particles[i];
          const x1 = cx + Math.cos(p1.angle) * p1.radius;
          const y1 = cy + Math.sin(p1.angle) * p1.radius;
          for (let j = i + 3; j < particles.length; j += 3) {
            const p2 = particles[j];
            const x2 = cx + Math.cos(p2.angle) * p2.radius;
            const y2 = cy + Math.sin(p2.angle) * p2.radius;
            const dx = x1 - x2;
            const dy = y1 - y2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 40) {
              ctx.strokeStyle = `rgba(255,255,255,${lineAlpha * (1 - dist / 40)})`;
              ctx.lineWidth = 0.3;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
      }

      if (progress >= 0.78 && !showLogo) {
        setShowLogo(true);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    // Logo show then fade
    const logoTimer = setTimeout(() => setShowLogo(true), DURATION * 0.78);
    const fadeTimer = setTimeout(() => setFadeOut(true), DURATION + 800);
    const completeTimer = setTimeout(onComplete, DURATION + 1400);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [createParticles, onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="nirvaha-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* NIRVAHA logo text */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                <h1
                  className="font-display text-4xl md:text-6xl font-bold tracking-[0.35em] text-white"
                  style={{
                    textShadow: "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)",
                  }}
                >
                  NIRVAHA
                </h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="h-[1px] w-32 md:w-48 bg-white/30 origin-center"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip */}
          <button
            onClick={onComplete}
            className="absolute bottom-10 right-6 font-body text-xs tracking-wider text-white/40 hover:text-white/70 transition-colors uppercase z-20"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default NirvahaIntro;
