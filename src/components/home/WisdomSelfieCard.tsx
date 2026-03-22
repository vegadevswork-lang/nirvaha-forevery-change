import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WisdomSelfieCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onClick={() => navigate("/legends-selfie")}
      className="glass-card p-5 mb-5 cursor-pointer group hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsla(var(--gold) / 0.06), hsla(var(--healing-green) / 0.04))",
        }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, hsla(var(--gold) / 0.2), hsla(var(--healing-green) / 0.15))",
            boxShadow: "0 4px 16px hsla(var(--gold) / 0.08)",
          }}
        >
          <span className="text-2xl">📸</span>
        </motion.div>
        <div className="flex-1">
          <h3 className="font-display text-base text-foreground font-semibold">
            Nirvaha Selfie with Legends
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
            Create a moment with timeless wisdom figures
          </p>
        </div>
        <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-300 flex-shrink-0" />
      </div>
    </motion.div>
  );
};

export default WisdomSelfieCard;
