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

  const currentActive = active || navItems.find(n => location.pathname.startsWith(n.route))?.label || "Home";

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
        className="mx-3 mb-3 rounded-full px-1.5 py-1.5 flex items-center justify-between gap-0.5"
        style={{
          background: "hsl(var(--foreground))",
          boxShadow: "0 4px 30px hsla(var(--foreground) / 0.3)",
        }}
      >
        {navItems.map((item) => {
          const isActive = currentActive === item.label;
          const badgeCount = getBadgeCount(item.badgeKey);
          const showDot = item.badgeKey === "new";

          return (
            <motion.button
              key={item.label}
              onClick={() => {
                onSelect?.(item.label);
                navigate(item.route);
              }}
              className="relative flex items-center justify-center rounded-full overflow-hidden"
              animate={{
                flex: isActive ? 1.6 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{ minHeight: 42 }}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "hsl(var(--primary))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}

              <motion.div
                className="relative z-10 flex items-center gap-1.5"
                animate={{ scale: isActive ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="relative">
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    style={{
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : "hsla(var(--primary-foreground) / 0.45)",
                    }}
                  />

                  {/* Badge count */}
                  {badgeCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold px-0.5"
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
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(var(--accent))" }}
                    />
                  )}
                </div>

                {/* Label - only visible when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className="text-[11px] font-body font-bold whitespace-nowrap overflow-hidden"
                      style={{ color: "hsl(var(--primary-foreground))" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
