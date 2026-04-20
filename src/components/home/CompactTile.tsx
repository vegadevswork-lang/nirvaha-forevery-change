import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface CompactTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  to: string;
  highlighted?: boolean;
  delay?: number;
  image?: string;
  gradient?: string;
}

const CompactTile = ({
  title,
  subtitle,
  icon: Icon,
  to,
  highlighted,
  delay = 0,
  image,
  gradient,
}: CompactTileProps) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(to)}
      className="relative overflow-hidden rounded-2xl p-3.5 flex flex-col items-start text-left h-28 justify-between transition-all border border-border/40"
      style={{
        boxShadow: highlighted
          ? "0 0 0 1px hsl(var(--gold) / 0.5), 0 4px 16px hsl(var(--gold) / 0.15)"
          : "0 4px 16px hsl(var(--background) / 0.3)",
      }}
    >
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Gradient overlay (always — provides legibility + glass feel) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            gradient ||
            "linear-gradient(160deg, hsl(var(--card) / 0.85), hsl(var(--card) / 0.95))",
          backdropFilter: image ? "blur(0.5px)" : undefined,
        }}
      />
      {/* Extra bottom-darken layer for guaranteed text contrast on busy images */}
      {image && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, hsl(0 0% 0% / 0) 30%, hsl(0 0% 0% / 0.4) 75%, hsl(0 0% 0% / 0.85) 100%)",
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--healing-green) / 0.3), hsl(var(--gold) / 0.22))",
          backdropFilter: "blur(8px)",
          border: "1px solid hsl(0 0% 100% / 0.15)",
        }}
      >
        <Icon size={16} className={image ? "text-white" : "text-primary"} />
      </div>
      <div className="relative min-w-0 w-full flex items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p
            className="font-display text-sm font-semibold leading-tight truncate"
            style={{
              color: image ? "hsl(0 0% 100%)" : "hsl(var(--foreground))",
              textShadow: image ? "0 1px 6px hsl(0 0% 0% / 0.55)" : undefined,
            }}
          >
            {title}
          </p>
          <p
            className="font-body text-[10px] mt-0.5 line-clamp-1"
            style={{
              color: image
                ? "hsl(0 0% 100% / 0.9)"
                : "hsl(var(--muted-foreground))",
              textShadow: image ? "0 1px 4px hsl(0 0% 0% / 0.5)" : undefined,
            }}
          >
            {subtitle}
          </p>
        </div>
        <ChevronRight
          size={14}
          className="flex-shrink-0 mb-0.5 opacity-70"
          style={{ color: image ? "hsl(0 0% 100%)" : "hsl(var(--foreground))" }}
        />
      </div>
    </motion.button>
  );
};

export default CompactTile;
