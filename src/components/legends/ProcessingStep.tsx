import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "The mind is everything. What you think, you become.",
  "In the middle of difficulty lies opportunity.",
  "Peace comes from within. Do not seek it without.",
  "The journey of a thousand miles begins with a single step.",
  "Be the change you wish to see in the world.",
  "Strength does not come from physical capacity. It comes from an indomitable will.",
];

const ProcessingStep = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
      {/* Breathing mandala */}
      <div className="relative mb-10">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full"
            style={{
              width: 120 + ring * 50,
              height: 120 + ring * 50,
              top: -(ring * 25),
              left: -(ring * 25),
              border: `1.5px solid hsla(var(--healing-green) / ${0.25 - ring * 0.07})`,
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              delay: ring * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--gold) / 0.12))",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-4xl">🪷</span>
        </motion.div>
      </div>

      <h2 className="font-display text-xl text-foreground font-semibold mb-2">
        Creating your moment...
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-8">
        Blending your essence with timeless wisdom
      </p>

      {/* Rotating quotes */}
      <motion.p
        key={quoteIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="font-display text-base text-muted-foreground italic max-w-[280px] leading-relaxed"
      >
        "{quotes[quoteIndex]}"
      </motion.p>
    </div>
  );
};

export default ProcessingStep;
