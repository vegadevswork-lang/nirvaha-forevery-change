import { motion } from "framer-motion";
import { Heart, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="relative rounded-3xl overflow-hidden mb-6"
      style={{
        background: "linear-gradient(160deg, hsl(160 20% 10%), hsl(152 25% 15%))",
        boxShadow: "0 16px 48px hsla(152 30% 15% / 0.4), 0 4px 12px hsla(var(--healing-green) / 0.1)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15"
        style={{ background: "hsl(var(--sage))" }}
      />
      <div
        className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full opacity-10"
        style={{ background: "hsl(var(--gold))" }}
      />

      {/* Breathing glow */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(var(--healing-green) / 0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Floating aura dots */}
      <div className="absolute top-5 right-5 flex gap-2 z-10">
        {["200 20% 60%", "42 60% 55%", "152 35% 45%", "280 30% 55%"].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="w-3 h-3 rounded-full"
            style={{ background: `hsl(${c})`, boxShadow: `0 0 8px hsla(${c} / 0.5)` }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Shield size={10} style={{ color: "hsl(var(--sage))" }} />
          <p className="font-body text-[10px] uppercase tracking-widest" style={{ color: "hsl(var(--sage))" }}>
            Nirvaha Space
          </p>
        </div>
        <h2 className="font-display text-xl font-semibold leading-tight mb-2" style={{ color: "hsl(0 0% 95%)" }}>
          A space to be heard
        </h2>
        <p className="font-body text-xs mb-5 leading-relaxed" style={{ color: "hsla(0 0% 95% / 0.6)" }}>
          Share anonymously, receive empathy, and find clarity through collective wisdom.
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/community")}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-body font-medium text-sm"
          style={{
            background: "linear-gradient(135deg, hsl(var(--sage)), hsl(var(--healing-green)))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.3)",
          }}
        >
          <Heart size={16} />
          Enter the Space
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
