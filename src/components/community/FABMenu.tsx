import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PenLine } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useNavigate } from "react-router-dom";

/* ── Custom SVG Icons ── */
const RippleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="6" opacity="0.6" />
    <circle cx="12" cy="12" r="9" opacity="0.3" />
  </svg>
);

/* ── Spring physics for organic feel ── */
const pebbleSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.8,
};

const FABMenu = ({ onNewPost }: { onNewPost: () => void }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop — deep moss-green tinted blur */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30"
            style={{
              background: "hsla(152 30% 8% / 0.65)",
              backdropFilter: "blur(32px) saturate(1.4)",
              WebkitBackdropFilter: "blur(32px) saturate(1.4)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Pebble Buttons — organic ovals rising like bubbles */}
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-28 right-4 z-40 flex flex-col gap-4 items-end">
            {/* Seek Resonance */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.3, rotate: -8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, y: 30, scale: 0.4, rotate: -5 }}
              transition={{ ...pebbleSpring, delay: 0.08 }}
            >
              <InteractiveHoverButton
                variant="glass"
                onClick={() => { setOpen(false); navigate("/people-chat"); }}
                className="flex items-center gap-3 px-5 py-3.5"
                style={{
                  borderRadius: "28px 24px 26px 22px",
                  background: "hsla(160 20% 15% / 0.35)",
                  backdropFilter: "blur(28px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                  border: "1px solid hsl(var(--glass-border))",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.06))",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <RippleIcon />
                </div>
                <div className="text-left">
                  <p className="font-display text-sm font-semibold" style={{ color: "hsl(var(--foreground) / 0.95)" }}>
                    Seek Resonance
                  </p>
                  <p className="font-body text-[10px]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                    Find a soul to walk the path with
                  </p>
                </div>
              </InteractiveHoverButton>
            </motion.div>

            {/* Plant a Thought */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3, rotate: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
              exit={{ opacity: 0, y: 35, scale: 0.4, rotate: 3 }}
              transition={{ ...pebbleSpring, delay: 0 }}
            >
              <InteractiveHoverButton
                variant="glass"
                onClick={() => { setOpen(false); onNewPost(); }}
                className="flex items-center gap-3.5 px-6 py-4"
                sweepColor="hsl(var(--gold) / 0.15)"
                style={{
                  borderRadius: "26px 30px 22px 28px",
                  background: "hsla(152 25% 14% / 0.45)",
                  backdropFilter: "blur(28px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                  border: "1px solid hsl(var(--gold) / 0.15)",
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, hsl(var(--gold) / 0.25), hsl(var(--gold) / 0.08))",
                    color: "hsl(var(--gold))",
                  }}
                >
                  <PenLine size={20} />
                </div>
                <div className="text-left">
                  <p className="font-display text-[15px] font-semibold" style={{ color: "hsl(var(--foreground) / 0.95)" }}>
                    Plant a Thought
                  </p>
                  <p className="font-body text-[10px]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                    Release your heart to the collective
                  </p>
                </div>
              </InteractiveHoverButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* The Seed — primary FAB */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setOpen(!open)}
        animate={open ? {
          rotate: 45,
          scale: 0.9,
        } : {
          rotate: 0,
          scale: [1, 1.06, 1],
          boxShadow: [
            "0 0 30px hsl(145 40% 55% / 0.3), 0 0 60px hsl(145 40% 55% / 0.1), 0 4px 16px hsla(160 20% 5% / 0.25)",
            "0 0 40px hsl(145 40% 55% / 0.45), 0 0 80px hsl(145 40% 55% / 0.18), 0 4px 16px hsla(160 20% 5% / 0.25)",
            "0 0 30px hsl(145 40% 55% / 0.3), 0 0 60px hsl(145 40% 55% / 0.1), 0 4px 16px hsla(160 20% 5% / 0.25)",
          ],
        }}
        transition={open ? pebbleSpring : {
          rotate: pebbleSpring,
          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="fixed bottom-8 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open
            ? "hsla(160 15% 18% / 0.7)"
            : "radial-gradient(circle at 38% 38%, hsl(var(--healing-green-light)), hsl(var(--primary)))",
          backdropFilter: open ? "blur(20px) saturate(1.4)" : undefined,
          WebkitBackdropFilter: open ? "blur(20px) saturate(1.4)" : undefined,
          border: open ? "1px solid hsla(150 20% 80% / 0.08)" : "none",
        }}
      >
        <Plus
          size={open ? 22 : 24}
          style={{
            color: open ? "hsl(var(--foreground) / 0.7)" : "hsl(var(--primary-foreground))",
            transition: "color 0.3s ease",
          }}
        />
      </motion.button>
    </>
  );
};

export default FABMenu;
