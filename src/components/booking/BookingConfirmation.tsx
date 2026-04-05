import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Calendar, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookingConfirmationProps {
  mentorName: string;
  sessionDuration: string;
  format: string;
  date: string;
  time: string;
  onClose: () => void;
}

const BookingConfirmation = ({
  mentorName,
  sessionDuration,
  format,
  date,
  time,
  onClose,
}: BookingConfirmationProps) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"ripple" | "check" | "details" | "done">("ripple");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("check"), 600);
    const t2 = setTimeout(() => setPhase("details"), 1400);
    const t3 = setTimeout(() => setPhase("done"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Particle bursts */}
      <AnimatePresence>
        {(phase === "check" || phase === "details" || phase === "done") && (
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 360;
              const rad = (angle * Math.PI) / 180;
              const dist = 80 + Math.random() * 60;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0.3,
                    x: Math.cos(rad) * dist,
                    y: Math.sin(rad) * dist,
                  }}
                  transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
                  className="absolute rounded-full"
                  style={{
                    width: 6 + Math.random() * 6,
                    height: 6 + Math.random() * 6,
                    background: i % 3 === 0
                      ? "hsl(var(--gold))"
                      : i % 3 === 1
                      ? "hsl(var(--healing-green))"
                      : "hsl(var(--primary))",
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Ripple rings */}
      <AnimatePresence>
        {phase === "ripple" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                initial={{ scale: 0.3, opacity: 0.6 }}
                animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="absolute rounded-full border-2"
                style={{
                  width: 80,
                  height: 80,
                  borderColor: "hsl(var(--healing-green))",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main check circle */}
      <div className="flex flex-col items-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: phase === "ripple" ? 0 : 1,
            boxShadow: phase === "done"
              ? "0 0 60px hsla(var(--healing-green) / 0.3)"
              : "0 0 0px transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(135deg, hsl(145 50% 45%), hsl(160 45% 55%))",
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{
              scale: phase !== "ripple" ? 1 : 0,
              rotate: phase !== "ripple" ? 0 : -45,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.1 }}
          >
            <Check size={48} strokeWidth={3} style={{ color: "hsl(0 0% 100%)" }} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: phase === "details" || phase === "done" ? 1 : 0,
            y: phase === "details" || phase === "done" ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Session Booked!</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">You're all set 🎉</p>

          {/* Session details card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === "done" ? 1 : 0,
              scale: phase === "done" ? 1 : 0.9,
            }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="rounded-2xl p-5 mb-6 mx-auto max-w-[280px] border"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--healing-green) / 0.2)",
            }}
          >
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Heart size={14} style={{ color: "hsl(var(--healing-green))" }} />
                <span className="font-body text-sm font-medium text-foreground">{mentorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: "hsl(var(--gold))" }} />
                <span className="font-body text-xs text-muted-foreground">{date} · {time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: "hsl(var(--primary))" }} />
                <span className="font-body text-xs text-muted-foreground">{sessionDuration} · {format}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase === "done" ? 1 : 0,
            y: phase === "done" ? 0 : 10,
          }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3 w-64"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Done
          </motion.button>
          <button
            onClick={() => navigate("/companion")}
            className="font-body text-xs text-muted-foreground text-center py-2"
          >
            Back to Companions
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
