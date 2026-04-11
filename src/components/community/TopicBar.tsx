import { motion } from "framer-motion";
import { sacredPaths, type SacredPath } from "@/data/communityData";

const allPaths = [{ id: "all" as const, label: "All Paths", fullLabel: "All Paths", hue: "152 35% 45%", color: "152 35% 55%" }, ...sacredPaths];

const TopicBar = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (path: string) => void;
}) => (
  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
    {allPaths.map((p) => {
      const isActive = active === p.id;
      return (
        <motion.button
          key={p.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(p.id)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl flex-shrink-0 font-body text-xs transition-all relative overflow-hidden"
          style={
            isActive
              ? {
                  background: `hsl(${p.hue} / 0.15)`,
                  border: `1px solid hsl(${p.hue} / 0.4)`,
                  color: `hsl(${p.hue})`,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  boxShadow: `0 0 20px hsl(${p.hue} / 0.15), inset 0 1px 0 hsl(${p.hue} / 0.1)`,
                }
              : {
                  background: "hsl(var(--muted) / 0.3)",
                  border: "1px solid hsl(var(--border) / 0.15)",
                  color: "hsl(var(--muted-foreground))",
                  letterSpacing: "0.02em",
                }
          }
        >
          {isActive && (
            <motion.div
              layoutId="sacred-path-glow"
              className="absolute inset-0 rounded-2xl"
              style={{ background: `hsl(${p.hue} / 0.08)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 font-display text-xs" style={{ fontStyle: "italic" }}>
            {p.fullLabel}
          </span>
        </motion.button>
      );
    })}
  </div>
);

export default TopicBar;
