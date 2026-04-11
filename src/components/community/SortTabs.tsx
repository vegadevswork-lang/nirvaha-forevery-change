import { motion } from "framer-motion";
import type { SortMode } from "./types";

const tabs: { mode: SortMode; label: string }[] = [
  { mode: "new", label: "Recent" },
  { mode: "resonated", label: "Most Resonated" },
  { mode: "seeking", label: "Seeking Light" },
];

const SortTabs = ({
  active,
  onSelect,
}: {
  active: SortMode;
  onSelect: (mode: SortMode) => void;
}) => (
  <div
    className="flex gap-1 p-1 rounded-2xl"
    style={{
      background: "hsl(var(--muted) / 0.2)",
      border: "1px solid hsl(var(--border) / 0.1)",
    }}
  >
    {tabs.map((t) => {
      const isActive = active === t.mode;
      return (
        <motion.button
          key={t.mode}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(t.mode)}
          className="flex-1 flex items-center justify-center py-2 rounded-xl font-body text-[11px] transition-all relative"
          style={
            isActive
              ? {
                  background: "hsl(var(--card) / 0.8)",
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 8px hsl(var(--glass-shadow)), 0 0 12px hsl(var(--primary) / 0.08)",
                }
              : { color: "hsl(var(--muted-foreground))" }
          }
        >
          {t.label}
        </motion.button>
      );
    })}
  </div>
);

export default SortTabs;
