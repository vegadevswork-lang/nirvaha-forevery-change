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

// HD portrait photos per mentor — Unsplash, w=600 q=85 dpr=2 for retina
const PORTRAIT = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&q=85&auto=format&fit=crop&crop=faces&dpr=2`;

const portraits: Record<string, string> = {
  m1: PORTRAIT("photo-1573496359142-b8d87734a5a2"), // Priya — woman professional
  m2: PORTRAIT("photo-1507003211169-0a1dd7228f2d"), // Arjun — man warm
  m3: PORTRAIT("photo-1438761681033-6461ffad8d80"), // woman 3
  m4: PORTRAIT("photo-1472099645785-5658abf4ff4e"), // man 2
  m5: PORTRAIT("photo-1544005313-94ddf0286df2"), // woman 4
  m6: PORTRAIT("photo-1500648767791-00dcc994a43e"), // man 3
  m7: PORTRAIT("photo-1487412720507-e7ab37603c6f"), // woman 5
  m8: PORTRAIT("photo-1519085360753-af0119f7cbe7"), // man 4
};

const fallbackPortrait = PORTRAIT("photo-1531123897727-8f129e1688ce");

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
        className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 snap-x snap-mandatory overscroll-x-contain"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {visible.map((m, i) => {
          const photo = portraits[m.id] || fallbackPortrait;
          const firstName = m.name.split(" ")[0];
          const isMatch = preferredDomain && m.domain === preferredDomain;
          return (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(`/companion/mentor/${m.id}`)}
              className="relative flex-shrink-0 w-[112px] h-[150px] rounded-2xl overflow-hidden snap-start text-left border border-border/40"
              style={{
                boxShadow: isMatch
                  ? "0 0 0 1px hsl(var(--gold) / 0.6), 0 8px 24px hsl(var(--gold) / 0.18)"
                  : "0 6px 20px hsl(var(--background) / 0.4)",
              }}
            >
              <img
                src={photo}
                alt={m.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Bottom gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(0 0% 0% / 0) 40%, hsl(0 0% 0% / 0.45) 70%, hsl(0 0% 0% / 0.88) 100%)",
                }}
              />
              {/* Verified dot */}
              {m.verified && (
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{
                    background: "hsl(var(--healing-green))",
                    boxShadow: "0 0 8px hsl(var(--healing-green) / 0.9)",
                  }}
                  aria-label="Verified"
                />
              )}
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2">
                <p className="font-display text-[12px] font-semibold text-white leading-tight truncate">
                  {firstName}
                </p>
                <p className="font-body text-[9.5px] text-white/80 leading-tight truncate mt-0.5">
                  {m.title}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default MentorRail;
