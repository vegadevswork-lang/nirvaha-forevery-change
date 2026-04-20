import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";

export type TileTone = "community" | "journal" | "wisdom" | "wellness";

interface CompactTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  to: string;
  tone: TileTone;
  /** Tiny category label shown top-left (e.g. "Connect", "Reflect"). */
  label?: string;
  highlighted?: boolean;
  delay?: number;
  image?: string;
}

// Category-specific soft gradient palette — each tone reads as its own family
// while staying within the Emerald Void aesthetic.
const toneStyles: Record<
  TileTone,
  { gradient: string; iconBg: string; glow: string; accent: string }
> = {
  community: {
    // Soft green — connection & sanctuary
    gradient:
      "linear-gradient(155deg, hsl(150 50% 28% / 0.55) 0%, hsl(155 55% 16% / 0.82) 60%, hsl(160 60% 10% / 0.95) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(150 60% 50% / 0.32), hsl(155 50% 35% / 0.22))",
    glow: "hsl(150 55% 45% / 0.18)",
    accent: "hsl(150 50% 70%)",
  },
  journal: {
    // Warm beige / amber-cream — reflection & warmth (kept in green-gold harmony)
    gradient:
      "linear-gradient(155deg, hsl(38 35% 32% / 0.5) 0%, hsl(35 30% 18% / 0.82) 60%, hsl(140 40% 10% / 0.95) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(40 65% 60% / 0.32), hsl(35 55% 40% / 0.22))",
    glow: "hsl(40 60% 50% / 0.18)",
    accent: "hsl(40 60% 75%)",
  },
  wisdom: {
    // Soft violet-gold — mysticism & inner sight
    gradient:
      "linear-gradient(155deg, hsl(280 35% 32% / 0.5) 0%, hsl(270 30% 18% / 0.82) 60%, hsl(260 35% 10% / 0.95) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(45 70% 60% / 0.32), hsl(280 45% 50% / 0.22))",
    glow: "hsl(280 50% 50% / 0.18)",
    accent: "hsl(45 65% 75%)",
  },
  wellness: {
    // Teal / cool — calm clarity & insight
    gradient:
      "linear-gradient(155deg, hsl(180 45% 28% / 0.55) 0%, hsl(185 50% 16% / 0.82) 60%, hsl(190 55% 10% / 0.95) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(180 60% 50% / 0.32), hsl(185 50% 35% / 0.22))",
    glow: "hsl(180 55% 45% / 0.18)",
    accent: "hsl(180 50% 72%)",
  },
};

const CompactTile = ({
  title,
  subtitle,
  icon: Icon,
  to,
  tone,
  label,
  highlighted,
  delay = 0,
  image,
}: CompactTileProps) => {
  const navigate = useNavigate();
  const styles = toneStyles[tone];

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={() => navigate(to)}
      className="relative overflow-hidden rounded-[20px] p-4 flex flex-col items-start text-left h-32 justify-between transition-all"
      style={{
        boxShadow: highlighted
          ? `0 0 0 1px hsl(var(--gold) / 0.5), 0 8px 24px ${styles.glow}, 0 4px 12px hsl(0 0% 0% / 0.25)`
          : `0 8px 24px ${styles.glow}, 0 4px 12px hsl(0 0% 0% / 0.25)`,
        border: "1px solid hsl(0 0% 100% / 0.08)",
      }}
    >
      {/* Background image — softly blurred to reduce noise */}
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(1.5px) saturate(0.85)", transform: "scale(1.05)" }}
        />
      )}

      {/* Tone gradient overlay — gives each card its category identity */}
      <div
        className="absolute inset-0"
        style={{ background: styles.gradient }}
      />

      {/* Top→bottom dark scrim purely for text legibility on the lower third */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 0% / 0) 40%, hsl(0 0% 0% / 0.35) 80%, hsl(0 0% 0% / 0.65) 100%)",
        }}
      />

      {/* Soft inner top highlight — adds the 'floating' feel */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.18), transparent)" }}
      />

      {/* Icon chip */}
      <div
        className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
        style={{
          background: styles.iconBg,
          backdropFilter: "blur(10px)",
          border: "1px solid hsl(0 0% 100% / 0.18)",
          boxShadow: "0 2px 8px hsl(0 0% 0% / 0.2)",
        }}
      >
        <Icon size={17} style={{ color: styles.accent }} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="relative min-w-0 w-full flex items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p
            className="font-display text-[15px] font-semibold leading-tight truncate"
            style={{
              color: "hsl(0 0% 100%)",
              textShadow: "0 1px 6px hsl(0 0% 0% / 0.6)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </p>
          <p
            className="font-body text-[11px] mt-1 line-clamp-1"
            style={{
              color: "hsl(0 0% 100% / 0.78)",
              textShadow: "0 1px 4px hsl(0 0% 0% / 0.55)",
            }}
          >
            {subtitle}
          </p>
        </div>
        <ChevronRight
          size={15}
          className="flex-shrink-0 mb-0.5"
          style={{ color: "hsl(0 0% 100% / 0.85)" }}
        />
      </div>
    </motion.button>
  );
};

export default CompactTile;
