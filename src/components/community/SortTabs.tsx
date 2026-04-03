import { motion } from "framer-motion";
import { Clock, Heart, HelpCircle } from "lucide-react";
import type { SortMode } from "./types";

const tabs: { mode: SortMode; label: string; icon: typeof Clock }[] = [
  { mode: "new", label: "New", icon: Clock },
  { mode: "resonated", label: "Most Resonated", icon: Heart },
  { mode: "seeking", label: "Seeking Support", icon: HelpCircle },
];

const SortTabs = ({
  active,
  onSelect,
}: {
  active: SortMode;
  onSelect: (mode: SortMode) => void;
}) => (
  <div className="flex gap-1 p-1 rounded-xl" style={{ background: "hsl(var(--muted) / 0.6)" }}>
    {tabs.map((t) => {
      const isActive = active === t.mode;
      const Icon = t.icon;
      return (
        <motion.button
          key={t.mode}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(t.mode)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-body text-[11px] transition-all relative"
          style={
            isActive
              ? {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                  boxShadow: "0 1px 3px hsl(var(--glass-shadow))",
                }
              : { color: "hsl(var(--muted-foreground))" }
          }
        >
          <Icon size={12} />
          {t.label}
        </motion.button>
      );
    })}
  </div>
);

export default SortTabs;
