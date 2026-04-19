import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mentors } from "@/data/companionData";
import SectionHeader from "./SectionHeader";

interface MentorRailProps {
  emotion?: string | null;
}

const emotionToDomain: Record<string, "career" | "relationship" | "purpose" | "emotional"> = {
  Stressed: "emotional",
  Angry: "emotional",
  Sensitive: "emotional",
  Confused: "purpose",
  Bored: "purpose",
  Hurt: "relationship",
  Insecure: "relationship",
  Guilty: "relationship",
};

const MentorRail = ({ emotion }: MentorRailProps) => {
  const navigate = useNavigate();
  const preferredDomain = emotion ? emotionToDomain[emotion] : null;

  const ranked = preferredDomain
    ? [...mentors].sort((a, b) => {
        const aMatch = a.domain === preferredDomain ? -1 : 0;
        const bMatch = b.domain === preferredDomain ? -1 : 0;
        return aMatch - bMatch;
      })
    : mentors;

  const visible = ranked.slice(0, 8);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-7"
    >
      <SectionHeader
        title="Companions"
        subtitle="Real humans, ready to listen"
        onViewAll={() => navigate("/companion")}
      />
      <div
        className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visible.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.3 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate(`/mentor/${m.id}`)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 w-16"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-display text-base font-semibold text-white shadow-md"
              style={{
                background: m.avatarGradient,
                boxShadow: "0 4px 12px hsl(var(--healing-green) / 0.25)",
              }}
            >
              {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <span className="text-[10px] font-body text-foreground/85 text-center leading-tight truncate w-full">
              {m.name.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
};

export default MentorRail;
