import { motion } from "framer-motion";
import { communityTopics } from "@/data/communityData";

const allTopics = [{ label: "All", emoji: "🌿" }, ...communityTopics];

const TopicBar = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (topic: string) => void;
}) => (
  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
    {allTopics.map((t) => {
      const isActive = active === t.label;
      return (
        <motion.button
          key={t.label}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(t.label)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0 font-body text-xs transition-all"
          style={
            isActive
              ? {
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontWeight: 600,
                }
              : {
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }
          }
        >
          <span className="text-sm">{t.emoji}</span>
          {t.label}
        </motion.button>
      );
    })}
  </div>
);

export default TopicBar;
