import { motion } from "framer-motion";
import moodHappy from "@/assets/mood-happy.png";
import moodCalm from "@/assets/mood-calm.png";
import moodRelax from "@/assets/mood-relax.png";
import moodFocus from "@/assets/mood-focus.png";
import moodAnxious from "@/assets/mood-anxious.png";
import moodGrateful from "@/assets/mood-grateful.png";
import moodTired from "@/assets/mood-tired.png";

const emotions = [
  { label: "Happy", image: moodHappy },
  { label: "Calm", image: moodCalm },
  { label: "Relax", image: moodRelax },
  { label: "Focus", image: moodFocus },
  { label: "Grateful", image: moodGrateful },
  { label: "Tired", image: moodTired },
  { label: "Anxious", image: moodAnxious },
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
    className="flex items-center gap-4 mb-6 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    {emotions.map((e, i) => {
      const isSelected = selected === e.label;
      return (
        <motion.button
          key={e.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={(ev) => onSelect(e.label, ev)}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <motion.div
            animate={isSelected ? { scale: 1.12 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300"
            style={{
              borderColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow: isSelected
                ? "0 0 16px hsla(var(--healing-green) / 0.3), 0 0 0 3px hsla(var(--healing-green) / 0.12)"
                : "0 2px 8px hsla(var(--glass-shadow))",
              background: "hsl(var(--card))",
            }}
          >
            <img
              src={e.image}
              alt={e.label}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
          <span
            className="text-[11px] font-body font-medium transition-colors duration-300"
            style={{
              color: isSelected ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            }}
          >
            {e.label}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

export default EmotionChips;
