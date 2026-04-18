import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Sparkles, Users, Play, Headphones, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotifications } from "@/hooks/use-notifications";
import { useMoodLog } from "@/hooks/use-mood-log";

const navItems = [
  { label: "Home", icon: HomeIcon, route: "/home", badgeKey: "home" as const },
  { label: "Inner Guide", icon: Sparkles, route: "/chat", badgeKey: null },
  { label: "Companion", icon: Users, route: "/companion", badgeKey: null },
  { label: "Collection", icon: Play, route: "/collection", badgeKey: "new" as const },
  { label: "Sounds", icon: Headphones, route: "/sound-healing", badgeKey: null },
  { label: "Space", icon: Globe, route: "/community", badgeKey: "notifications" as const },
];

interface BottomNavProps {
  active?: string;
  onSelect?: (label: string) => void;
}

const BottomNav = ({ active, onSelect }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { moodLog } = useMoodLog();
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillPos, setPillPos] = useState({ left: 0, width: 0 });
  const [bounceKey, setBounceKey] = useState(0);

  const currentActive = navItems.find(n => location.pathname.startsWith(n.route))?.label || active || "Home";
  const activeIndex = navItems.findIndex(n => n.label === currentActive);

  const hasTodayMood = moodLog.some(e => {
    const d = new Date(e.timestamp);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });
  const homeBadge = !hasTodayMood ? 1 : 0;

  const getBadgeCount = (badgeKey: string | null): number => {
    if (badgeKey === "notifications") return unreadCount;
    if (badgeKey === "home") return homeBadge;
    if (badgeKey === "new") return 0;
    return 0;
  };

  const measurePill = useCallback(() => {
    const el = itemRefs.current[activeIndex];
    const container = navRef.current;
    if (el && container) {
      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setPillPos({ left: er.left - cr.left, width: er.width });
    }
  }, [activeIndex]);

  useEffect(() => {
    measurePill();
    setBounceKey(k => k + 1);
  }, [activeIndex, measurePill]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-3">
      <div
        ref={navRef}
        className="relative rounded-full px-1 py-1 flex items-center"
        style={{
          background: "hsla(var(--background) / 0.72)",
          border: "1px solid hsla(var(--glass-border))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 6px 24px hsla(0 0% 0% / 0.18)",
        }}
      >
        {/* Sliding pill — softer */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            left: pillPos.left,
            width: pillPos.width,
          }}
          transition={{
            left: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
            width: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
          }}
          style={{
            top: 4,
            bottom: 4,
            background: "hsla(var(--primary) / 0.92)",
            boxShadow: "0 2px 12px hsla(var(--primary) / 0.35), inset 0 1px 0 hsla(0 0% 100% / 0.12)",
          }}
        />

        {navItems.map((item, index) => {
          const isActive = currentActive === item.label;
          const badgeCount = getBadgeCount(item.badgeKey);
          const showDot = item.badgeKey === "new";

          return (
            <button
              key={item.label}
              ref={(el) => { itemRefs.current[index] = el; }}
              onClick={() => {
                onSelect?.(item.label);
                navigate(item.route === "/collection" ? "/collection?intro=1" : item.route);
              }}
              className="relative z-10 flex items-center justify-center gap-1.5 transition-all duration-300 ease-out"
              style={{
                flex: isActive ? 1.6 : 1,
                padding: isActive ? "9px 12px" : "9px 4px",
                minHeight: 42,
              }}
            >
              <div className="relative">
                <motion.div
                  key={`icon-${item.label}-${bounceKey}`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.1 : 1.5}
                    style={{
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--muted-foreground) / 0.7)",
                      transition: "color 0.3s ease",
                    }}
                  />
                </motion.div>

                {/* Badge */}
                {badgeCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] rounded-full flex items-center justify-center text-[8px] font-bold px-0.5"
                    style={{
                      background: "hsl(var(--destructive))",
                      color: "#fff",
                      boxShadow: "0 2px 6px rgba(200,50,50,0.4)",
                    }}
                  >
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}

                {/* New dot */}
                {showDot && badgeCount === 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--accent))", boxShadow: "0 0 6px hsl(var(--accent))" }}
                  />
                )}
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    key={`label-${item.label}`}
                    initial={{ opacity: 0, width: 0, x: -4 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -4 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[11px] font-body font-semibold whitespace-nowrap overflow-hidden leading-none tracking-tight"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
