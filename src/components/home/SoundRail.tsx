import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { soundCategories } from "@/data/soundHealingData";
import SectionHeader from "./SectionHeader";

interface SoundRailProps {
  emotion?: string | null;
}

const emotionToCategory: Record<string, string[]> = {
  Stressed: ["breath", "grounding", "nature"],
  Angry: ["breath", "grounding"],
  Sensitive: ["frequency", "mantras"],
  Confused: ["focus", "binaural"],
  Bored: ["focus", "binaural"],
  Hurt: ["frequency", "mantras"],
};

const SoundRail = ({ emotion }: SoundRailProps) => {
  const navigate = useNavigate();
  const preferred = emotion ? emotionToCategory[emotion] : null;

  const ranked = preferred
    ? [...soundCategories].sort((a, b) => {
        const aIdx = preferred.indexOf(a.id);
        const bIdx = preferred.indexOf(b.id);
        const aRank = aIdx === -1 ? 99 : aIdx;
        const bRank = bIdx === -1 ? 99 : bIdx;
        return aRank - bRank;
      })
    : soundCategories;

  const visible = ranked.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-7"
    >
      <SectionHeader
        title="Sound Healing"
        subtitle="Frequencies tuned to your state"
        onViewAll={() => navigate("/sound-healing")}
      />
      <div
        className="flex gap-2.5 overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visible.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.04, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/sound-healing/${cat.id}`)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl flex-shrink-0 border"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="text-base" aria-hidden>{cat.icon}</span>
            <div className="text-left">
              <p className="font-body text-xs font-medium text-foreground leading-tight">
                {cat.title}
              </p>
              <p className="font-body text-[9px] text-muted-foreground leading-tight">
                {cat.trackCount} tracks
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
};

export default SoundRail;
