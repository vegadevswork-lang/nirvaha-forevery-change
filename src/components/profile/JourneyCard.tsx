import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const JourneyCard = () => {
  const moods: Array<{ mood: string; date: string }> = JSON.parse(
    localStorage.getItem("nirvaha_moods") || "[]"
  );

  const uniqueDays = new Set(moods.map((m) => m.date.split("T")[0])).size;
  const streak = uniqueDays;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="glass-card p-5 mx-1 mb-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--gold) / 0.1))",
          }}
        >
          <Flame size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Your journey</h3>
          <p className="font-body text-xs text-muted-foreground">
            {streak > 0
              ? `${streak} day${streak > 1 ? "s" : ""} of reflection`
              : "Begin your reflection today"}
          </p>
        </div>
      </div>

      {/* Timeline dots */}
      <div className="flex items-center gap-2 mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex-1 h-2 rounded-full"
            style={{
              background:
                i < streak
                  ? "linear-gradient(90deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))"
                  : "hsl(var(--muted))",
            }}
          />
        ))}
      </div>
      <p className="font-body text-[10px] text-muted-foreground mt-2 text-center italic">
        You showed up for yourself{streak > 1 ? " consistently" : ""}
      </p>
    </motion.div>
  );
};

export default JourneyCard;
