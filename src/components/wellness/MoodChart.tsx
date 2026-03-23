import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoodEntry {
  mood: string;
  timestamp: string;
}

const moodScores: Record<string, number> = {
  happy: 5,
  grateful: 5,
  calm: 4,
  relax: 4,
  focus: 3.5,
  tired: 2,
  sad: 1.5,
  frustrated: 1.5,
  anxious: 1,
};

const moodLabels: Record<number, string> = {
  1: "😰",
  2: "😔",
  3: "😐",
  4: "😌",
  5: "😊",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface MoodChartProps {
  moodLog: MoodEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value as number;
  const emoji = moodLabels[Math.round(val)] || "😐";
  return (
    <div
      className="rounded-xl px-3 py-2 font-body text-xs"
      style={{
        background: "hsla(var(--glass-bg))",
        backdropFilter: "blur(16px)",
        border: "1px solid hsla(var(--glass-border))",
        boxShadow: "0 4px 16px hsla(var(--glass-shadow))",
        color: "hsl(var(--foreground))",
      }}
    >
      <span className="text-base mr-1">{emoji}</span>
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground ml-1">· {val.toFixed(1)}</span>
    </div>
  );
};

const MoodChart = ({ moodLog }: MoodChartProps) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    return DAYS.map((day, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayMoods = moodLog.filter((e) => {
        const t = new Date(e.timestamp);
        return t >= dayStart && t <= dayEnd;
      });

      if (dayMoods.length === 0) return { day, score: null };

      const avg =
        dayMoods.reduce((sum, e) => sum + (moodScores[e.mood.toLowerCase()] || 3), 0) /
        dayMoods.length;

      return { day, score: Math.round(avg * 10) / 10 };
    });
  }, [moodLog]);

  const hasData = chartData.some((d) => d.score !== null);

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-5 text-center"
      >
        <div className="text-4xl mb-3">🌱</div>
        <p className="font-display text-base font-semibold text-foreground mb-1">
          Your mood story begins here
        </p>
        <p className="font-body text-xs text-muted-foreground mb-4">
          Check in each day to unlock your weekly mood trend
        </p>
        <div className="h-24 flex items-end justify-around gap-1 px-4 opacity-20">
          {DAYS.map((d, i) => (
            <div key={d} className="flex flex-col items-center gap-1">
              <div
                className="w-6 rounded-t-lg"
                style={{
                  height: 20 + Math.random() * 40,
                  background: "hsl(var(--primary))",
                }}
              />
              <span className="text-[9px] font-body">{d}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Fill nulls with interpolated values for smooth line
  const filledData = chartData.map((d) => ({
    ...d,
    score: d.score ?? undefined,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-card p-5 mb-5"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Mood Trend
        </p>
        <div className="flex items-center gap-3">
          {[5, 3, 1].map((v) => (
            <span key={v} className="text-sm">{moodLabels[v]}</span>
          ))}
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filledData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 35%, 28%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 35%, 28%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsla(80, 15%, 85%, 0.4)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(150, 10%, 45%)", fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 5.5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={({ x, y, payload }: any) => (
                <text x={x} y={y} textAnchor="end" fontSize={12}>
                  {moodLabels[payload.value] || ""}
                </text>
              )}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(152, 35%, 28%)"
              strokeWidth={2.5}
              fill="url(#moodGradient)"
              dot={{
                r: 5,
                fill: "hsl(40, 33%, 96%)",
                stroke: "hsl(152, 35%, 28%)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "hsl(152, 35%, 28%)",
                stroke: "hsl(40, 33%, 96%)",
                strokeWidth: 2,
              }}
              connectNulls
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MoodChart;
