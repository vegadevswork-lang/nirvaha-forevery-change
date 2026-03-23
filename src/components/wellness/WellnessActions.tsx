import { motion } from "framer-motion";
import { MessageCircle, BookOpen, Wind, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WellnessActionsProps {
  avgMood: number;
}

const WellnessActions = ({ avgMood }: WellnessActionsProps) => {
  const navigate = useNavigate();

  const actions =
    avgMood < 3
      ? [
          { icon: MessageCircle, label: "Talk to Nirvaha", sub: "Share how you're feeling", route: "/chat" },
          { icon: Wind, label: "Calming practice", sub: "2-minute breathing exercise", route: "/chat" },
        ]
      : [
          { icon: BookOpen, label: "Write a reflection", sub: "Capture this week's insights", route: "/home" },
          { icon: Sparkles, label: "Wisdom Selfie", sub: "Express your inner journey", route: "/legends-selfie" },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-5"
    >
      <p className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
        Suggested for you
      </p>
      <div className="space-y-2.5">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.route)}
            className="glass-card w-full p-4 flex items-center gap-3.5 text-left"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
                boxShadow: "0 2px 12px hsla(var(--healing-green) / 0.2)",
              }}
            >
              <action.icon size={18} style={{ color: "hsl(var(--primary-foreground))" }} />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-foreground">{action.label}</p>
              <p className="font-body text-[11px] text-muted-foreground">{action.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessActions;
