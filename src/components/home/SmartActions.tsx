import { motion } from "framer-motion";
import { Wind, PenLine, Lightbulb } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const actionCards = [
  { title: "Ground your thoughts", subtitle: "2 min breathing", icon: Wind, hover: "Begin breathing" },
  { title: "Reflect & journal", subtitle: "Write freely", icon: PenLine, hover: "Open journal" },
  { title: "A new perspective", subtitle: "Shift your mind", icon: Lightbulb, hover: "Explore" },
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
        >
          <InteractiveHoverButton
            variant="glass"
            hoverContent={card.hover}
            className="w-full p-3.5 flex flex-col items-center text-center rounded-2xl min-h-[100px]"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5"
              style={{
                background: "linear-gradient(135deg, hsl(var(--healing-green) / 0.12), hsl(var(--gold) / 0.1))",
              }}
            >
              <card.icon size={18} className="text-primary" />
            </div>
            <p className="font-body text-xs text-foreground font-medium leading-snug">{card.title}</p>
            <p className="font-body text-[10px] text-muted-foreground mt-0.5">{card.subtitle}</p>
          </InteractiveHoverButton>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SmartActions;
