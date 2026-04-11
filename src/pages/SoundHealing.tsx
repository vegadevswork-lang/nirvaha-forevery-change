import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Play } from "lucide-react";
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
          <Skeleton key={i} className="h-28 w-32 rounded-2xl flex-shrink-0" />
        ))}
      </div>
      <Skeleton className="h-5 w-32 mb-3" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-5 w-40 mb-3" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-36 w-full rounded-2xl mb-3" />
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

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-14 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <ArrowLeft size={18} className="text-foreground" />
            </motion.button>
            <div className="flex-1" />
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
            </motion.div>
          </div>
          <h1 className="font-display text-2xl text-foreground font-semibold">Sound Healing Hub</h1>
          <p className="font-body text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Find the sound that meets your moment
          </p>
        </motion.div>

        {/* Personalized Recommendations */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h3 className="font-display text-base text-foreground font-medium mb-4">Recommended for you</h3>
          <div className="flex gap-3.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTrack({ id: rec.id, title: rec.label, description: `Curated for when you feel ${rec.mood.toLowerCase()}`, category: "", duration: rec.duration, moodTag: rec.mood, icon: rec.icon })}
                className="min-w-[120px] flex flex-col items-center text-center cursor-pointer rounded-2xl p-4 transition-all"
                style={{
                  background: "hsla(var(--glass-bg))",
                  border: "1px solid hsla(var(--glass-border))",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: "hsla(var(--healing-green) / 0.08)" }}>
                  <span className="text-2xl">{rec.icon}</span>
                </div>
                <p className="font-body text-xs text-foreground font-medium leading-tight">{rec.label}</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1.5">{rec.duration}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sound Library — clickable categories */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h3 className="font-display text-base text-foreground font-medium mb-4">Sound Library</h3>
          <div className="grid grid-cols-2 gap-3.5">
            {soundCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/sound-healing/category/${cat.id}`)}
                className="rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden"
                style={{
                  background: "hsla(var(--glass-bg))",
                  border: "1px solid hsla(var(--glass-border))",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-10"
                  style={{ background: "hsl(var(--healing-green))" }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "hsla(var(--healing-green) / 0.08)" }}>
                      <span className="text-lg">{cat.icon}</span>
                    </div>
                    <span className="font-body text-[10px] text-muted-foreground mt-1">{cat.trackCount} tracks</span>
                  </div>
                  <h4 className="font-body text-sm text-foreground font-medium leading-tight mb-1">{cat.title}</h4>
                  <p className="font-body text-[10px] text-muted-foreground leading-relaxed mb-3">{cat.description}</p>
                  <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-body font-medium"
                    style={{ background: "hsla(var(--healing-green) / 0.08)", color: "hsl(var(--primary))" }}>
                    {cat.moodTag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Wellness Packages — clickable journeys */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h3 className="font-display text-base text-foreground font-medium mb-1">Sound Journeys</h3>
          <p className="font-body text-xs text-muted-foreground mb-4">Guided packages for specific life needs</p>
          <div className="space-y-4">
            {wellnessPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/sound-healing/journey/${pkg.id}`)}
                className="rounded-3xl p-5 cursor-pointer relative overflow-hidden"
                style={{ background: pkg.gradient, boxShadow: "0 12px 40px hsla(0 0% 0% / 0.2)" }}
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{ background: "hsl(0 0% 100%)" }} />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsla(0 0% 100% / 0.12)", backdropFilter: "blur(8px)" }}>
                      <span className="text-2xl">{pkg.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-lg font-semibold" style={{ color: "hsl(0 0% 95%)" }}>{pkg.title}</h4>
                      <p className="font-body text-xs mt-0.5" style={{ color: "hsla(0 0% 95% / 0.7)" }}>{pkg.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4 ml-16">
                    <span className="font-body text-[11px]" style={{ color: "hsla(0 0% 95% / 0.5)" }}>{pkg.duration}</span>
                    <span style={{ color: "hsla(0 0% 95% / 0.3)" }}>·</span>
                    <span className="font-body text-[11px]" style={{ color: "hsla(0 0% 95% / 0.5)" }}>{pkg.trackCount} sessions</span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-body font-medium"
                    style={{
                      background: "hsla(0 0% 100% / 0.15)",
                      backdropFilter: "blur(8px)",
                      color: "hsl(0 0% 95%)",
                    }}
                  >
                    <Play size={14} fill="currentColor" />
                    Start journey
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
                        <span className="font-body text-[10px] text-foreground/60">·</span>
                        <span className="font-body text-[10px] text-foreground/60">{pkg.trackCount} sessions</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-body font-medium"
                    style={{
                      background: "hsla(var(--primary-foreground) / 0.35)",
                      backdropFilter: "blur(8px)",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    <Play size={14} fill="currentColor" />
                    Start journey
                  </motion.button>
                </div>
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
