import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { emoji: "😊", label: "Happy", color: "var(--gold)" },
  { emoji: "😌", label: "Calm", color: "var(--sage)" },
  { emoji: "😔", label: "Sad", color: "var(--muted-foreground)" },
  { emoji: "😰", label: "Anxious", color: "var(--destructive)" },
  { emoji: "😤", label: "Frustrated", color: "var(--accent)" },
  { emoji: "🙏", label: "Grateful", color: "var(--healing-green)" },
];

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void;
  onDismiss: () => void;
}

const MoodTracker = ({ onMoodSelect, onDismiss }: MoodTrackerProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelected(label);
    setTimeout(() => {
      onMoodSelect(label);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="rounded-2xl border p-5 mb-3 mx-1"
      style={{ background: "rgba(0,0,0,0.4)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(24px)" }}
    >
      <p className="font-display text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>How are you feeling right now?</p>
      <p className="font-body text-[11px] mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>Tracking your mood helps us support you better 🌱</p>

      <div className="grid grid-cols-3 gap-2.5">
        {moods.map((mood) => {
          const isSelected = selected === mood.label;
          return (
            <motion.button
              key={mood.label}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSelect(mood.label)}
              className="flex flex-col items-center gap-1 py-3 rounded-xl border transition-all duration-200"
              style={{
                background: isSelected
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.05)",
                borderColor: isSelected
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: isSelected
                  ? "0 0 16px rgba(255,255,255,0.1)"
                  : "none",
              }}
            >
              <motion.span
                animate={isSelected ? { scale: [1, 1.3, 1.1] } : {}}
                className="text-2xl"
              >
                {mood.emoji}
              </motion.span>
              <span
                className="font-body text-[10px] font-medium"
                style={{
                  color: isSelected ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                }}
              >
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={onDismiss}
        className="w-full mt-3 text-[11px] font-body text-muted-foreground"
      >
        Skip for now
      </button>
    </motion.div>
  );
};

export default MoodTracker;
