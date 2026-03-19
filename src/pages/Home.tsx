import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BookOpen, User, Home as HomeIcon, Sparkles, Wind, PenLine, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";

const emotions = [
  { label: "Calm", emoji: "🍃" },
  { label: "Overwhelmed", emoji: "🌊" },
  { label: "Lost", emoji: "🌫️" },
  { label: "Anxious", emoji: "💭" },
  { label: "Exploring", emoji: "✨" },
];

const actionCards = [
  { title: "Ground your thoughts", subtitle: "2 min breathing", icon: Wind },
  { title: "Reflect & journal", subtitle: "Write freely", icon: PenLine },
  { title: "A new perspective", subtitle: "Shift your mind", icon: Lightbulb },
];

const navItems = [
  { label: "Home", icon: HomeIcon, path: "/home" },
  { label: "Chat", icon: MessageCircle, path: "/home" },
  { label: "Journal", icon: BookOpen, path: "/home" },
  { label: "Profile", icon: User, path: "/home" },
];

const Home = () => {
  const navigate = useNavigate();
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

      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 250, height: 250, top: "5%", right: "-5%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, bottom: "20%", left: "-5%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-12 relative z-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl sm:text-3xl text-foreground font-semibold">
            {greeting()}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            How are you feeling right now?
          </p>
        </motion.div>

        {/* Emotion chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {emotions.map((e) => (
            <motion.button
              key={e.label}
              whileTap={{ scale: 0.95 }}
              onClick={(ev) => handleEmotionTap(e.label, ev)}
              className={`
                glass-card px-4 py-2 text-sm font-body flex items-center gap-1.5
                transition-all duration-300 cursor-pointer
                ${selectedEmotion === e.label
                  ? "border-accent shadow-md"
                  : "hover:border-accent/40"
                }
              `}
            >
              <span>{e.emoji}</span>
              <span>{e.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* AI Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-card p-6 sm:p-8 mb-6 relative overflow-hidden"
        >
          {/* Breathing orb */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--healing-green)) 50%, transparent 100%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--gold)))",
                boxShadow: "0 0 30px hsla(var(--gold) / 0.3)",
              }}
            >
              <Sparkles className="text-primary-foreground" size={24} />
            </motion.div>

            <p className="font-display text-lg text-foreground italic mb-1">
              I'm here with you.
            </p>
            <p className="font-body text-sm text-muted-foreground mb-5">
              What's on your mind?
            </p>

            <button className="btn-primary max-w-xs flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Talk to Nirvaha
            </button>
          </div>
        </motion.div>

        {/* Wisdom Selfie Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card p-5 mb-6 cursor-pointer group hover:border-accent/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, hsla(var(--gold) / 0.2), hsla(var(--healing-green) / 0.15))",
              }}
            >
              <span className="text-2xl">🪷</span>
            </div>
            <div>
              <h3 className="font-display text-base text-foreground font-semibold">
                Explore Wisdom Selfies
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Step into timeless wisdom — a reflective visual journey
              </p>
            </div>
          </div>
        </motion.div>

        {/* Smart Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-6"
        >
          <h3 className="font-display text-base text-foreground font-medium mb-3">
            A small step is enough
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {actionCards.map((card) => (
              <motion.div
                key={card.title}
                whileTap={{ scale: 0.97 }}
                className="glass-card p-4 min-w-[140px] flex-shrink-0 cursor-pointer hover:border-accent/40 transition-all duration-300"
              >
                <card.icon size={20} className="text-accent mb-2" />
                <p className="font-body text-sm text-foreground font-medium">{card.title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{card.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journal Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card p-5 cursor-pointer hover:border-accent/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-body text-sm text-foreground font-medium">Your Journal</p>
              <p className="font-body text-xs text-muted-foreground">Capture what matters</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div
          className="flex items-center justify-around py-3 px-4 border-t"
          style={{
            background: "hsla(var(--glass-bg))",
            borderColor: "hsla(var(--glass-border))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className="flex flex-col items-center gap-0.5 transition-all duration-300"
              >
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  className={`p-1.5 rounded-xl transition-all duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  style={isActive ? { boxShadow: "0 0 12px hsla(var(--healing-green) / 0.2)" } : undefined}
                >
                  <item.icon size={20} />
                </motion.div>
                <span
                  className={`text-[10px] font-body ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
