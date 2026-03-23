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
    <h3 className="font-display text-base text-foreground font-medium mb-3">
      A small step is enough
    </h3>
    <div className="grid grid-cols-3 gap-2.5">
      {actionCards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
          whileTap={{ scale: 0.96 }}
          className="glass-card p-3.5 cursor-pointer hover:border-accent/40 transition-all duration-300 group flex flex-col items-center text-center"
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.12), hsla(var(--gold) / 0.1))",
            }}
          >
            <card.icon size={18} className="text-primary" />
          </div>
          <p className="font-body text-xs text-foreground font-medium leading-snug">{card.title}</p>
          <p className="font-body text-[10px] text-muted-foreground mt-0.5">{card.subtitle}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SmartActions;
