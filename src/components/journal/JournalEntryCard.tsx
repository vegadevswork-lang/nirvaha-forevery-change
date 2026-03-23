import { motion } from "framer-motion";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  moodEmoji: string;
  timestamp: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  index: number;
}

const JournalEntryCard = ({ entry, index }: JournalEntryCardProps) => {
  const date = new Date(entry.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{entry.moodEmoji}</span>
          <span className="font-body text-xs font-medium text-foreground">{entry.mood}</span>
        </div>
        <span className="font-body text-[10px] text-muted-foreground">
          {format(date, "MMM d, h:mm a")}
        </span>
      </div>
      <p className="font-body text-sm text-foreground/85 leading-relaxed line-clamp-4">
        {entry.text}
      </p>
    </motion.div>
  );
};

export default JournalEntryCard;
