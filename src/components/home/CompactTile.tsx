import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface CompactTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  to: string;
  highlighted?: boolean;
  delay?: number;
}

const CompactTile = ({ title, subtitle, icon: Icon, to, highlighted, delay = 0 }: CompactTileProps) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(to)}
      className="glass-card p-3.5 flex flex-col items-start text-left h-28 justify-between transition-all"
      style={{
        boxShadow: highlighted ? "0 0 0 1px hsl(var(--gold) / 0.5), 0 4px 16px hsl(var(--gold) / 0.15)" : undefined,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--healing-green) / 0.18), hsl(var(--gold) / 0.12))",
        }}
      >
        <Icon size={16} className="text-primary" />
      </div>
      <div className="min-w-0 w-full">
        <p className="font-display text-sm text-foreground font-semibold leading-tight truncate">
          {title}
        </p>
        <p className="font-body text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
          {subtitle}
        </p>
      </div>
    </motion.button>
  );
};

export default CompactTile;
