import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

const AiHeroCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.25 }}
    className="relative rounded-3xl border overflow-hidden mb-7"
    style={{
      background: "linear-gradient(160deg, hsla(var(--glass-bg)), hsla(40 30% 96% / 0.5))",
      borderColor: "hsla(var(--glass-border))",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      boxShadow: "0 12px 48px hsla(var(--glass-shadow)), 0 1px 3px hsla(var(--glass-shadow)), inset 0 1px 0 hsla(40 30% 100% / 0.5)",
    }}
  >
    {/* Background breathing aura */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.25, 0.45, 0.25],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsla(var(--gold) / 0.4) 0%, hsla(var(--healing-green) / 0.2) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />

    <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 sm:py-12">
      {/* Glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-20 h-20 rounded-full mb-5 flex items-center justify-center"
        style={{
          background: "linear-gradient(145deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
          boxShadow: "0 0 40px hsla(var(--healing-green) / 0.3), 0 0 80px hsla(var(--gold) / 0.15)",
        }}
      >
        {/* Inner glow ring */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-[-6px] rounded-full pointer-events-none"
          style={{
            border: "1.5px solid hsla(var(--gold) / 0.3)",
            boxShadow: "0 0 20px hsla(var(--gold) / 0.1)",
          }}
        />
        <Sparkles className="text-primary-foreground" size={26} />
      </motion.div>

      <p className="font-display text-xl text-foreground italic leading-relaxed mb-1">
        I'm here with you.
      </p>
      <p className="font-body text-sm text-muted-foreground mb-7">
        What's on your mind?
      </p>

      {/* Primary CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -2 }}
        className="btn-primary max-w-[260px] flex items-center justify-center gap-2.5 text-base py-4 rounded-2xl"
        style={{
          boxShadow: "0 8px 32px hsla(var(--healing-green) / 0.25), 0 2px 8px hsla(var(--healing-green) / 0.15)",
        }}
      >
        <MessageCircle size={20} />
        Talk to Nirvaha
      </motion.button>
    </div>
  </motion.div>
);

export default AiHeroCard;
