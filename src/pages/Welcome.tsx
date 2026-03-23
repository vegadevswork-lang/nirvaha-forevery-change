import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import slide1Img from "@/assets/onboarding-slide1.png";
import slide2Img from "@/assets/onboarding-slide2.png";
import slide3Img from "@/assets/onboarding-slide3.png";

/* ─── Slide data ─── */
const slides = [
  {
    headline: "Your mind deserves\na place to rest",
    sub: "Nirvaha helps you understand what you feel —\nnot just reduce stress.",
    image: slide1Img,
  },
  {
    headline: "Nirvaha AI, therapy &\nancient wisdom — united",
    sub: "Get personalized guidance through AI intelligence,\nreflection, meditation, and human support.",
    image: slide2Img,
  },
  {
    headline: "Begin your\ninner journey",
    sub: "Step into a personalized space for\nclarity, healing, and balance.",
    image: slide3Img,
  },
];

/* ─── Swipe threshold ─── */
const SWIPE_THRESHOLD = 50;

const Welcome = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    if (index < 0 || index >= slides.length) return;
    setDirection(dir);
    setCurrent(index);
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && current < slides.length - 1) {
      goTo(current + 1, 1);
    } else if (info.offset.x > SWIPE_THRESHOLD && current > 0) {
      goTo(current - 1, -1);
    }
  };

  const Illustration = illustrations[current];
  const isLast = current === slides.length - 1;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 260, height: 260, top: "5%", right: "-8%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, bottom: "12%", left: "-5%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Skip */}
      {!isLast && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/auth")}
          className="absolute top-12 right-6 z-20 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </motion.button>
      )}

      {/* Main content — swipeable */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 select-none"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Illustration */}
            <div className="mb-10">
              <Illustration />
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl text-foreground leading-tight whitespace-pre-line mb-4">
              {slides[current].headline}
            </h1>

            {/* Subtext */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[280px] whitespace-pre-line">
              {slides[current].sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom section */}
      <div className="relative z-10 px-8 pb-10">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 24 : 8,
                backgroundColor: i === current ? "hsl(var(--healing-green))" : "hsl(var(--border))",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full cursor-pointer"
              onClick={() => goTo(i, i > current ? 1 : -1)}
            />
          ))}
        </div>

        {/* Navigation */}
        {isLast ? (
          <div className="flex flex-col gap-3">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Create Account
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/onboarding")}
              className="btn-guest"
            >
              Continue as Guest
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/auth")}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip
            </button>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => goTo(current + 1, 1)}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "0 6px 24px hsl(var(--healing-green) / 0.25)",
              }}
            >
              <ArrowRight size={20} className="text-primary-foreground" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
