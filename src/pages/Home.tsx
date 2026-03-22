import { useState } from "react";
import { motion } from "framer-motion";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import EmotionChips from "@/components/home/EmotionChips";
import AiHeroCard from "@/components/home/AiHeroCard";
import SmartActions from "@/components/home/SmartActions";
import WisdomSelfieCard from "@/components/home/WisdomSelfieCard";
import JournalCard from "@/components/home/JournalCard";
import BottomNav from "@/components/home/BottomNav";

const Home = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleEmotionTap = (label: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSparkleTrigger((t) => t + 1);
    setSelectedEmotion(label);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, top: "45%", right: "10%", background: "hsl(var(--sage))", animationDelay: "3.5s", opacity: 0.2 }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-14 relative z-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7"
        >
          <h1 className="font-display text-[26px] sm:text-3xl text-foreground font-semibold leading-tight">
            {greeting()}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1.5">
            How are you feeling right now?
          </p>
        </motion.div>

        <EmotionChips selected={selectedEmotion} onSelect={handleEmotionTap} />
        <AiHeroCard />
        <SmartActions />
        <WisdomSelfieCard />
        <JournalCard />
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

export default Home;
