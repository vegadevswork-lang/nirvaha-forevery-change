import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Sparkles, Users, Play, Headphones, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotifications } from "@/hooks/use-notifications";
import { useMoodLog } from "@/hooks/use-mood-log";

const navItems = [
  { label: "Home", icon: HomeIcon, route: "/home", badgeKey: null },
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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div
        ref={navRef}
        className="relative rounded-full px-1 py-1 flex items-center"
        style={{
          background: "hsl(var(--card) / 0.95)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid hsl(var(--border) / 0.7)",
          boxShadow: "0 8px 32px hsl(var(--healing-green) / 0.18), 0 2px 8px hsl(var(--foreground) / 0.08), inset 0 1px 0 hsl(var(--background) / 0.6)",
        }}
      >
        {/* Soft active indicator */}
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
            background: "hsl(var(--primary))",
            border: "1px solid hsl(var(--primary) / 0.5)",
            boxShadow: "0 2px 12px hsl(var(--primary) / 0.4)",
          }}
        />

        {navItems.map((item, index) => {
          const isActive = currentActive === item.label;
          const badgeCount = getBadgeCount(item.badgeKey);
          const showDot = item.badgeKey === "new";

          return (
            <motion.button
              key={item.label}
              ref={(el) => { itemRefs.current[index] = el; }}
              onClick={() => {
                onSelect?.(item.label);
                navigate(item.route === "/collection" ? "/collection?intro=1" : item.route);
              }}
              animate={{ flexGrow: isActive ? 1.6 : 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.7 }}
              className="relative z-10 flex items-center justify-center gap-1.5 flex-1"
              style={{
                padding: "10px 8px",
                minHeight: 42,
                flexBasis: 0,
              }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  key={`icon-${item.label}-${bounceKey}`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2 : 1.5}
                    style={{
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--muted-foreground) / 0.65)",
                      transition: "color 0.3s ease",
                    }}
                  />
                </motion.div>

                {/* Badge */}
                {badgeCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] rounded-full flex items-center justify-center text-[8px] font-semibold px-0.5"
                    style={{
                      background: "hsl(var(--destructive) / 0.9)",
                      color: "hsl(var(--destructive-foreground))",
                    }}
                  >
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}

                {/* New dot */}
                {showDot && badgeCount === 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--accent) / 0.8)" }}
                  />
                )}
              </div>

              {/* Label */}
              <AnimatePresence mode="wait" initial={false}>
                {isActive && (
                  <motion.span
                    key={`label-${item.label}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{
                      opacity: { duration: 0.2, ease: "easeOut" },
                      width: { type: "spring", stiffness: 280, damping: 30, mass: 0.7 },
                    }}
                    className="text-[10.5px] font-body font-medium whitespace-nowrap overflow-hidden leading-none tracking-wide flex items-center"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
