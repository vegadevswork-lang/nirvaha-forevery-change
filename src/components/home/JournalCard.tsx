import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const JournalCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.55 }}
    className="glass-card p-5 cursor-pointer hover:border-accent/40 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.1), hsla(var(--sage) / 0.15))",
        }}
      >
        <BookOpen size={18} className="text-primary" />
      </div>
      <div>
        <p className="font-body text-sm text-foreground font-medium">Your Journal</p>
        <p className="font-body text-xs text-muted-foreground">Capture what matters</p>
      </div>
    </div>
  </motion.div>
);

export default JournalCard;
