import { motion } from "framer-motion";
import { Home as HomeIcon, MessageCircle, Users, Play, Headphones, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: HomeIcon, route: "/home" },
  { label: "AI", icon: MessageCircle, route: "/chat" },
  { label: "Companion", icon: Users, route: "/companion" },
  { label: "Collection", icon: Play, route: "/collection" },
  { label: "Sounds", icon: Headphones, route: "/sound-healing" },
  { label: "Space", icon: Globe, route: "/community" },
];

interface BottomNavProps {
  active?: string;
  onSelect?: (label: string) => void;
}

const BottomNav = ({ active, onSelect }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active from route if not passed
  const currentActive = active || navItems.find(n => location.pathname.startsWith(n.route))?.label || "Home";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className="mx-3 mb-3 rounded-2xl px-1 py-1.5 flex items-center justify-around"
        style={{
          background: "hsla(var(--foreground) / 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -2px 20px hsla(var(--foreground) / 0.15)",
        }}
      >
        {navItems.map((item) => {
          const isActive = currentActive === item.label;
          return (
            <button
              key={item.label}
              onClick={() => {
                onSelect?.(item.label);
                navigate(item.route);
              }}
              className="flex flex-col items-center justify-center gap-0.5 relative"
              style={{ width: `${100 / navItems.length}%`, minHeight: 44 }}
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
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <item.icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  style={{
                    color: isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsla(var(--primary-foreground) / 0.4)",
                  }}
                />
              </motion.div>

              <span
                className="text-[8px] font-body font-medium tracking-wide relative z-10 leading-none"
                style={{
                  color: isActive
                    ? "hsl(var(--primary-foreground))"
                    : "hsla(var(--primary-foreground) / 0.35)",
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
