import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Cloud, Sun, Zap } from "lucide-react";

interface MoodEntry {
  mood: string;
  timestamp: string;
}

const moodScores: Record<string, number> = {
  happy: 5, grateful: 5, calm: 4, relax: 4, focus: 3.5,
  tired: 2, sad: 1.5, frustrated: 1.5, anxious: 1,
};

interface WeeklyInsightProps {
  moodLog: MoodEntry[];
}

const WeeklyInsight = ({ moodLog }: WeeklyInsightProps) => {
  const insight = useMemo(() => {
    if (moodLog.length === 0) return null;

    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const weekMoods = moodLog.filter((e) => new Date(e.timestamp) >= monday);
    if (weekMoods.length === 0) return null;

    const scores = weekMoods.map((e) => moodScores[e.mood.toLowerCase()] || 3);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const moodCounts: Record<string, number> = {};
    weekMoods.forEach((e) => {
      const m = e.mood.toLowerCase();
      moodCounts[m] = (moodCounts[m] || 0) + 1;
    });
    const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const calmDays = scores.filter((s) => s >= 4).length;

    let summary = "";
    if (avg >= 4) summary = "A calm and balanced week. You're finding your rhythm 🌿";
    else if (avg >= 3) summary = "A mixed week with moments of calm and challenge. You're navigating well.";
    else if (avg >= 2) summary = "A heavier week emotionally. Remember, awareness is the first step toward balance.";
    else summary = "This week has been challenging. You're doing something powerful just by showing up here 💛";

    return { summary, mostCommon, avg, calmDays, totalEntries: weekMoods.length };
  }, [moodLog]);

  if (!insight) return null;

  const cards = [
    {
      icon: Sun,
      label: "Most common mood",
      value: insight.mostCommon[0].charAt(0).toUpperCase() + insight.mostCommon[0].slice(1),
      sub: `${insight.mostCommon[1]} times this week`,
    },
    {
      icon: TrendingUp,
      label: "Overall balance",
      value: insight.avg >= 4 ? "Balanced" : insight.avg >= 3 ? "Moderate" : "Needs care",
      sub: `Average score: ${insight.avg.toFixed(1)}/5`,
    },
    {
      icon: Cloud,
      label: "Calmer days",
      value: `${insight.calmDays} days`,
      sub: insight.calmDays >= 4 ? "Strong calm streak" : "Growing steadily",
    },
  ];

  return (
    <>
      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="glass-card p-5 mb-5"
      >
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
            }}
          >
            <Zap size={16} className="text-primary" />
          </div>
          <div>
            <p className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Weekly Insight
            </p>
            <p className="font-body text-[13px] text-foreground leading-relaxed">
              {insight.summary}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.06 }}
            className="glass-card p-3.5 flex flex-col items-center text-center"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
              style={{
                background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
              }}
            >
              <card.icon size={14} className="text-primary" />
            </div>
            <p className="font-display text-sm text-foreground font-bold leading-tight">{card.value}</p>
            <p className="font-body text-[9px] text-muted-foreground mt-1 uppercase tracking-wider leading-tight">
              {card.label}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default WeeklyInsight;
