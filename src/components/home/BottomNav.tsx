import { motion } from "framer-motion";
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

  const currentActive = active || navItems.find(n => location.pathname.startsWith(n.route))?.label || "Home";

  // Home badge: show if no mood logged today or journal prompt available
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className="mx-3 mb-3 rounded-2xl px-1 py-2 flex items-center justify-around"
        style={{
          background: "hsla(var(--foreground) / 0.92)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 -2px 24px hsla(var(--foreground) / 0.2)",
        }}
      >
        {navItems.map((item) => {
          const isActive = currentActive === item.label;
          const badgeCount = getBadgeCount(item.badgeKey);
          const showDot = item.badgeKey === "new";

          return (
            <button
              key={item.label}
              onClick={() => {
                onSelect?.(item.label);
                navigate(item.route);
              }}
              className="flex flex-col items-center justify-center gap-0.5 relative"
              style={{ width: `${100 / navItems.length}%`, minHeight: 48 }}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-x-1 -inset-y-0.5 rounded-xl"
                  style={{ background: "hsl(var(--primary))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <motion.div
                className="relative z-10"
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.4 : 2}
                  style={{
                    color: isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsla(var(--primary-foreground) / 0.6)",
                  }}
                />

                {/* Badge count */}
                {badgeCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold px-1"
                    style={{
                      background: "hsl(var(--destructive))",
                      color: "hsl(var(--destructive-foreground))",
                    }}
                  >
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}

                {/* New content dot */}
                {showDot && badgeCount === 0 && (
                  <span
                    className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full"
                    style={{ background: "hsl(var(--accent))" }}
                  />
                )}
              </motion.div>

              <span
                className="text-[9px] font-body font-semibold tracking-wide relative z-10 leading-none mt-0.5"
                style={{
                  color: isActive
                    ? "hsl(var(--primary-foreground))"
                    : "hsla(var(--primary-foreground) / 0.55)",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
