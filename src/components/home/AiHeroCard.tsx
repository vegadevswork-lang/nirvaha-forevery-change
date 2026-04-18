import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AiHeroCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.18 }}
      className="relative rounded-[28px] overflow-hidden mb-8"
      style={{
        background:
          "linear-gradient(165deg, hsl(var(--primary)) 0%, hsl(var(--healing-green)) 55%, hsl(var(--healing-green-light)) 100%)",
        boxShadow:
          "0 24px 60px -20px hsla(var(--healing-green) / 0.55), 0 6px 18px hsla(var(--healing-green) / 0.18)",
      }}
    >
      {/* Soft breathing aura — single, calm */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(var(--gold) / 0.45) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grain / luminance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, hsl(var(--gold)) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 p-7 flex flex-col items-center text-center">
        {/* Breathing orb — single focal element */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full mb-5 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsla(var(--gold-light) / 0.95), hsla(var(--gold) / 0.4) 70%)",
            boxShadow:
              "0 0 40px hsla(var(--gold) / 0.55), inset 0 1px 0 hsla(0 0% 100% / 0.4)",
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: "hsl(var(--primary-foreground))",
              boxShadow: "0 0 12px hsla(var(--primary-foreground) / 0.8)",
            }}
          />
        </motion.div>

        <p
          className="font-body text-[11px] uppercase tracking-[0.2em] mb-3"
          style={{ color: "hsla(var(--primary-foreground) / 0.65)" }}
        >
          Your Inner Guide
        </p>
        <h2
          className="font-display text-[26px] font-semibold leading-[1.15] mb-2 max-w-[280px]"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          I'm here, whenever you need me.
        </h2>
        <p
          className="font-body text-sm mb-6 max-w-[260px]"
          style={{ color: "hsla(var(--primary-foreground) / 0.78)" }}
        >
          Begin a quiet conversation with Nirvaha.
        </p>

        {/* Primary CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/chat")}
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-body font-semibold text-[15px] transition-all"
          style={{
            background: "hsl(var(--card))",
            color: "hsl(var(--primary))",
            boxShadow:
              "0 8px 24px hsla(var(--foreground) / 0.18), inset 0 1px 0 hsla(0 0% 100% / 0.6)",
          }}
        >
          Talk to Nirvaha
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AiHeroCard;
