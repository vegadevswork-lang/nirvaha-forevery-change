import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SpiritualGuide } from "@/data/companionData";

interface SpiritualGuideCardProps {
  guide: SpiritualGuide;
  index: number;
}

const SpiritualGuideCard = ({ guide, index }: SpiritualGuideCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="glass-card p-4 mb-3 cursor-pointer"
      onClick={() => navigate(`/companion/guide/${guide.id}`)}
    >
      <div className="flex gap-3">
        {/* Avatar with spiritual marker */}
        <div className="relative flex-shrink-0">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: guide.avatarGradient }}
          >
            <span className="text-lg font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
              {guide.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          {/* Spiritual badge */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
            style={{
              background: "hsl(var(--gold))",
              boxShadow: "0 2px 6px hsla(var(--gold) / 0.3)",
            }}
          >
            🕉️
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-foreground leading-tight">{guide.name}</h3>
          <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--accent))" }}>
            {guide.spiritualTitle} · {guide.tradition}
          </p>
          <p className="font-body text-[11px] text-muted-foreground mt-0.5">{guide.lineage}</p>

          {/* Verification */}
          <div className="flex items-center gap-2 mt-2">
            {guide.lineageVerified && (
              <span className="flex items-center gap-1 text-[10px] font-body" style={{ color: "hsl(var(--healing-green))" }}>
                ✓ Lineage Verified
              </span>
            )}
            {guide.communityEndorsed && (
              <span className="flex items-center gap-1 text-[10px] font-body" style={{ color: "hsl(var(--healing-green))" }}>
                ✓ Community Endorsed
              </span>
            )}
          </div>

          {/* Offerings preview */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {guide.offerings.slice(0, 2).map(o => (
              <span
                key={o}
                className="text-[10px] font-body px-2 py-0.5 rounded-full"
                style={{
                  background: "hsla(var(--gold) / 0.1)",
                  color: "hsl(var(--accent))",
                }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>

        <ArrowRight size={16} className="text-muted-foreground self-center flex-shrink-0" />
      </div>
    </motion.div>
  );
};

export default SpiritualGuideCard;
