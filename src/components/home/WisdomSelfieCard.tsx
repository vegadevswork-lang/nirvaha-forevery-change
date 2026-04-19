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
        minHeight: 168,
        boxShadow: "0 16px 48px hsla(45 60% 25% / 0.45), 0 4px 12px hsla(var(--gold) / 0.15)",
      }}
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1528319725582-ddc096101511?w=1200&q=90&auto=format&fit=crop&dpr=2"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(35 55% 18% / 0.78) 0%, hsl(25 60% 12% / 0.92) 100%)",
        }}
      />
      {/* Gold accent glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-30 blur-2xl"
        style={{ background: "hsl(var(--gold))" }}
      />

      <div className="relative z-10 p-5 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsla(0 0% 100% / 0.18)",
            backdropFilter: "blur(10px)",
            border: "1px solid hsla(0 0% 100% / 0.22)",
          }}
        >
          <Camera size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/70 font-medium">
            Wisdom Ritual
          </span>
          <h3 className="font-display text-[20px] text-white font-semibold leading-tight mt-0.5">
            Legends Selfie
          </h3>
          <p className="font-body text-xs text-white/80 mt-1 leading-relaxed">
            Create a moment with wisdom figures
          </p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/95"
        >
          <ArrowRight size={16} className="text-foreground" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WisdomSelfieCard;
