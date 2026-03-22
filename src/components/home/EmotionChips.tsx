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
    className="flex flex-wrap gap-2 mb-8"
  >
    {emotions.map((e) => (
      <motion.button
        key={e.label}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        onClick={(ev) => onSelect(e.label, ev)}
        className={`
          relative overflow-hidden rounded-2xl px-4 py-2.5 text-sm font-body flex items-center gap-2
          transition-all duration-400 cursor-pointer border
          ${selected === e.label
            ? "border-accent bg-accent/15 shadow-[0_0_20px_hsla(var(--gold)/0.15)]"
            : "border-border/60 bg-card/50 hover:border-accent/40 hover:bg-card/80"
          }
        `}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <span className="text-base">{e.emoji}</span>
        <span className={`transition-colors duration-300 ${
          selected === e.label ? "text-foreground font-medium" : "text-muted-foreground"
        }`}>
          {e.label}
        </span>
        {selected === e.label && (
          <motion.div
            layoutId="emotion-glow"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, hsla(var(--gold) / 0.1), transparent 70%)",
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.button>
    ))}
  </motion.div>
);

export default EmotionChips;
