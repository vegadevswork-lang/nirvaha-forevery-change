import { motion } from "framer-motion";
import { Star, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Mentor } from "@/data/companionData";

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  isForYou?: boolean;
}

const MentorCard = ({ mentor, index, isForYou }: MentorCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-4 mb-3 cursor-pointer"
      onClick={() => navigate(`/companion/mentor/${mentor.id}`)}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: mentor.avatarGradient }}
        >
          <span className="text-lg font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
            {mentor.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground leading-tight">{mentor.name}</h3>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{mentor.title}</p>
            </div>
            {isForYou && (
              <span
                className="text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: "hsla(var(--gold) / 0.15)",
                  color: "hsl(var(--accent))",
                }}
              >
                For You
              </span>
            )}
          </div>

          {/* Rating + availability */}
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs font-body">
              <Star size={12} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
              <span className="text-foreground font-medium">{mentor.rating}</span>
              <span className="text-muted-foreground">({mentor.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-body text-muted-foreground">
              <Clock size={11} />
              {mentor.nextAvailable}
            </span>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {mentor.specializations.slice(0, 2).map(s => (
              <span
                key={s}
                className="text-[10px] font-body px-2 py-0.5 rounded-full"
                style={{
                  background: "hsla(var(--healing-green) / 0.08)",
                  color: "hsl(var(--healing-green))",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-2 mt-2">
            {mentor.verified && (
              <span className="flex items-center gap-0.5 text-[10px] font-body text-muted-foreground">
                <ShieldCheck size={10} style={{ color: "hsl(var(--healing-green))" }} />
                Verified
              </span>
            )}
            <span className="text-[10px] font-body text-muted-foreground">
              {mentor.sessionsCompleted} sessions
            </span>
          </div>
        </div>

        <ArrowRight size={16} className="text-muted-foreground self-center flex-shrink-0" />
      </div>
    </motion.div>
  );
};

export default MentorCard;
