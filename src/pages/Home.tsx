import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import EmotionChips from "@/components/home/EmotionChips";
import AiHeroCard from "@/components/home/AiHeroCard";
import FeatureTiles from "@/components/home/FeatureTiles";
import QuietActions from "@/components/home/QuietActions";
import BottomNav from "@/components/home/BottomNav";
import { useMoodLog } from "@/hooks/use-mood-log";
import { usePageLoading } from "@/hooks/use-page-loading";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

const Home = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading(700);

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

  if (isLoading) return <HomeSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      {/* Single soft ambient orb — calmer background */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 320, height: 320, top: "-6%", right: "-12%", background: "hsl(var(--healing-green))", opacity: 0.5 }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 240, height: 240, bottom: "20%", left: "-15%", background: "hsl(var(--gold))", animationDelay: "3s", opacity: 0.35 }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="font-display text-[19px] text-foreground font-semibold leading-tight">
              Welcome back
            </h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              How are you, really?
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
            <User size={17} className="text-muted-foreground" />
          </motion.button>
        </motion.div>

        {/* Mood — quick, scrollable, ~4 visible */}
        <EmotionChips selected={selectedEmotion} onSelect={handleEmotionTap} />

        {/* Primary focal CTA */}
        <AiHeroCard />

        {/* Compact secondary grid */}
        <FeatureTiles />

        {/* Tertiary, quieter actions */}
        <QuietActions />
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </motion.div>
  );
};

export default Home;
