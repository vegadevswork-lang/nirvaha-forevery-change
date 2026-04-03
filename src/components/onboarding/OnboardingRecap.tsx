import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { questions } from "./onboardingData";

interface Props {
  answers: number[];
}

const recapIcons = ["🎯", "🧠", "💎", "🛤️", "⏱️"];
const recapLabels = ["Your focus is", "When stressed, you", "You're seeking", "You'll explore through", "You'll start with"];

const OnboardingRecap = ({ answers }: Props) => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => navigate("/home"), 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={exiting ? { opacity: 0, scale: 0.95, y: -20 } : { opacity: 1 }}
      transition={{ duration: exiting ? 0.8 : 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center w-full max-w-sm mx-auto px-4 relative"
    >
      {/* Expanding glow on exit */}
      {exiting && (
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none z-50"
          style={{
            background: "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--healing-green)) 40%, transparent 70%)",
          }}
        />
      )}

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display text-2xl sm:text-3xl text-foreground mb-8 font-semibold"
      >
        So, to recap
      </motion.h1>

      <div className="flex flex-col gap-4 w-full mb-10">
        {answers.map((answerIdx, qIdx) => {
          const q = questions[qIdx];
          if (!q || answerIdx == null) return null;
          const chosen = q.options[answerIdx];
          if (!chosen) return null;

          return (
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + qIdx * 0.12 }}
              className="glass-card px-5 py-4 flex items-center gap-4"
            >
              <span className="text-2xl flex-shrink-0">{recapIcons[qIdx] || "✨"}</span>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  {recapLabels[qIdx] || "You chose"}
                </p>
                <p className="font-body text-sm font-semibold text-foreground mt-0.5">
                  {chosen.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        onClick={handleEnter}
        disabled={exiting}
        className="btn-primary max-w-xs text-base tracking-wide"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Enter Nirvaha
      </motion.button>
    </motion.div>
  );
};

export default OnboardingRecap;
