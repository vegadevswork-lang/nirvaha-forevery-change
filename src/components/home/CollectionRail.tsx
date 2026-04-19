import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Play } from "lucide-react";
import { aiRecommendations, contentRows, type ContentItem } from "@/data/collectionData";
import SectionHeader from "./SectionHeader";

interface CollectionRailProps {
  emotion?: string | null;
}

const emotionToTag: Record<string, string[]> = {
  Stressed: ["Sleep", "Calm", "Breathing", "Relaxation"],
  Angry: ["Calm", "Breathing", "Mindfulness"],
  Sensitive: ["Compassion", "Heart", "Healing"],
  Sad: ["Compassion", "Healing", "Heart"],
  Hurt: ["Healing", "Compassion"],
  Confused: ["Focus", "Awareness", "Presence"],
  Bored: ["Creative", "Focus"],
  Joyful: ["Morning", "Energy"],
  Grateful: ["Heart", "Compassion"],
};

const CollectionRail = ({ emotion }: CollectionRailProps) => {
  const navigate = useNavigate();
  const meditations = contentRows.find((r) => r.title === "Guided Meditations")?.items || [];
  const pool: ContentItem[] = [...aiRecommendations, ...meditations];

  const tags = emotion ? emotionToTag[emotion] : null;
  const ranked = tags
    ? [...pool].sort((a, b) => {
        const aHit = a.tags.some((t) => tags.includes(t)) ? -1 : 0;
        const bHit = b.tags.some((t) => tags.includes(t)) ? -1 : 0;
        return aHit - bHit;
      })
    : pool;

  const visible = ranked.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mb-7"
    >
      <SectionHeader
        title="From the Collection"
        subtitle="Curated for this moment"
        onViewAll={() => navigate("/collection")}
      />
      <div
        className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visible.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(`/collection/${item.id}`)}
            className="flex flex-col flex-shrink-0 w-36 text-left"
          >
            <div className="relative w-36 h-24 rounded-xl overflow-hidden mb-2 border border-border/40">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, hsl(var(--background) / 0.7) 100%)",
                }}
              />
              {item.duration && (
                <div
                  className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-body font-medium"
                  style={{
                    background: "hsl(var(--background) / 0.85)",
                    color: "hsl(var(--foreground))",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Clock size={9} />
                  {item.duration}
                </div>
              )}
              <div
                className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--primary))" }}
              >
                <Play size={11} className="text-primary-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
            <p className="font-body text-xs text-foreground font-medium line-clamp-2 leading-tight">
              {item.title}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
};

export default CollectionRail;
