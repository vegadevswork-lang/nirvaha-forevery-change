import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Custom SVG Icons ── */
const SproutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12" />
    <path d="M12 12C12 12 7 8 4 9C1 10 2 15 5 16C8 17 12 12 12 12Z" />
    <path d="M12 12C12 12 17 8 20 9C23 10 22 15 19 16C16 17 12 12 12 12Z" />
    <circle cx="12" cy="22" r="1" fill="currentColor" stroke="none" />
  </svg>
);

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
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
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
            {/* Seek Resonance — secondary, slightly smaller */}
            <motion.button
              initial={{ opacity: 0, y: 40, scale: 0.3, rotate: -8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, y: 30, scale: 0.4, rotate: -5 }}
              transition={{ ...pebbleSpring, delay: 0.08 }}
              whileTap={{ scale: 0.92 }}
              onHoverStart={() => setHoveredBtn("resonance")}
              onHoverEnd={() => setHoveredBtn(null)}
              onTouchStart={() => setHoveredBtn("resonance")}
              onTouchEnd={() => setHoveredBtn(null)}
              onClick={() => { setOpen(false); navigate("/people-chat"); }}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{
                borderRadius: "28px 24px 26px 22px",
                background: "hsla(160 20% 15% / 0.35)",
                backdropFilter: "blur(28px) saturate(1.6)",
                WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                border: hoveredBtn === "resonance"
                  ? "1px solid hsl(var(--primary) / 0.4)"
                  : "1px solid hsla(150 20% 80% / 0.08)",
                boxShadow: hoveredBtn === "resonance"
                  ? "0 0 24px hsl(var(--primary) / 0.15), inset 0 1px 0 hsla(150 30% 90% / 0.06)"
                  : "inset 0 1px 0 hsla(150 30% 90% / 0.06), 0 8px 32px hsla(160 20% 5% / 0.3)",
                transition: "border 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.06))",
                  color: "hsl(var(--primary))",
                }}
              >
                <RippleIcon />
              </div>
              <div className="text-left">
                <p
                  className="font-display text-sm font-semibold"
                  style={{
                    color: "hsl(var(--foreground) / 0.95)",
                    letterSpacing: hoveredBtn === "resonance" ? "0.04em" : "0.01em",
                    transition: "letter-spacing 0.4s ease",
                  }}
                >
                  Seek Resonance
                </p>
                <p className="font-body text-[10px]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                  Find a soul to walk the path with
                </p>
              </div>
            </motion.button>

            {/* Plant a Thought — primary, slightly larger */}
            <motion.button
              initial={{ opacity: 0, y: 50, scale: 0.3, rotate: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
              exit={{ opacity: 0, y: 35, scale: 0.4, rotate: 3 }}
              transition={{ ...pebbleSpring, delay: 0 }}
              whileTap={{ scale: 0.92 }}
              onHoverStart={() => setHoveredBtn("thought")}
              onHoverEnd={() => setHoveredBtn(null)}
              onTouchStart={() => setHoveredBtn("thought")}
              onTouchEnd={() => setHoveredBtn(null)}
              onClick={() => { setOpen(false); onNewPost(); }}
              className="flex items-center gap-3.5 px-6 py-4"
              style={{
                borderRadius: "26px 30px 22px 28px",
                background: "hsla(152 25% 14% / 0.45)",
                backdropFilter: "blur(28px) saturate(1.6)",
                WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                border: hoveredBtn === "thought"
                  ? "1px solid hsl(var(--gold) / 0.4)"
                  : "1px solid hsla(42 40% 80% / 0.08)",
                boxShadow: hoveredBtn === "thought"
                  ? "0 0 28px hsl(var(--gold) / 0.12), inset 0 1px 0 hsla(42 50% 90% / 0.08)"
                  : "inset 0 1px 0 hsla(42 50% 90% / 0.06), 0 8px 32px hsla(160 20% 5% / 0.3)",
                transition: "border 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, hsl(var(--gold) / 0.25), hsl(var(--gold) / 0.08))",
                  color: "hsl(var(--gold))",
                }}
              >
                <SproutIcon />
              </div>
              <div className="text-left">
                <p
                  className="font-display text-[15px] font-semibold"
                  style={{
                    color: "hsl(var(--foreground) / 0.95)",
                    letterSpacing: hoveredBtn === "thought" ? "0.04em" : "0.01em",
                    transition: "letter-spacing 0.4s ease",
                  }}
                >
                  Plant a Thought
                </p>
                <p className="font-body text-[10px]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                  Release your heart to the collective
                </p>
              </div>
            </motion.button>
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
