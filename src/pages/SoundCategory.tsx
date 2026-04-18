import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Headphones } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import SoundPlayer from "@/components/sound-healing/SoundPlayer";
import BottomNav from "@/components/home/BottomNav";
import { soundCategories } from "@/data/soundHealingData";
import { categoryTracks } from "@/data/soundCategoryData";


const SoundCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTrack, setActiveTrack] = useState<any>(null);

  const category = soundCategories.find((c) => c.id === categoryId);
  const tracks = categoryTracks[categoryId || ""] || [];

  if (!category) {
    navigate("/sound-healing");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Ambient orbs */}
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "8%", right: "-12%", background: "hsl(var(--healing-green))" }} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 150, height: 150, bottom: "35%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-14 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/sound-healing")}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <ArrowLeft size={18} className="text-foreground" />
            </motion.button>
            <div className="flex-1" />
            <Headphones size={16} className="text-muted-foreground" />
          </div>

          {/* Category hero */}
          <div className="rounded-3xl p-6 mb-2 relative overflow-hidden"
            style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))", backdropFilter: "blur(12px)" }}>
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10" style={{ background: "hsl(var(--healing-green))" }} />
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsla(var(--healing-green) / 0.1)" }}>
                <span className="text-3xl">{category.icon}</span>
              </div>
              <div>
                <h1 className="font-display text-2xl text-foreground font-semibold">{category.title}</h1>
                <p className="font-body text-sm text-muted-foreground mt-0.5">{category.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-body font-medium"
                    style={{ background: "hsla(var(--healing-green) / 0.08)", color: "hsl(var(--primary))" }}>
                    {category.moodTag}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body">{tracks.length} tracks</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tracks list */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-display text-base text-foreground font-medium mb-4">All Tracks</h3>
          <div className="space-y-3">
            {tracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTrack(track)}
                className="rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4"
                style={{
                  background: "hsla(var(--glass-bg))",
                  border: "1px solid hsla(var(--glass-border))",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsla(var(--healing-green) / 0.08)" }}>
                  <span className="text-xl">{track.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body text-sm text-foreground font-medium leading-tight">{track.title}</h4>
                  <p className="font-body text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{track.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-body"
                      style={{ background: "hsla(var(--healing-green) / 0.06)", color: "hsl(var(--primary))" }}>
                      {track.moodTag}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-body">{track.duration}</span>
                  </div>
                </div>
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
                    boxShadow: "0 4px 16px hsla(var(--healing-green) / 0.2)",
                  }}
                >
                  <Play size={16} className="text-primary-foreground ml-0.5" fill="currentColor" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-4 rounded-2xl p-4 text-center"
          style={{ background: "hsla(var(--healing-green) / 0.04)", border: "1px solid hsla(var(--healing-green) / 0.1)" }}
        >
          <p className="font-body text-xs text-muted-foreground italic">
            🎧 For the best experience, use headphones — especially with binaural tones
          </p>
        </motion.div>
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
      <SoundPlayer track={activeTrack} onClose={() => setActiveTrack(null)} />
    </motion.div>
  );
};

export default SoundCategory;
