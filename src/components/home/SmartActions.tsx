import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wind, PenLine, Lightbulb, ArrowUpRight, type LucideIcon } from "lucide-react";

type ActionTone = "breathe" | "journal" | "perspective";

interface ActionCard {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone: ActionTone;
  to: string;
}

// Personalized subtitle copy per emotion. Falls back to defaults.
const subtitleByEmotion: Record<string, Partial<Record<ActionTone, string>>> = {
  Stressed:   { breathe: "Soften your chest", journal: "Name what's heavy", perspective: "Loosen the grip" },
  Angry:      { breathe: "Cool the fire",     journal: "Pour it onto paper", perspective: "Step back, see wide" },
  Sensitive:  { breathe: "Hold yourself softly", journal: "Tend to the tender", perspective: "Honor what you feel" },
  Confused:   { breathe: "Find your center",  journal: "Untangle the threads", perspective: "Try a new angle" },
  Bored:      { breathe: "Awaken the body",   journal: "Spark a small idea",  perspective: "Notice something new" },
  Hurt:       { breathe: "Breathe through it", journal: "Let it out gently",  perspective: "Reframe with care" },
  Insecure:   { breathe: "Steady your ground", journal: "Speak to yourself kindly", perspective: "Remember your worth" },
  Guilty:     { breathe: "Soften the weight", journal: "Write what's true",   perspective: "Offer yourself grace" },
  Joyful:     { breathe: "Savor this moment", journal: "Capture this light",  perspective: "Expand the feeling" },
  Grateful:   { breathe: "Breathe it in",     journal: "Name three blessings", perspective: "See the abundance" },
  Excited:    { breathe: "Channel the spark", journal: "Ground the energy",   perspective: "Imagine what's next" },
  Calm:       { breathe: "Rest in the still", journal: "Linger in this peace", perspective: "Notice the quiet" },
};

const defaultCards: ActionCard[] = [
  { title: "Ground your thoughts", subtitle: "2 min calm reset", icon: Wind,      tone: "breathe",     to: "/breathe" },
  { title: "Reflect & journal",    subtitle: "Let it out",        icon: PenLine,   tone: "journal",     to: "/journal" },
  { title: "A new perspective",    subtitle: "See it differently", icon: Lightbulb, tone: "perspective", to: "/chat"    },
];

// Soft pastel palette — calming gradients, each card a different micro-mood
const toneStyles: Record<
  ActionTone,
  { gradient: string; iconBg: string; iconColor: string; glow: string; ring: string }
> = {
  breathe: {
    // Soft blue/green — breath, water, exhale
    gradient:
      "linear-gradient(160deg, hsl(180 45% 18% / 0.55) 0%, hsl(170 40% 12% / 0.85) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(180 60% 55% / 0.28), hsl(165 50% 40% / 0.18))",
    iconColor: "hsl(175 65% 78%)",
    glow: "hsl(180 55% 45% / 0.22)",
    ring: "hsl(180 50% 60% / 0.25)",
  },
  journal: {
    // Warm beige/amber — paper, candlelight
    gradient:
      "linear-gradient(160deg, hsl(35 35% 22% / 0.55) 0%, hsl(30 30% 12% / 0.85) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(40 70% 60% / 0.28), hsl(30 55% 40% / 0.18))",
    iconColor: "hsl(40 75% 80%)",
    glow: "hsl(40 60% 50% / 0.22)",
    ring: "hsl(40 60% 60% / 0.25)",
  },
  perspective: {
    // Soft violet/teal — insight, expansion
    gradient:
      "linear-gradient(160deg, hsl(265 35% 22% / 0.55) 0%, hsl(255 30% 12% / 0.85) 100%)",
    iconBg:
      "linear-gradient(135deg, hsl(270 65% 65% / 0.28), hsl(255 50% 45% / 0.18))",
    iconColor: "hsl(270 70% 82%)",
    glow: "hsl(270 55% 50% / 0.22)",
    ring: "hsl(270 55% 65% / 0.25)",
  },
};

interface SmartActionsProps {
  emotion?: string | null;
}

const SmartActions = ({ emotion }: SmartActionsProps) => {
  const navigate = useNavigate();

  const overrides = emotion ? subtitleByEmotion[emotion] ?? {} : {};
  const actionCards: ActionCard[] = defaultCards.map((c) => ({
    ...c,
    subtitle: overrides[c.tone] ?? c.subtitle,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-6"
    >
      <h3 className="font-display text-base text-foreground font-medium mb-3">
        A small step is enough
      </h3>
      <div className="grid grid-cols-3 gap-2.5">
        {actionCards.map((card, i) => {
          const styles = toneStyles[card.tone];
          const Icon = card.icon;
          return (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              onClick={() => navigate(card.to)}
              className="relative overflow-hidden rounded-[20px] p-3.5 flex flex-col items-start text-left min-h-[124px] transition-all"
              style={{
                background: styles.gradient,
                border: "1px solid hsl(0 0% 100% / 0.08)",
                boxShadow: `0 8px 22px ${styles.glow}, 0 4px 10px hsl(0 0% 0% / 0.22)`,
              }}
            >
              {/* Soft inner top highlight for floating feel */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.18), transparent)",
                }}
              />
              {/* Subtle radial glow behind icon */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: styles.glow, filter: "blur(20px)" }}
              />

              {/* Top row: icon + arrow indicator */}
              <div className="relative w-full flex items-start justify-between">
                <motion.div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: styles.iconBg,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${styles.ring}`,
                    boxShadow: "0 2px 8px hsl(0 0% 0% / 0.18)",
                  }}
                  animate={
                    card.tone === "breathe"
                      ? { scale: [1, 1.08, 1] }
                      : undefined
                  }
                  transition={
                    card.tone === "breathe"
                      ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                >
                  {/* Breathing halo — only on the breathe card */}
                  {card.tone === "breathe" && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ background: styles.glow }}
                      animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  <Icon
                    size={17}
                    style={{ color: styles.iconColor, position: "relative" }}
                    strokeWidth={1.8}
                  />
                </motion.div>
                <ArrowUpRight
                  size={13}
                  style={{ color: "hsl(0 0% 100% / 0.45)" }}
                  strokeWidth={2}
                />
              </div>

              {/* Text block */}
              <div className="relative mt-auto pt-3 w-full">
                <p
                  className="font-display text-[13px] font-semibold leading-tight"
                  style={{
                    color: "hsl(0 0% 100%)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </p>
                <p
                  className="font-body text-[10.5px] mt-1.5 leading-snug"
                  style={{ color: "hsl(0 0% 100% / 0.72)" }}
                >
                  {card.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SmartActions;
