import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
}

const SectionHeader = ({ title, subtitle, onViewAll, viewAllLabel = "View All" }: SectionHeaderProps) => (
  <div className="flex items-end justify-between mb-3 px-0.5">
    <div className="min-w-0">
      <h3 className="font-display text-base text-foreground font-semibold leading-tight truncate">
        {title}
      </h3>
      {subtitle && (
        <p className="font-body text-[11px] text-muted-foreground mt-0.5 truncate">
          {subtitle}
        </p>
      )}
    </div>
    {onViewAll && (
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onViewAll}
        className="flex items-center gap-0.5 text-[11px] font-body text-foreground/90 font-medium flex-shrink-0 ml-3 px-2.5 py-1 rounded-full"
        style={{
          background: "hsl(var(--gold) / 0.08)",
          border: "1px solid hsl(var(--gold) / 0.45)",
          boxShadow: "0 1px 4px hsl(var(--gold) / 0.12)",
        }}
      >
        {viewAllLabel}
        <ChevronRight size={13} className="text-gold" style={{ color: "hsl(var(--gold))" }} />
      </motion.button>
    )}
  </div>
);

export default SectionHeader;
