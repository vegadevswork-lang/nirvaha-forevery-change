import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WisdomSelfieCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onClick={() => navigate("/legends-selfie")}
      className="relative rounded-3xl overflow-hidden mb-5 cursor-pointer group"
      style={{
        background: "linear-gradient(145deg, hsl(var(--gold)), hsl(var(--accent)))",
        boxShadow: "0 8px 32px hsla(var(--gold) / 0.2)",
      }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
        style={{ background: "hsl(var(--primary-foreground))" }}
      />

      <div className="relative z-10 p-5 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsla(var(--primary-foreground) / 0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Camera size={20} style={{ color: "hsl(var(--foreground))" }} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-base text-foreground font-semibold">
            Legends Selfie
          </h3>
          <p className="font-body text-xs mt-0.5" style={{ color: "hsla(var(--foreground) / 0.7)" }}>
            Create a moment with wisdom figures
          </p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsl(var(--foreground))",
          }}
        >
          <ArrowRight size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WisdomSelfieCard;
