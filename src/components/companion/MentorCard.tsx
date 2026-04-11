import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Mentor } from "@/data/companionData";

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  isForYou?: boolean;
  compact?: boolean;
}

const MentorCard = ({ mentor, index, isForYou, compact }: MentorCardProps) => {
  const navigate = useNavigate();

  // Compact horizontal card for "For You" carousel
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="flex-shrink-0 w-[200px] rounded-3xl p-4 cursor-pointer relative overflow-hidden"
        style={{ background: mentor.avatarGradient }}
        onClick={() => navigate(`/companion/mentor/${mentor.id}`)}
      >
        <div className="relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <span className="text-sm font-display font-semibold text-white">
              {mentor.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <h3 className="font-display text-sm font-semibold text-white leading-tight">{mentor.name}</h3>
          <p className="font-body text-[11px] text-white/70 mt-0.5 line-clamp-1">{mentor.title}</p>
          <div className="flex items-center gap-1 mt-2.5">
            <Star size={10} className="fill-current text-white/90" />
            <span className="text-[11px] font-body text-white/90 font-medium">{mentor.rating}</span>
          </div>
          <span className="inline-block mt-2.5 text-[10px] font-body px-2.5 py-1 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">
            {mentor.specializations[0]}
          </span>
        </div>
      </motion.div>
    );
  }

  // Standard list card — clean & minimal
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-colors hover:bg-muted/30 active:bg-muted/50"
      onClick={() => navigate(`/companion/mentor/${mentor.id}`)}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: mentor.avatarGradient }}
      >
        <span className="text-sm font-display font-semibold text-white">
          {mentor.name.split(" ").map(n => n[0]).join("")}
        </span>
      </div>

      {/* Info — only essentials */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-[15px] font-semibold text-foreground leading-tight truncate">{mentor.name}</h3>
        <p className="font-body text-xs text-muted-foreground mt-0.5 truncate">{mentor.title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="flex items-center gap-1 text-xs font-body">
            <Star size={11} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
            <span className="text-foreground font-medium">{mentor.rating}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="text-[11px] font-body text-muted-foreground">{mentor.nextAvailable}</span>
        </div>
      </div>

      <ArrowRight size={16} className="text-muted-foreground/50 flex-shrink-0" />
    </motion.div>
  );
};

export default MentorCard;
