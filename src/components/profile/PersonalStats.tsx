import { motion } from "framer-motion";
import { Heart, BookOpen, Activity } from "lucide-react";

const PersonalStats = () => {
  const moods: Array<{ mood: string }> = JSON.parse(
    localStorage.getItem("nirvaha_moods") || "[]"
  );
  const checkIns = moods.length;

  const stats = [
    { label: "Reflections", value: String(checkIns), icon: Heart },
    { label: "Journal entries", value: "0", icon: BookOpen },
    { label: "Sessions", value: String(Math.max(1, checkIns)), icon: Activity },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="grid grid-cols-3 gap-3 mx-1 mb-5"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.07 }}
          className="glass-card p-3.5 flex flex-col items-center text-center"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
            style={{
              background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
            }}
          >
            <stat.icon size={14} className="text-primary" />
          </div>
          <p className="font-display text-xl font-bold text-foreground leading-none">{stat.value}</p>
          <p className="font-body text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PersonalStats;
