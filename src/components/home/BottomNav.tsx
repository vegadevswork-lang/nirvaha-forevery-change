import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const currentActive = active || navItems.find(n => location.pathname.startsWith(n.route))?.label || "Home";
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

  // Measure active item position for pill
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    const container = navRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    }
  }, [activeIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div
        ref={navRef}
        className="relative rounded-[28px] px-1 py-1 flex items-center"
        style={{
          background: "hsl(var(--foreground))",
          boxShadow: "0 8px 40px hsla(var(--foreground) / 0.35), 0 2px 8px hsla(var(--foreground) / 0.15)",
        }}
      >
        {/* Animated pill background */}
        <motion.div
          className="absolute rounded-[22px] z-0"
          animate={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
            mass: 0.8,
          }}
          style={{
            top: 4,
            bottom: 4,
            background: "hsl(var(--primary))",
            boxShadow: "0 2px 12px hsla(var(--primary) / 0.4)",
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
                navigate(item.route);
              }}
              className="relative z-10 flex items-center justify-center gap-1.5 py-2.5"
              animate={{
                paddingLeft: isActive ? 14 : 8,
                paddingRight: isActive ? 14 : 8,
                flex: isActive ? 1.8 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
                mass: 0.8,
              }}
              style={{ minHeight: 44 }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? 0 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <item.icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 1.7}
                  style={{
                    color: isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsla(var(--primary-foreground) / 0.4)",
                    transition: "color 0.25s ease",
                  }}
                />

                {/* Badge */}
                {badgeCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] rounded-full flex items-center justify-center text-[8px] font-bold px-0.5"
                    style={{
                      background: "hsl(var(--destructive))",
                      color: "hsl(var(--destructive-foreground))",
                      boxShadow: "0 2px 6px hsla(var(--destructive) / 0.4)",
                    }}
                  >
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </motion.span>
                )}

                {/* New dot */}
                {showDot && badgeCount === 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--accent))", boxShadow: "0 0 4px hsl(var(--accent))" }}
                  />
                )}
              </motion.div>

              {/* Label with smooth reveal */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, width: 0, x: -4 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -4 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                      mass: 0.6,
                    }}
                    className="text-[11px] font-body font-bold whitespace-nowrap overflow-hidden leading-none"
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
