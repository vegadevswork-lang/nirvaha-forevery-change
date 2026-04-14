import { motion } from "framer-motion";
import { Wind, BookOpen, Sparkles, Heart } from "lucide-react";

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

const iconMap: Record<string, typeof Wind> = {
  "Practice Breathing": Wind,
  "Journal": BookOpen,
  "Wisdom Selfie": Sparkles,
  "Tell me more": Heart,
};

const QuickReplies = ({ suggestions, onSelect }: QuickRepliesProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-wrap gap-2 mb-3 px-1"
  >
    {suggestions.map((text, i) => {
      const Icon = iconMap[text];
      return (
        <motion.button
          key={text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => onSelect(text)}
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 font-body text-xs font-medium border transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.35)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          {Icon && <Icon size={13} />}
          {text}
        </motion.button>
      );
    })}
  </motion.div>
);

export default QuickReplies;
