import { useState, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/home/BottomNav";
import WeeklyInsight from "@/components/wellness/WeeklyInsight";
import WellnessActions from "@/components/wellness/WellnessActions";
import StreakSection from "@/components/wellness/StreakSection";
import { useMoodLog } from "@/hooks/use-mood-log";

// Lazy-load the chart — recharts is ~370 KiB and only one section needs it
const MoodChart = lazy(() => import("@/components/wellness/MoodChart"));

const Wellness = () => {
  const [activeNav, setActiveNav] = useState("Wellness");
  const { moodLog } = useMoodLog();

  // Calculate avg mood for action recommendations
  const moodScores: Record<string, number> = {
    happy: 5, grateful: 5, calm: 4, relax: 4, focus: 3.5,
    tired: 2, sad: 1.5, frustrated: 1.5, anxious: 1,
  };
  const avgMood = useMemo(() => {
    if (moodLog.length === 0) return 3;
    const scores = moodLog.map((e) => moodScores[e.mood.toLowerCase()] || 3);
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }, [moodLog]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 240, height: 240, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, bottom: "30%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl text-foreground font-semibold leading-tight">
            Wellness
          </h1>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Your emotional journey this week
          </p>
        </motion.div>

        {/* Mood Chart */}
        <Suspense fallback={<div className="glass-card h-56 mb-5 animate-pulse-soft" />}>
          <MoodChart moodLog={moodLog} />
        </Suspense>

        {/* Weekly Insight + Pattern Cards */}
        <WeeklyInsight moodLog={moodLog} />

        {/* Action Recommendations */}
        <WellnessActions avgMood={avgMood} />

        {/* Streaks */}
        <StreakSection moodLog={moodLog} />

        {/* Journey Continuity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-6"
        >
          <p className="font-display text-sm text-muted-foreground italic">
            "Patterns are becoming clearer"
          </p>
          <p className="font-body text-[10px] text-muted-foreground mt-1 opacity-60">
            Small check-ins create meaningful insight
          </p>
        </motion.div>
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

export default Wellness;
