import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import EmotionChips from "@/components/home/EmotionChips";
import AiHeroCard from "@/components/home/AiHeroCard";
import SmartActions from "@/components/home/SmartActions";
import WellnessStats from "@/components/home/WellnessStats";
import WisdomSelfieCard from "@/components/home/WisdomSelfieCard";
import JournalCard from "@/components/home/JournalCard";
import CompanionCard from "@/components/home/CompanionCard";
import CollectionCard from "@/components/home/CollectionCard";
import CommunityCard from "@/components/home/CommunityCard";
import SoundHealingCard from "@/components/home/SoundHealingCard";
import BottomNav from "@/components/home/BottomNav";
import { useMoodLog } from "@/hooks/use-mood-log";

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      {/* Ambient background orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 280, height: 280, top: "3%", right: "-8%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 220, height: 220, bottom: "25%", left: "-8%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-5"
        >
          <div>
            <h1 className="font-display text-xl text-foreground font-semibold leading-tight">
              Welcome back
            </h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              How are you feeling today?
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
              backdropFilter: "blur(12px)",
            }}
          >
            <User size={18} className="text-muted-foreground" />
          </motion.button>
        </motion.div>

        <EmotionChips selected={selectedEmotion} onSelect={handleEmotionTap} />

        <AiHeroCard />

        <CompanionCard />

        <CollectionCard />

        <SoundHealingCard />

        <CommunityCard />

        <WisdomSelfieCard />

        <JournalCard />

        <WellnessStats />

        <SmartActions />
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </motion.div>
  );
};

export default Home;
