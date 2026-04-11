import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageLoading } from "@/hooks/use-page-loading";
import { Skeleton } from "@/components/ui/skeleton";
import SoundPlayer from "@/components/sound-healing/SoundPlayer";
import BottomNav from "@/components/home/BottomNav";
import { recommendations, soundCategories, wellnessPackages, sampleTracks } from "@/data/soundHealingData";

const SoundHealingSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-12">
      <Skeleton className="h-7 w-48 mb-2" />
      <Skeleton className="h-3 w-64 mb-6" />
      <div className="flex gap-3 mb-6 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-28 rounded-2xl flex-shrink-0" />
        ))}
      </div>
      <Skeleton className="h-5 w-32 mb-3" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-5 w-40 mb-3" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-2xl mb-3" />
      ))}
    </div>
  </div>
);

const SoundHealing = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading(600);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTrack, setActiveTrack] = useState<typeof sampleTracks[0] | null>(null);

  if (isLoading) return <SoundHealingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Ambient orbs */}
      <div className="ambient-orb animate-pulse-soft" style={{ width: 240, height: 240, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 180, height: 180, bottom: "30%", left: "-8%", background: "hsl(var(--gold))", animationDelay: "2s" }} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <ArrowLeft size={16} className="text-foreground" />
            </motion.button>
            <div className="flex-1" />
            <Sparkles size={16} className="text-primary opacity-50" />
          </div>
          <h1 className="font-display text-2xl text-foreground font-semibold">Sound Healing Hub</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Find the sound that meets your moment</p>
        </motion.div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-7">
          <h3 className="font-display text-base text-foreground font-medium mb-3">Recommended for you</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTrack({ id: rec.id, title: rec.label, description: `Curated for when you feel ${rec.mood.toLowerCase()}`, category: "", duration: rec.duration, moodTag: rec.mood, icon: rec.icon })}
                className="glass-card p-3.5 min-w-[110px] flex flex-col items-center text-center cursor-pointer hover:border-accent/40 transition-all"
              >
                <span className="text-2xl mb-2">{rec.icon}</span>
                <p className="font-body text-xs text-foreground font-medium leading-tight">{rec.label}</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1">{rec.duration}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Library */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-7">
          <h3 className="font-display text-base text-foreground font-medium mb-3">Sound Library</h3>
          <div className="grid grid-cols-2 gap-3">
            {soundCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card p-4 cursor-pointer hover:border-accent/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-body text-[10px] text-muted-foreground">{cat.trackCount} tracks</span>
                </div>
                <h4 className="font-body text-sm text-foreground font-medium leading-tight">{cat.title}</h4>
                <p className="font-body text-[10px] text-muted-foreground mt-1 leading-relaxed">{cat.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-body"
                  style={{ background: "hsla(var(--healing-green) / 0.08)", color: "hsl(var(--primary))" }}>
                  {cat.moodTag}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Wellness Packages */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
          <h3 className="font-display text-base text-foreground font-medium mb-1">Sound Journeys</h3>
          <p className="font-body text-xs text-muted-foreground mb-3">Guided packages for specific life needs</p>
          <div className="space-y-3">
            {wellnessPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl p-4 cursor-pointer relative overflow-hidden"
                style={{
                  background: pkg.gradient,
                  boxShadow: "0 4px 20px hsla(var(--glass-shadow))",
                }}
              >
                {/* Decorative circle */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
                  style={{ background: "hsl(var(--primary-foreground))" }} />

                <div className="relative z-10 flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{pkg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base text-foreground font-semibold">{pkg.title}</h4>
                    <p className="font-body text-xs text-foreground/70 mt-0.5">{pkg.purpose}</p>
                    <p className="font-body text-[10px] text-foreground/50 mt-1.5 line-clamp-2">{pkg.description}</p>
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className="font-body text-[10px] text-foreground/60">{pkg.duration}</span>
                      <span className="font-body text-[10px] text-foreground/60">·</span>
                      <span className="font-body text-[10px] text-foreground/60">{pkg.trackCount} sessions</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 ml-9 px-4 py-1.5 rounded-full text-xs font-body font-medium"
                  style={{
                    background: "hsla(var(--primary-foreground) / 0.5)",
                    backdropFilter: "blur(8px)",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Start journey
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
      <SoundPlayer track={activeTrack} onClose={() => setActiveTrack(null)} />
    </motion.div>
  );
};

export default SoundHealing;
