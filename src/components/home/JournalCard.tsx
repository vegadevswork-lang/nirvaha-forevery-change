import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JournalCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      onClick={() => navigate("/journal")}
      className="relative rounded-3xl overflow-hidden mb-5 cursor-pointer group"
      style={{
        background: "linear-gradient(145deg, hsl(var(--sage)), hsla(var(--healing-green-light)))",
        boxShadow: "0 8px 32px hsla(var(--healing-green) / 0.15)",
      }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-15"
        style={{ background: "hsl(var(--cream))" }}
      />

      <div className="relative z-10 p-5 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsla(var(--cream) / 0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <BookOpen size={20} style={{ color: "hsl(var(--foreground))" }} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-base text-foreground font-semibold">
            Your Journal
          </h3>
          <p className="font-body text-xs mt-0.5" style={{ color: "hsla(var(--foreground) / 0.7)" }}>
            Capture what matters
          </p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsl(var(--foreground))",
          }}
        >
          <ArrowRight size={16} style={{ color: "hsl(var(--cream))" }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JournalCard;
