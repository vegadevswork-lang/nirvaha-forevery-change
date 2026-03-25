import { motion } from "framer-motion";
import { Flame, CheckCircle, ArrowUpRight } from "lucide-react";

import type { MoodEntry } from "@/hooks/use-mood-log";

const moodScores: Record<string, number> = {
  happy: 5, grateful: 5, calm: 4, relax: 4, focus: 3.5,
  tired: 2, sad: 1.5, frustrated: 1.5, anxious: 1,
};

interface StreakSectionProps {
  moodLog: MoodEntry[];
}

const StreakSection = ({ moodLog }: StreakSectionProps) => {
  // Calculate check-in streak
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const weekMoods = moodLog.filter((e) => new Date(e.timestamp) >= monday);
  const uniqueDays = new Set(
    weekMoods.map((e) => new Date(e.timestamp).toDateString())
  ).size;

  // Calm streak
  const scores = weekMoods.map((e) => moodScores[e.mood.toLowerCase()] || 3);
  let calmStreak = 0;
  for (let i = scores.length - 1; i >= 0; i--) {
    if (scores[i] >= 3.5) calmStreak++;
    else break;
  }

  if (weekMoods.length === 0) return null;

  const streaks = [
    {
      icon: Flame,
      text: `${uniqueDays} day${uniqueDays !== 1 ? "s" : ""} checked in this week`,
    },
    ...(calmStreak >= 2
      ? [{ icon: CheckCircle, text: `${calmStreak} calmer check-ins in a row` }]
      : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-5"
    >
      <div className="space-y-2">
        {streaks.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-1"
          >
            <s.icon size={14} className="text-primary flex-shrink-0" />
            <p className="font-body text-xs text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StreakSection;
