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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div
        ref={navRef}
        className="relative rounded-full px-1.5 py-1.5 flex items-center"
        style={{
          background: "#1a2a22",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Sliding pill */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            left: pillPos.left,
            width: pillPos.width,
            scaleX: [1, 1.04, 1],
            scaleY: [1, 0.96, 1],
          }}
          transition={{
            left: { type: "spring", stiffness: 300, damping: 28, mass: 0.9 },
            width: { type: "spring", stiffness: 300, damping: 28, mass: 0.9 },
            scaleX: { duration: 0.35, ease: "easeOut" },
            scaleY: { duration: 0.35, ease: "easeOut" },
          }}
          style={{
            top: 5,
            bottom: 5,
            background: "hsl(var(--primary))",
            boxShadow: "0 2px 20px hsla(var(--primary) / 0.55), 0 0 40px hsla(var(--primary) / 0.25), inset 0 1px 0 hsla(0 0% 100% / 0.15)",
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
                navigate(item.route);
              }}
              className="relative z-10 flex items-center justify-center gap-1.5 transition-all duration-300 ease-out"
              style={{
                flex: isActive ? 1.7 : 1,
                padding: isActive ? "10px 14px" : "10px 6px",
                minHeight: 44,
              }}
            >
              <div className="relative">
                <motion.div
                  key={`icon-${item.label}-${bounceKey}`}
                  animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <item.icon
                    size={19}
                    strokeWidth={isActive ? 2.3 : 1.6}
                    style={{
                      color: isActive ? "#f5f0e8" : "rgba(245,240,232,0.35)",
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
                    initial={{ opacity: 0, width: 0, x: -6 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -6 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[11px] font-body font-bold whitespace-nowrap overflow-hidden leading-none"
                    style={{ color: "#f5f0e8" }}
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
