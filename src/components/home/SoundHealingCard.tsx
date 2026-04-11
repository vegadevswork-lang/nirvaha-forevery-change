import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SoundHealingCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      onClick={() => navigate("/sound-healing")}
      className="relative rounded-3xl overflow-hidden mb-6 cursor-pointer group"
      style={{
        background: "linear-gradient(160deg, hsl(150 25% 18%), hsl(160 20% 24%))",
        boxShadow: "0 16px 48px hsla(150 30% 15% / 0.4), 0 4px 12px hsla(var(--healing-green) / 0.1)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15"
        style={{ background: "hsl(var(--gold))" }} />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: "hsl(var(--healing-green))" }} />

      {/* Animated glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(var(--healing-green) / 0.4) 0%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* Waveform decoration */}
      <div className="absolute bottom-4 left-6 right-20 flex items-end gap-[2px] opacity-15 h-8">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="flex-1 rounded-full" style={{
            height: `${4 + Math.sin(i * 0.5) * 14 + Math.random() * 6}px`,
            background: "hsl(var(--primary-foreground))",
          }} />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <p className="font-body text-[10px] uppercase tracking-widest"
                style={{ color: "hsl(var(--gold))" }}>
                Sound Healing
              </p>
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Sparkles size={10} style={{ color: "hsl(var(--gold))" }} />
              </motion.div>
            </div>
            <h2 className="font-display text-xl font-semibold leading-tight"
              style={{ color: "hsl(0 0% 95%)" }}>
              Healing Frequencies
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "hsla(var(--primary-foreground) / 0.15)", backdropFilter: "blur(8px)" }}>
            <span className="text-xl">🔊</span>
          </div>
        </div>

        <p className="font-body text-xs mb-5 leading-relaxed"
          style={{ color: "hsla(0 0% 95% / 0.6)" }}>
          Frequencies, mantras & healing soundscapes — your daily dose of inner calm and emotional balance.
        </p>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-body font-medium text-sm"
          style={{
            background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.3)",
          }}
        >
          Explore Healing Hub
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SoundHealingCard;
