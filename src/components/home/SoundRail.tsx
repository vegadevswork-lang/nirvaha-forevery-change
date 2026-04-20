import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { soundCategories } from "@/data/soundHealingData";
import SectionHeader from "./SectionHeader";

interface SoundRailProps {
  emotion?: string | null;
}

// Curated photo + gradient per category — sets the mood instantly
// HD images — w=1200 with auto format/compression for crisp retina rendering
const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=90&auto=format&fit=crop&dpr=2`;

const categoryVisuals: Record<string, { image: string; gradient: string }> = {
  binaural: {
    image: IMG("photo-1518609878373-06d740f60d8b"),
    gradient: "linear-gradient(160deg, hsl(220 60% 25% / 0.78), hsl(260 50% 20% / 0.92))",
  },
  mantras: {
    image: IMG("photo-1545389336-cf090694435e"),
    gradient: "linear-gradient(160deg, hsl(35 60% 25% / 0.72), hsl(20 70% 20% / 0.92))",
  },
  nature: {
    image: IMG("photo-1441974231531-c6227db76b6e"),
    gradient: "linear-gradient(160deg, hsl(150 50% 18% / 0.62), hsl(160 60% 14% / 0.92))",
  },
  frequency: {
    image: IMG("photo-1511671782779-c97d3d27a1d4"),
    gradient: "linear-gradient(160deg, hsl(280 50% 25% / 0.72), hsl(300 45% 18% / 0.92))",
  },
  breath: {
    image: IMG("photo-1506905925346-21bda4d32df4"),
    gradient: "linear-gradient(160deg, hsl(195 55% 22% / 0.7), hsl(210 60% 16% / 0.92))",
  },
  grounding: {
    image: IMG("photo-1507525428034-b723cf961d3e"),
    gradient: "linear-gradient(160deg, hsl(25 45% 22% / 0.72), hsl(15 55% 16% / 0.92))",
  },
  sleep: {
    image: IMG("photo-1532978879514-6cb1a3a82e4d"),
    gradient: "linear-gradient(160deg, hsl(240 55% 18% / 0.78), hsl(250 60% 12% / 0.92))",
  },
  focus: {
    image: IMG("photo-1499209974431-9dddcece7f88"),
    gradient: "linear-gradient(160deg, hsl(170 50% 20% / 0.74), hsl(180 55% 14% / 0.92))",
  },
};

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
        className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 snap-x snap-mandatory overscroll-x-contain"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {visible.map((cat, i) => {
          const visual = categoryVisuals[cat.id] || categoryVisuals.binaural;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05, duration: 0.35 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/sound-healing/category/${cat.id}`)}
              className="relative flex-shrink-0 w-[156px] h-[112px] rounded-2xl overflow-hidden text-left border border-border/30 snap-start"
              style={{
                boxShadow: "0 8px 24px hsl(var(--background) / 0.4)",
              }}
            >
              {/* Background image — HD, retina-ready */}
              <img
                src={visual.image}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: visual.gradient }}
              />

              {/* Play affordance */}
              <div
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "hsl(var(--background) / 0.3)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsl(0 0% 100% / 0.25)",
                }}
              >
                <Play size={11} fill="currentColor" className="text-white ml-0.5" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 px-2.5 py-2.5 flex flex-col justify-end">
                <p className="font-display text-[13px] text-white font-semibold leading-tight drop-shadow-md truncate">
                  {cat.title}
                </p>
                <p className="font-body text-[10px] text-white/85 leading-tight truncate mt-1">
                  {cat.trackCount} tracks · {cat.moodTag}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default SoundRail;
