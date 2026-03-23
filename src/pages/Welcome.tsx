import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ─── Slide data ─── */
const slides = [
  {
    headline: "Your mind deserves\na place to rest",
    sub: "Nirvaha helps you understand what you feel —\nnot just reduce stress.",
  },
  {
    headline: "Wisdom, therapy, and AI\n— working together",
    sub: "Get personalized guidance through ancient insight,\nreflection, meditation, and human support.",
  },
  {
    headline: "Begin your\ninner journey",
    sub: "Step into a personalized space for\nclarity, healing, and balance.",
  },
];

/* ─── Illustration components ─── */

const Slide1Illustration = () => (
  <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
    {/* Breathing aura */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-56 h-56 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--healing-green) / 0.3), hsl(var(--gold) / 0.15), transparent)" }}
    />
    {/* Inner glow */}
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute w-36 h-36 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.35), transparent)" }}
    />
    {/* Meditating figure — CSS art */}
    <div className="relative z-10 flex flex-col items-center">
      {/* Head */}
      <div className="w-12 h-12 rounded-full" style={{ background: "hsl(var(--healing-green))" }} />
      {/* Body */}
      <div className="w-20 h-14 rounded-b-[2.5rem] -mt-1" style={{ background: "hsl(var(--healing-green) / 0.8)" }} />
      {/* Lotus petals */}
      <div className="flex items-end -mt-2 gap-0.5">
        {[-30, -15, 0, 15, 30].map((rot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            className="w-5 h-8 rounded-t-full origin-bottom"
            style={{
              background: `hsl(var(--gold) / ${0.5 + i * 0.1})`,
              transform: `rotate(${rot}deg)`,
            }}
          />
        ))}
      </div>
    </div>
    {/* Floating sparkles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -20 - i * 5, 0],
          x: [0, (i % 2 === 0 ? 8 : -8), 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: i % 2 === 0 ? "hsl(var(--gold))" : "hsl(var(--healing-green-light))",
          top: `${20 + i * 10}%`,
          left: `${15 + i * 12}%`,
        }}
      />
    ))}
  </div>
);

const Slide2Illustration = () => (
  <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
    {/* Central connection hub */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-48 h-48"
    >
      {/* Orbiting circles */}
      {[0, 120, 240].map((angle, i) => {
        const colors = ["hsl(var(--healing-green))", "hsl(var(--gold))", "hsl(var(--sage))"];
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            className="absolute w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: `${colors[i]}`,
              opacity: 0.8,
              left: `calc(50% + ${Math.cos(rad) * 70}px - 28px)`,
              top: `calc(50% + ${Math.sin(rad) * 70}px - 28px)`,
            }}
          >
            <div className="w-6 h-6 rounded-full" style={{ background: "hsl(var(--cream) / 0.5)" }} />
          </motion.div>
        );
      })}
    </motion.div>
    {/* Center core */}
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
      style={{ background: "hsl(var(--healing-green))", boxShadow: "0 0 40px hsl(var(--healing-green) / 0.3)" }}
    >
      <div className="w-8 h-8 rounded-full" style={{ background: "hsl(var(--gold) / 0.6)" }} />
    </motion.div>
    {/* Connection lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.line
            key={i}
            x1="128" y1="128"
            x2={128 + Math.cos(rad) * 70} y2={128 + Math.sin(rad) * 70}
            stroke="hsl(var(--gold))"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
            animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        );
      })}
    </svg>
  </div>
);

const Slide3Illustration = () => (
  <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
    {/* Gateway arch */}
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-40 h-52 rounded-t-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--healing-green) / 0.15), hsl(var(--gold) / 0.25))",
        border: "1.5px solid hsl(var(--gold) / 0.3)",
      }}
    >
      {/* Inner light */}
      <motion.div
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 rounded-t-full"
        style={{ background: "radial-gradient(ellipse, hsl(var(--gold) / 0.5), transparent)" }}
      />
    </motion.div>
    {/* Light rays */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
        className="absolute origin-bottom"
        style={{
          width: "2px",
          height: "80px",
          background: `linear-gradient(to top, hsl(var(--gold) / 0.4), transparent)`,
          bottom: "30%",
          left: `${35 + i * 7.5}%`,
          transform: `rotate(${-10 + i * 5}deg)`,
        }}
      />
    ))}
    {/* Sparkles around gateway */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -15, 0],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: i % 3 === 0 ? "hsl(var(--gold))" : "hsl(var(--healing-green-light))",
          top: `${15 + Math.random() * 60}%`,
          left: `${10 + Math.random() * 80}%`,
        }}
      />
    ))}
  </div>
);

const illustrations = [Slide1Illustration, Slide2Illustration, Slide3Illustration];

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
