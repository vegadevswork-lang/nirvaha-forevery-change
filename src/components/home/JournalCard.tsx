import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JournalCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      onClick={() => navigate("/journal")}
      className="glass-card p-4 cursor-pointer hover:border-accent/40 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--sage) / 0.15))",
          }}
        >
          <BookOpen size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-body text-sm text-foreground font-medium">Your Journal</p>
          <p className="font-body text-xs text-muted-foreground">Capture what matters</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "hsla(var(--healing-green) / 0.1)" }}
        >
          <ArrowRight size={14} className="text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

export default JournalCard;
