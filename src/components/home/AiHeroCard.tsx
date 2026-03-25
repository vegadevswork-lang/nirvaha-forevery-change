import { motion } from "framer-motion";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AiHeroCard = () => {
  const navigate = useNavigate();

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative rounded-3xl overflow-hidden mb-6"
    style={{
      background: "linear-gradient(160deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
      boxShadow: "0 16px 48px hsla(var(--healing-green) / 0.25), 0 4px 12px hsla(var(--healing-green) / 0.15)",
    }}
  >
    {/* Decorative circles */}
    <div
      className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
      style={{ background: "hsl(var(--gold))" }}
    />
    <div
      className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
      style={{ background: "hsl(var(--gold))" }}
    />

    {/* Breathing aura */}
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsla(var(--gold) / 0.5) 0%, transparent 70%)",
        filter: "blur(30px)",
      }}
    />

    <div className="relative z-10 p-6 flex flex-col">
      {/* Top row with orb */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "hsla(var(--primary-foreground) / 0.7)" }}>
            Your AI Companion
          </p>
          <h2 className="font-display text-[22px] font-semibold leading-tight" style={{ color: "hsl(var(--primary-foreground))" }}>
            I'm here with you.
          </h2>
          <p className="font-body text-sm mt-1" style={{ color: "hsla(var(--primary-foreground) / 0.75)" }}>
            What's on your mind?
          </p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
           style={{
            background: "hsla(var(--primary-foreground) / 0.15)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 24px hsla(var(--gold) / 0.2)",
          }}
        >
          <Sparkles size={22} style={{ color: "hsl(var(--gold-light))" }} />
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/chat")}
        className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-body font-medium text-sm transition-all"
        style={{
          background: "hsl(var(--card))",
          color: "hsl(var(--primary))",
          boxShadow: "0 4px 16px hsla(var(--foreground) / 0.1)",
        }}
      >
        <MessageCircle size={18} />
        Talk to Nirvaha
        <ArrowRight size={14} />
      </motion.button>
    </div>
  </motion.div>
  );
};

export default AiHeroCard;
