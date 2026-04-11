import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, CheckCircle2, Circle, Lock, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageLoading } from "@/hooks/use-page-loading";
import { Skeleton } from "@/components/ui/skeleton";
import SoundPlayer from "@/components/sound-healing/SoundPlayer";
import BottomNav from "@/components/home/BottomNav";
import { wellnessPackages } from "@/data/soundHealingData";
import { journeySessions } from "@/data/soundCategoryData";

const JourneySkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-14">
      <Skeleton className="h-44 w-full rounded-3xl mb-6" />
      <Skeleton className="h-5 w-40 mb-4" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-2xl mb-3" />
      ))}
    </div>
  </div>
);

const SoundJourney = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const navigate = useNavigate();
  const isLoading = usePageLoading(400);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTrack, setActiveTrack] = useState<any>(null);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set());
  const [currentDay, setCurrentDay] = useState(1);

  const pkg = wellnessPackages.find((p) => p.id === journeyId);
  const sessions = journeySessions[journeyId || ""] || [];

  if (isLoading) return <JourneySkeleton />;
  if (!pkg) {
    navigate("/sound-healing");
    return null;
  }

  const progressPercent = (completedSessions.size / sessions.length) * 100;

  const handlePlaySession = (session: typeof sessions[0]) => {
    setCurrentDay(session.day);
    setActiveTrack({
      id: session.id,
      title: session.title,
      description: session.description,
      moodTag: `Day ${session.day}`,
      icon: session.icon,
      duration: session.duration,
    });
  };

  const handleClosePlayer = () => {
    // Mark session as completed when player closes
    if (activeTrack) {
      setCompletedSessions((prev) => new Set([...prev, activeTrack.id]));
    }
    setActiveTrack(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Ambient */}
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-14 relative z-10">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/sound-healing")}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <ArrowLeft size={18} className="text-foreground" />
            </motion.button>
            <div className="flex-1" />
            <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
          </div>
        </motion.div>

        {/* Journey hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-8 relative overflow-hidden"
          style={{ background: pkg.gradient, boxShadow: "0 12px 40px hsla(0 0% 0% / 0.2)" }}
        >
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10" style={{ background: "hsl(0 0% 100%)" }} />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsla(0 0% 100% / 0.12)", backdropFilter: "blur(8px)" }}>
                <span className="text-3xl">{pkg.icon}</span>
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-semibold" style={{ color: "hsl(0 0% 95%)" }}>{pkg.title}</h1>
                <p className="font-body text-sm mt-0.5" style={{ color: "hsla(0 0% 95% / 0.7)" }}>{pkg.purpose}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-body text-[11px]" style={{ color: "hsla(0 0% 95% / 0.5)" }}>{pkg.duration}</span>
              <span style={{ color: "hsla(0 0% 95% / 0.3)" }}>·</span>
              <span className="font-body text-[11px]" style={{ color: "hsla(0 0% 95% / 0.5)" }}>{sessions.length} sessions</span>
              <span style={{ color: "hsla(0 0% 95% / 0.3)" }}>·</span>
              <span className="font-body text-[11px]" style={{ color: "hsla(0 0% 95% / 0.5)" }}>{completedSessions.size} completed</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsla(var(--primary-foreground) / 0.15)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "hsla(var(--primary-foreground) / 0.5)" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="font-body text-[10px] text-foreground/50 mt-1.5 text-right">
              {Math.round(progressPercent)}% complete
            </p>
          </div>
        </motion.div>

        {/* Sessions list */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="font-display text-base text-foreground font-medium mb-4">Your Journey</h3>
          <div className="space-y-3">
            {sessions.map((session, i) => {
              const isCompleted = completedSessions.has(session.id);
              const isUnlocked = session.day <= currentDay || isCompleted || session.day === 1;

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  onClick={() => isUnlocked && handlePlaySession(session)}
                  className={`rounded-2xl p-4 flex items-center gap-4 transition-all ${isUnlocked ? "cursor-pointer" : "opacity-60"}`}
                  style={{
                    background: isCompleted
                      ? "hsla(var(--healing-green) / 0.06)"
                      : "hsla(var(--glass-bg))",
                    border: `1px solid ${isCompleted ? "hsla(var(--healing-green) / 0.2)" : "hsla(var(--glass-border))"}`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Day indicator */}
                  <div className="flex flex-col items-center flex-shrink-0 w-10">
                    <span className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">Day</span>
                    <span className="font-display text-lg text-foreground font-semibold">{session.day}</span>
                  </div>

                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={20} style={{ color: "hsl(var(--healing-green))" }} />
                    ) : isUnlocked ? (
                      <Circle size={20} className="text-muted-foreground/40" />
                    ) : (
                      <Lock size={16} className="text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{session.icon}</span>
                      <h4 className="font-body text-sm text-foreground font-medium leading-tight">{session.title}</h4>
                    </div>
                    <p className="font-body text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{session.description}</p>
                    <span className="font-body text-[10px] text-muted-foreground mt-1 inline-block">{session.duration}</span>
                  </div>

                  {/* Play button */}
                  {isUnlocked && !isCompleted && (
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
                        boxShadow: "0 4px 12px hsla(var(--healing-green) / 0.2)",
                      }}
                    >
                      <Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Safety note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 mb-4 rounded-2xl p-4 text-center"
          style={{ background: "hsla(var(--gold) / 0.06)", border: "1px solid hsla(var(--gold) / 0.12)" }}
        >
          <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
            🕊️ This journey is designed as supportive wellness content. It is not a substitute for professional medical advice.
          </p>
        </motion.div>
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
      <SoundPlayer track={activeTrack} onClose={handleClosePlayer} />
    </motion.div>
  );
};

export default SoundJourney;
