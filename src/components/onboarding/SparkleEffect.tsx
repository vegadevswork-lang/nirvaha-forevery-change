import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
}

const COLORS = ["#D6B36A", "#A8CFC4", "rgba(255,255,255,0.8)"];

interface SparkleEffectProps {
  origin: { x: number; y: number } | null;
  trigger: number;
}

const SparkleEffect = ({ origin, trigger }: SparkleEffectProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!origin || trigger === 0) return;

    const count = 12 + Math.floor(Math.random() * 8);
    const newSparkles: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: origin.x,
      y: origin.y,
      size: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8,
      distance: 30 + Math.random() * 50,
    }));

    setSparkles(newSparkles);
    const timer = setTimeout(() => setSparkles([]), 700);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <AnimatePresence>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{
            position: "fixed",
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            scale: 0.3,
            opacity: 1,
          }}
          animate={{
            left: s.x + Math.cos(s.angle) * s.distance - s.size / 2,
            top: s.y + Math.sin(s.angle) * s.distance - s.size / 2,
            scale: [0.3, 1.2, 0],
            opacity: [1, 0.8, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 + Math.random() * 0.2, ease: "easeOut" }}
          className="pointer-events-none z-50"
          style={{
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default SparkleEffect;
