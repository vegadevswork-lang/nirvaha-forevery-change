import { motion } from "framer-motion";
import { Users, ArrowRight, HandHeart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanionCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="relative rounded-3xl overflow-hidden mb-6"
      style={{
        background: "linear-gradient(160deg, hsl(var(--healing-green)), hsl(var(--gold)))",
        boxShadow: "0 16px 48px hsla(var(--gold) / 0.2), 0 4px 12px hsla(var(--healing-green) / 0.1)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
        style={{ background: "hsl(var(--cream))" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15"
        style={{ background: "hsl(var(--cream))" }}
      />

      {/* Breathing pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(var(--cream) / 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="font-body text-xs uppercase tracking-widest mb-1.5" style={{ color: "hsla(var(--primary-foreground) / 0.7)" }}>
              Companion Mode
            </p>
            <h2 className="font-display text-xl font-semibold leading-tight" style={{ color: "hsl(var(--primary-foreground))" }}>
              Human wisdom,
              <br />when you need it most.
            </h2>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "hsla(var(--primary-foreground) / 0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles size={20} style={{ color: "hsl(var(--primary-foreground))" }} />
          </motion.div>
        </div>

        <p className="font-body text-xs mb-5" style={{ color: "hsla(var(--primary-foreground) / 0.75)" }}>
          Connect with certified mentors & spiritual guides for personalized sessions.
        </p>

        {/* Two CTA buttons */}
        <div className="flex gap-2.5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/companion")}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-body font-medium text-xs whitespace-nowrap"
            style={{
              background: "hsl(var(--card))",
              color: "hsl(var(--primary))",
              boxShadow: "0 4px 16px hsla(var(--foreground) / 0.1)",
            }}
          >
            <Users size={14} />
            Talk to a Companion
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/become-companion")}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl font-body font-medium text-xs whitespace-nowrap"
            style={{
              background: "hsla(var(--primary-foreground) / 0.15)",
              color: "hsl(var(--primary-foreground))",
              backdropFilter: "blur(8px)",
              border: "1px solid hsla(var(--primary-foreground) / 0.2)",
            }}
          >
            <HandHeart size={14} />
            Become One
            <ArrowRight size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanionCard;
