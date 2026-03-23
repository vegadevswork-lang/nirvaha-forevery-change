import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { format } from "date-fns";
import { Trash2, Pencil, Bookmark, BookmarkCheck } from "lucide-react";

interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  moodEmoji: string;
  timestamp: string;
  saved?: boolean;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (entry: JournalEntry) => void;
  onToggleSave: (id: string) => void;
}

const SWIPE_THRESHOLD = 80;

const JournalEntryCard = ({ entry, index, onDelete, onEdit, onToggleSave }: JournalEntryCardProps) => {
  const date = new Date(entry.timestamp);
  const [showActions, setShowActions] = useState(false);
  const x = useMotionValue(0);
  const actionsOpacity = useTransform(x, [-SWIPE_THRESHOLD, -40, 0], [1, 0.5, 0]);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      setShowActions(true);
    } else {
      setShowActions(false);
    }
  };

  const handlePointerDown = () => {
    longPressTimer.current = setTimeout(() => {
      setShowActions((prev) => !prev);
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
      className="relative mb-3 overflow-hidden rounded-2xl"
    >
      {/* Background action buttons (revealed on swipe) */}
      <motion.div
        style={{
          opacity: showActions ? 1 : actionsOpacity,
          background: "linear-gradient(90deg, transparent 30%, hsla(var(--muted) / 0.9) 60%)",
        }}
        className="absolute inset-0 flex items-center justify-end gap-2 pr-3 rounded-2xl"
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggleSave(entry.id)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsla(var(--gold) / 0.15)" }}
        >
          {entry.saved ? (
            <BookmarkCheck size={15} className="text-accent" />
          ) : (
            <Bookmark size={15} className="text-muted-foreground" />
          )}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onEdit(entry)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsla(var(--healing-green) / 0.12)" }}
        >
          <Pencil size={15} className="text-primary" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onDelete(entry.id)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsla(var(--destructive) / 0.1)" }}
        >
          <Trash2 size={15} className="text-destructive" />
        </motion.button>
      </motion.div>

      {/* Draggable card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{ x: showActions ? -120 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ x }}
        className="glass-card p-4 relative cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{entry.moodEmoji}</span>
            <span className="font-body text-xs font-medium text-foreground">{entry.mood}</span>
            {entry.saved && (
              <BookmarkCheck size={12} className="text-accent" />
            )}
          </div>
          <span className="font-body text-[10px] text-muted-foreground">
            {format(date, "MMM d, h:mm a")}
          </span>
        </div>
        <p className="font-body text-sm text-foreground/85 leading-relaxed line-clamp-4">
          {entry.text}
        </p>
        <p className="font-body text-[9px] text-muted-foreground/50 mt-2 select-none">
          ← Swipe or hold to edit
        </p>
      </motion.div>
    </motion.div>
  );
};

export default JournalEntryCard;
