import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import EmotionChips from "@/components/home/EmotionChips";
import AiHeroCard from "@/components/home/AiHeroCard";
import SmartActions from "@/components/home/SmartActions";
import GreetingHeader from "@/components/home/GreetingHeader";
import MentorRail from "@/components/home/MentorRail";
import CollectionRail from "@/components/home/CollectionRail";
import SoundRail from "@/components/home/SoundRail";
import CompactTile from "@/components/home/CompactTile";
import BottomNav from "@/components/home/BottomNav";
import { useMoodLog } from "@/hooks/use-mood-log";

const acknowledgments: Record<string, string> = {
  Stressed: "Let's slow it down together.",
  Angry: "It's okay. Let's breathe through this.",
  Sensitive: "You're held. Take your time.",
  Confused: "Clarity is one breath away.",
  Bored: "Let's spark something fresh.",
  Hurt: "Your feelings are valid here.",
  Insecure: "You are enough, exactly as you are.",
  Guilty: "Be gentle with yourself.",
  Joyful: "Beautiful. Let's expand this.",
  Grateful: "Gratitude is the highest frequency.",
  Excited: "That energy is welcome here.",
  Calm: "Stay in this softness.",
};

const Home = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const { logMood } = useMoodLog();

  const handleEmotionTap = (label: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSparkleTrigger((t) => t + 1);
    setSelectedEmotion(label);
    logMood(label);
  };

  const ack = selectedEmotion ? acknowledgments[selectedEmotion] : null;

  // Re-order rails based on emotion intent
  const isHeavy = selectedEmotion && ["Stressed", "Angry", "Sensitive", "Hurt", "Insecure", "Guilty"].includes(selectedEmotion);
  const isLight = selectedEmotion && ["Joyful", "Grateful", "Excited"].includes(selectedEmotion);

  const rails = useMemo(() => {
    if (isHeavy) {
      // Sound first to soothe, then companions, then collection
      return ["sound", "companions", "collection"] as const;
    }
    if (isLight) {
      return ["collection", "companions", "sound"] as const;
    }
    return ["companions", "collection", "sound"] as const;
  }, [isHeavy, isLight]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 280, height: 280, top: "3%", right: "-8%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 220, height: 220, bottom: "25%", left: "-8%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        <GreetingHeader />

        <EmotionChips selected={selectedEmotion} onSelect={handleEmotionTap} />

        {/* Acknowledgment line */}
        <AnimatePresence>
          {ack && (
            <motion.p
              key={ack}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-sm text-foreground/85 italic mb-3 px-0.5"
            >
              {ack}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tier 1: Hero */}
        <AiHeroCard />

        {/* Trust microcopy */}
        <p className="font-body text-[10px] text-muted-foreground/80 text-center mb-7 mt-2 px-4">
          Private · Anonymous · Not a substitute for medical care
        </p>

        {/* Tier 2: Rails (re-ordered by emotion) */}
        {rails.map((rail) => {
          if (rail === "companions") return <MentorRail key="companions" emotion={selectedEmotion} />;
          if (rail === "collection") return <CollectionRail key="collection" emotion={selectedEmotion} />;
          if (rail === "sound") return <SoundRail key="sound" emotion={selectedEmotion} />;
          return null;
        })}

        {/* Tier 3: Compact tiles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <CompactTile
            title="Nirvaha Space"
            subtitle="Anonymous community"
            icon={Users}
            to="/community"
            highlighted={isLight}
            delay={0.4}
          />
          <CompactTile
            title="Journal"
            subtitle="Reflect & release"
            icon={BookOpen}
            to="/journal"
            highlighted={isHeavy}
            delay={0.45}
          />
          <CompactTile
            title="Wisdom Selfie"
            subtitle="Meet your inner legend"
            icon={Sparkles}
            to="/legends-selfie"
            delay={0.5}
          />
          <CompactTile
            title="Wellness"
            subtitle="Your weekly insights"
            icon={TrendingUp}
            to="/wellness"
            delay={0.55}
          />
        </motion.div>

        {/* Smart actions */}
        <SmartActions />
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </motion.div>
  );
};

export default Home;
