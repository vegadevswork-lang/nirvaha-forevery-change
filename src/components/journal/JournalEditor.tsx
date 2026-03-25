import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🙏", label: "Grateful" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🎯", label: "Focused" },
  { emoji: "😴", label: "Tired" },
];

interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  moodEmoji: string;
  timestamp: string;
  saved?: boolean;
}

interface JournalEditorProps {
  onSave: (entry: JournalEntry) => void;
  onClose: () => void;
  editEntry?: JournalEntry | null;
}

const JournalEditor = ({ onSave, onClose, editEntry }: JournalEditorProps) => {
  const [text, setText] = useState(editEntry?.text || "");
  const [selectedMood, setSelectedMood] = useState<string | null>(editEntry?.mood || null);
  const maxLength = 1000;

  const selectedMoodData = moodOptions.find((m) => m.label === selectedMood);
  const isEditing = !!editEntry;

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed || !selectedMood) return;
    if (trimmed.length > maxLength) return;

    const entry: JournalEntry = {
      id: editEntry?.id || crypto.randomUUID(),
      text: trimmed,
      mood: selectedMood,
      moodEmoji: selectedMoodData?.emoji || "📝",
      timestamp: editEntry?.timestamp || new Date().toISOString(),
      saved: editEntry?.saved || false,
    };
    onSave(entry);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-[60] flex flex-col bg-background">
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h2 className="font-display text-lg font-semibold text-foreground">
          {isEditing ? "Edit reflection" : "New reflection"}
        </h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "hsl(var(--muted))" }}
        >
          <X size={14} className="text-muted-foreground" />
        </motion.button>
      </div>

      {/* Mood picker */}
      <div className="px-5 mb-4">
        <p className="font-body text-xs text-muted-foreground mb-2.5">How are you feeling?</p>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.label}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedMood(mood.label)}
              className="px-3 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5 transition-all"
              style={{
                background:
                  selectedMood === mood.label
                    ? "hsl(var(--primary))"
                    : "hsla(var(--glass-bg))",
                color:
                  selectedMood === mood.label
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--foreground))",
                border: `1px solid ${
                  selectedMood === mood.label
                    ? "hsl(var(--primary))"
                    : "hsla(var(--glass-border))"
                }`,
              }}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Text area */}
      <div className="flex-1 px-5 pb-4 flex flex-col">
        <div className="glass-card flex-1 p-4 flex flex-col">
          <textarea
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setText(e.target.value);
              }
            }}
            placeholder="What's on your mind? Write freely — this is your safe space..."
            className="flex-1 bg-transparent text-foreground font-body text-sm resize-none outline-none placeholder:text-muted-foreground/50 leading-relaxed"
            autoFocus
          />
          <div className="flex items-center justify-between mt-2">
            <span className="font-body text-[10px] text-muted-foreground">
              {text.length}/{maxLength}
            </span>
            {selectedMoodData && (
              <span className="font-body text-[10px] text-muted-foreground">
                Feeling {selectedMoodData.emoji} {selectedMoodData.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="px-5 pb-8">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={!text.trim() || !selectedMood}
          className="w-full py-3.5 rounded-2xl font-body text-sm font-medium transition-all disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: text.trim() && selectedMood ? "0 4px 20px hsla(var(--healing-green) / 0.3)" : "none",
          }}
        >
          {isEditing ? "Update reflection" : "Save reflection"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JournalEditor;
