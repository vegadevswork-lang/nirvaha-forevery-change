import { motion } from "framer-motion";

interface EmotionDef {
  label: string;
  color: string;
}

// Trimmed palette — softer, fewer visible at once. Horizontal scroll reveals the rest.
const emotions: EmotionDef[] = [
  { label: "Calm", color: "270 35% 72%" },
  { label: "Joyful", color: "330 70% 75%" },
  { label: "Grateful", color: "150 35% 60%" },
  { label: "Anxious", color: "200 60% 65%" },
  { label: "Tired", color: "240 20% 60%" },
  { label: "Hopeful", color: "42 70% 65%" },
  { label: "Stressed", color: "15 60% 65%" },
  { label: "Reflective", color: "260 30% 65%" },
];

interface EmotionChipsProps {
  selected: string | null;
  onSelect: (label: string, e: React.MouseEvent) => void;
}

const EmotionChips = ({ selected, onSelect }: EmotionChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="mb-7 -mx-5 px-5"
  >
    <div
      className="flex gap-2 overflow-x-auto pb-1 snap-x"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {emotions.map((e, i) => {
        const isSelected = selected === e.label;
        return (
          <motion.button
            key={e.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={(ev) => onSelect(e.label, ev)}
            className="flex items-center gap-2 flex-shrink-0 snap-start rounded-full transition-all duration-300"
            style={{
              padding: "8px 14px",
              background: isSelected
                ? `hsla(${e.color} / 0.18)`
                : "hsla(var(--glass-bg))",
              border: isSelected
                ? `1px solid hsla(${e.color} / 0.55)`
                : "1px solid hsla(var(--glass-border))",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: `hsl(${e.color})`,
                boxShadow: isSelected ? `0 0 10px hsl(${e.color} / 0.7)` : "none",
              }}
            />
            <span
              className="text-xs font-body font-medium whitespace-nowrap"
              style={{
                color: isSelected
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground))",
              }}
            >
              {e.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

export default EmotionChips;
