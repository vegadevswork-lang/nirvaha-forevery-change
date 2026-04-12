import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const JournalCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="mb-5"
    >
      <InteractiveHoverButton
        variant="glass"
        onClick={() => navigate("/journal")}
        className="w-full rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, hsl(var(--sage)), hsl(var(--healing-green-light)))",
          boxShadow: "0 8px 32px hsl(var(--healing-green) / 0.15)",
          border: "none",
        }}
      >
        <div className="relative z-10 p-5 flex items-center gap-4 w-full">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "hsl(var(--primary-foreground) / 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <BookOpen size={20} style={{ color: "hsl(var(--foreground))" }} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-display text-base text-foreground font-semibold">
              Your Journal
            </h3>
            <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
              Capture what matters
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--foreground))" }}
          >
            <ArrowRight size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
          </div>
        </div>
      </InteractiveHoverButton>
    </motion.div>
  );
};

export default JournalCard;
