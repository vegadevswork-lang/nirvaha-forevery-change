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
        className="flex items-center gap-0.5 text-xs font-body text-primary font-medium flex-shrink-0 ml-3"
      >
        {viewAllLabel}
        <ChevronRight size={14} />
      </motion.button>
    )}
  </div>
);

export default SectionHeader;
