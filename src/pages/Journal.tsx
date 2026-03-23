import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bookmark } from "lucide-react";
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
  saved?: boolean;
}

const STORAGE_KEY = "nirvaha_journal";

const Journal = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [showEditor, setShowEditor] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [filter, setFilter] = useState<"all" | "saved">("all");
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const persist = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSave = (entry: JournalEntry) => {
    const exists = entries.findIndex((e) => e.id === entry.id);
    let updated: JournalEntry[];
    if (exists >= 0) {
      updated = entries.map((e) => (e.id === entry.id ? entry : e));
    } else {
      updated = [entry, ...entries];
    }
    persist(updated);
    setShowEditor(false);
    setEditingEntry(null);
  };

  const handleDelete = (id: string) => {
    persist(entries.filter((e) => e.id !== id));
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowEditor(true);
  };

  const handleToggleSave = (id: string) => {
    persist(entries.map((e) => (e.id === id ? { ...e, saved: !e.saved } : e)));
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingEntry(null);
  };

  const filteredEntries = filter === "saved" ? entries.filter((e) => e.saved) : entries;
  const savedCount = entries.filter((e) => e.saved).length;
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

        {/* Stats bar + filter */}
        {totalEntries > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-3.5 mb-4 flex items-center justify-between"
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
              {savedCount > 0 && (
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-foreground leading-none">{savedCount}</p>
                  <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">Saved</p>
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

        {/* Filter tabs */}
        {totalEntries > 0 && (
          <div className="flex gap-2 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className="px-4 py-1.5 rounded-full font-body text-xs transition-all"
              style={{
                background: filter === "all" ? "hsl(var(--primary))" : "hsla(var(--glass-bg))",
                color: filter === "all" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                border: `1px solid ${filter === "all" ? "hsl(var(--primary))" : "hsla(var(--glass-border))"}`,
              }}
            >
              All entries
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("saved")}
              className="px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5 transition-all"
              style={{
                background: filter === "saved" ? "hsl(var(--primary))" : "hsla(var(--glass-bg))",
                color: filter === "saved" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                border: `1px solid ${filter === "saved" ? "hsl(var(--primary))" : "hsla(var(--glass-border))"}`,
              }}
            >
              <Bookmark size={11} />
              Saved
            </motion.button>
          </div>
        )}

        {/* Entries or empty */}
        {totalEntries === 0 ? (
          <JournalEmptyState onStart={() => setShowEditor(true)} />
        ) : filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Bookmark size={32} className="text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-display text-lg text-foreground mb-1">No saved reflections yet</p>
            <p className="font-body text-xs text-muted-foreground">
              Swipe left on an entry and tap the bookmark to save it
            </p>
          </motion.div>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, i) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </AnimatePresence>
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

      {/* FAB */}
      {totalEntries > 0 && !showEditor && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setEditingEntry(null); setShowEditor(true); }}
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
        {showEditor && (
          <JournalEditor
            onSave={handleSave}
            onClose={handleCloseEditor}
            editEntry={editingEntry}
          />
        )}
      </AnimatePresence>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

export default Journal;
