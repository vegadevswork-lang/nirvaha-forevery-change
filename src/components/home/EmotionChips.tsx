import { motion } from "framer-motion";

const emotions = [
  { label: "Calm", emoji: "🍃" },
  { label: "Overwhelmed", emoji: "🌊" },
  { label: "Lost", emoji: "🌫️" },
  { label: "Anxious", emoji: "💭" },
  { label: "Exploring", emoji: "✨" },
];

interface EmotionChipsProps {
  selected: string | null;
  onSelect: (label: string, e: React.MouseEvent) => void;
}

const EmotionChips = ({ selected, onSelect }: EmotionChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.15 }}
    className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide"
  >
    {emotions.map((e) => {
      const isSelected = selected === e.label;
      return (
        <motion.button
          key={e.label}
          whileTap={{ scale: 0.93 }}
          onClick={(ev) => onSelect(e.label, ev)}
          className="relative overflow-hidden rounded-2xl px-3.5 py-2 text-sm font-body flex items-center gap-1.5 flex-shrink-0 transition-all duration-300 border"
          style={{
            background: isSelected ? "hsla(var(--healing-green) / 0.12)" : "hsla(var(--glass-bg))",
            borderColor: isSelected ? "hsl(var(--primary))" : "hsla(var(--glass-border))",
            backdropFilter: "blur(12px)",
            boxShadow: isSelected ? "0 0 16px hsla(var(--healing-green) / 0.12)" : undefined,
          }}
        >
          <span className="text-sm">{e.emoji}</span>
          <span className={`transition-colors duration-300 text-xs ${
            isSelected ? "text-foreground font-medium" : "text-muted-foreground"
          }`}>
            {e.label}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

export default EmotionChips;
