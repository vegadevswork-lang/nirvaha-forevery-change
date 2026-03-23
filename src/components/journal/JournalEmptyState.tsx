import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface JournalEmptyStateProps {
  onStart: () => void;
}

const JournalEmptyState = ({ onStart }: JournalEmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
  >
    <div
      className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5"
      style={{
        background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
      }}
    >
      <BookOpen size={24} className="text-primary" />
    </div>
    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
      Your reflections begin here
    </h3>
    <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
      Writing helps you understand your feelings. Start with whatever comes to mind.
    </p>
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="px-6 py-3 rounded-2xl font-body text-sm font-medium"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
        color: "hsl(var(--primary-foreground))",
        boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.3)",
      }}
    >
      Write your first reflection
    </motion.button>
  </motion.div>
);

export default JournalEmptyState;
