import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import BottomNav from "@/components/home/BottomNav";
import JournalEditor from "@/components/journal/JournalEditor";
import JournalEntryCard from "@/components/journal/JournalEntryCard";
import JournalEmptyState from "@/components/journal/JournalEmptyState";

interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  moodEmoji: string;
  timestamp: string;
}

const STORAGE_KEY = "nirvaha_journal";

const Journal = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [showEditor, setShowEditor] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const handleSave = (entry: JournalEntry) => {
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowEditor(false);
  };

  const totalEntries = entries.length;
  const moodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    return counts;
  }, [entries]);
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "8%", right: "-8%", background: "hsl(var(--gold))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, bottom: "25%", left: "-8%", background: "hsl(var(--healing-green))", animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl text-foreground font-semibold leading-tight">
            Journal
          </h1>
          <p className="font-body text-xs text-muted-foreground mt-1">
            A safe space for your thoughts
          </p>
        </motion.div>

        {/* Stats bar */}
        {totalEntries > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-3.5 mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-display text-lg font-bold text-foreground leading-none">{totalEntries}</p>
                <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">Entries</p>
              </div>
              {topMood && (
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-foreground leading-none">
                    {entries.find((e) => e.mood === topMood[0])?.moodEmoji}
                  </p>
                  <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">Top mood</p>
                </div>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowEditor(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
                boxShadow: "0 2px 12px hsla(var(--healing-green) / 0.25)",
              }}
            >
              <Plus size={18} style={{ color: "hsl(var(--primary-foreground))" }} />
            </motion.button>
          </motion.div>
        )}

        {/* Entries or empty */}
        {totalEntries === 0 ? (
          <JournalEmptyState onStart={() => setShowEditor(true)} />
        ) : (
          <div>
            {entries.map((entry, i) => (
              <JournalEntryCard key={entry.id} entry={entry} index={i} />
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center font-display text-sm text-muted-foreground italic py-6"
            >
              "Writing is thinking on paper"
            </motion.p>
          </div>
        )}
      </div>

      {/* FAB for new entry (when entries exist) */}
      {totalEntries > 0 && !showEditor && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEditor(true)}
          className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
            boxShadow: "0 4px 24px hsla(var(--healing-green) / 0.35)",
          }}
        >
          <Plus size={22} style={{ color: "hsl(var(--primary-foreground))" }} />
        </motion.button>
      )}

      {/* Editor overlay */}
      <AnimatePresence>
        {showEditor && <JournalEditor onSave={handleSave} onClose={() => setShowEditor(false)} />}
      </AnimatePresence>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

export default Journal;
