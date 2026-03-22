import { motion } from "framer-motion";
import { Wind, PenLine, Lightbulb } from "lucide-react";

const actionCards = [
  { title: "Ground your thoughts", subtitle: "2 min breathing", icon: Wind },
  { title: "Reflect & journal", subtitle: "Write freely", icon: PenLine },
  { title: "A new perspective", subtitle: "Shift your mind", icon: Lightbulb },
];

const SmartActions = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="mb-6"
  >
    <h3 className="font-display text-base text-foreground font-medium mb-3 px-0.5">
      A small step is enough
    </h3>
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      {actionCards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
          whileTap={{ scale: 0.97 }}
          className="glass-card p-4 min-w-[140px] flex-shrink-0 cursor-pointer hover:border-accent/40 transition-all duration-300 group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
            }}
          >
            <card.icon size={18} className="text-primary" />
          </div>
          <p className="font-body text-sm text-foreground font-medium leading-snug">{card.title}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">{card.subtitle}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SmartActions;
