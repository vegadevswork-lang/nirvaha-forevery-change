import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SoundHealingCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      onClick={() => navigate("/sound-healing")}
      className="relative rounded-3xl overflow-hidden mb-5 cursor-pointer group"
      style={{
        background: "linear-gradient(145deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
        boxShadow: "0 8px 32px hsla(var(--healing-green) / 0.2)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15"
        style={{ background: "hsl(var(--gold))" }} />
      <div className="absolute bottom-0 left-0 w-full h-12 opacity-10"
        style={{ background: "linear-gradient(to top, hsl(var(--gold)), transparent)" }} />

      {/* Waveform decoration */}
      <div className="absolute bottom-3 left-5 right-16 flex items-end gap-[2px] opacity-20 h-6">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1 rounded-full" style={{
            height: `${4 + Math.sin(i * 0.6) * 12 + Math.random() * 6}px`,
            background: "hsl(var(--primary-foreground))",
          }} />
        ))}
      </div>

      <div className="relative z-10 p-5 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "hsla(var(--primary-foreground) / 0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-xl">🔊</span>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-base text-primary-foreground font-semibold">
            Sound Healing
          </h3>
          <p className="font-body text-xs mt-0.5" style={{ color: "hsla(var(--primary-foreground) / 0.8)" }}>
            Frequencies, mantras & healing soundscapes
          </p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "hsla(var(--primary-foreground) / 0.25)" }}
        >
          <ArrowRight size={16} className="text-primary-foreground" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SoundHealingCard;
