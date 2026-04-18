import { motion } from "framer-motion";
import { Users, Play, Headphones, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tiles = [
  {
    label: "Companion",
    desc: "Talk to a guide",
    icon: Users,
    route: "/companion",
    accent: "270 45% 60%",
  },
  {
    label: "Collection",
    desc: "Wellness OTT",
    icon: Play,
    route: "/collection?intro=1",
    accent: "42 70% 55%",
  },
  {
    label: "Sounds",
    desc: "Healing tones",
    icon: Headphones,
    route: "/sound-healing",
    accent: "150 40% 50%",
  },
  {
    label: "Space",
    desc: "Be heard",
    icon: Heart,
    route: "/community",
    accent: "200 50% 55%",
  },
];

const FeatureTiles = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-7"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-display text-[15px] text-foreground font-medium">
          Explore
        </h3>
        <span className="font-body text-[11px] text-muted-foreground">
          gentle paths
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <motion.button
            key={t.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(t.route)}
            className="relative rounded-2xl p-4 flex flex-col items-start text-left overflow-hidden min-h-[112px]"
            style={{
              background: "hsla(var(--glass-bg))",
              border: "1px solid hsla(var(--glass-border))",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-25 pointer-events-none"
              style={{ background: `hsl(${t.accent})`, filter: "blur(12px)" }}
            />
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{
                background: `hsla(${t.accent} / 0.18)`,
                border: `1px solid hsla(${t.accent} / 0.3)`,
              }}
            >
              <t.icon size={16} style={{ color: `hsl(${t.accent})` }} />
            </div>
            <p className="font-display text-sm text-foreground font-semibold leading-tight">
              {t.label}
            </p>
            <p className="font-body text-[11px] text-muted-foreground mt-0.5">
              {t.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureTiles;
