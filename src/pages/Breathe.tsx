import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react";

type Phase = "inhale" | "hold1" | "exhale" | "hold2";

const PHASE_DURATION = 4; // seconds — box breathing 4-4-4-4
const TOTAL_SECONDS = 120; // 2 minutes

const phaseConfig: Record<Phase, { label: string; next: Phase }> = {
  inhale: { label: "Breathe in", next: "hold1" },
  hold1: { label: "Hold", next: "exhale" },
  exhale: { label: "Breathe out", next: "hold2" },
  hold2: { label: "Hold", next: "inhale" },
};

const Breathe = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("inhale");
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [phaseTime, setPhaseTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 0.1 >= TOTAL_SECONDS) {
          setIsPlaying(false);
          return TOTAL_SECONDS;
        }
        return e + 0.1;
      });
      setPhaseTime((t) => {
        const next = t + 0.1;
        if (next >= PHASE_DURATION) {
          setPhase((p) => phaseConfig[p].next);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const reset = () => {
    setElapsed(0);
    setPhaseTime(0);
    setPhase("inhale");
    setIsPlaying(true);
  };

  const remaining = Math.max(0, Math.ceil(TOTAL_SECONDS - elapsed));
  const mm = String(Math.floor(remaining / 60)).padStart(1, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  // Circle scales: inhale grows, exhale shrinks, holds stay
  const targetScale =
    phase === "inhale" ? 1 : phase === "exhale" ? 0.55 : phase === "hold1" ? 1 : 0.55;

  const isComplete = elapsed >= TOTAL_SECONDS;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 320, height: 320, top: "-8%", right: "-12%", background: "hsl(180 55% 35%)" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 260, height: 260, bottom: "-10%", left: "-10%", background: "hsl(170 50% 30%)", animationDelay: "2s" }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="font-display text-sm text-foreground/70">Box breathing · 2 min</div>
        <button
          onClick={reset}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md"
          aria-label="Restart"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Main breathing visual */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid hsl(180 55% 65% / 0.2)",
            }}
            animate={{ scale: targetScale, opacity: isPlaying ? 1 : 0.5 }}
            transition={{ duration: PHASE_DURATION, ease: "easeInOut" }}
          />
          {/* Soft halo */}
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(180 60% 55% / 0.35) 0%, hsl(170 50% 30% / 0) 70%)",
              filter: "blur(8px)",
            }}
            animate={{ scale: targetScale }}
            transition={{ duration: PHASE_DURATION, ease: "easeInOut" }}
          />
          {/* Core circle */}
          <motion.div
            className="relative w-48 h-48 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, hsl(180 60% 55% / 0.55), hsl(170 50% 25% / 0.85))",
              boxShadow:
                "0 12px 40px hsl(180 55% 35% / 0.45), inset 0 0 30px hsl(180 65% 70% / 0.18)",
              border: "1px solid hsl(180 55% 65% / 0.3)",
            }}
            animate={{ scale: targetScale }}
            transition={{ duration: PHASE_DURATION, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-display text-xl font-medium text-white">
                  {phaseConfig[phase].label}
                </p>
                <p className="font-body text-xs mt-1 text-white/70">
                  {Math.max(1, Math.ceil(PHASE_DURATION - phaseTime))}s
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timer */}
        <div className="mt-10 text-center">
          <p className="font-display text-3xl font-light tracking-wider">
            {mm}:{ss}
          </p>
          <p className="font-body text-xs text-foreground/60 mt-1">
            {isComplete ? "Beautiful. You're here." : "Follow the circle"}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-3">
          {!isComplete ? (
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="px-6 py-3 rounded-full flex items-center gap-2 bg-white/8 border border-white/15 backdrop-blur-md font-body text-sm"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Pause" : "Resume"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-body text-sm"
            >
              Return home
            </button>
          )}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="relative z-10 px-6 pb-8">
        <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, hsl(180 60% 55%), hsl(170 50% 45%))",
            }}
            animate={{ width: `${(elapsed / TOTAL_SECONDS) * 100}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Breathe;
