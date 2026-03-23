import { motion } from "framer-motion";
import { Flame, Heart, BookOpen } from "lucide-react";

const stats = [
  { label: "Streak", value: "7", unit: "days", icon: Flame },
  { label: "Sessions", value: "23", unit: "total", icon: Heart },
  { label: "Entries", value: "12", unit: "journal", icon: BookOpen },
];

const WellnessStats = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="grid grid-cols-3 gap-3 mb-6"
  >
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
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
          <stat.icon size={15} className="text-primary" />
        </div>
        <p className="font-display text-2xl text-foreground font-bold leading-none">{stat.value}</p>
        <p className="font-body text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
      </motion.div>
    ))}
  </motion.div>
);

export default WellnessStats;
