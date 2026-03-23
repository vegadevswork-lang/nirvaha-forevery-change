import { motion } from "framer-motion";
import { Home as HomeIcon, MessageCircle, Flame, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Chat", icon: MessageCircle },
  { label: "Wellness", icon: Flame },
  { label: "Profile", icon: User },
];

interface BottomNavProps {
  active: string;
  onSelect: (label: string) => void;
}

const routeMap: Record<string, string> = {
  Home: "/home",
  Chat: "/chat",
  Wellness: "/wellness",
  Profile: "/profile",
};

const BottomNav = ({ active, onSelect }: BottomNavProps) => {
  const navigate = useNavigate();
  const activeIndex = navItems.findIndex((n) => n.label === active);
  const itemCount = navItems.length;
  const itemWidth = 100 / itemCount; // percentage width per item

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50">
      <div
        className="relative flex items-center justify-around rounded-full px-3"
        style={{
          height: 68,
          background: "hsl(var(--foreground))",
          boxShadow: "0 8px 32px hsla(var(--foreground) / 0.25)",
        }}
      >
        {/* Sliding pill indicator */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 52,
            height: 52,
            background: "hsl(var(--primary))",
            boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.5)",
            top: -18,
          }}
          animate={{
            left: `calc(${activeIndex * itemWidth}% + ${itemWidth / 2}% - 26px)`,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        />

        {/* Curved bump behind active icon — SVG overlay */}
        <motion.svg
          className="absolute top-0 left-0 w-full pointer-events-none"
          viewBox="0 0 400 68"
          preserveAspectRatio="none"
          style={{ height: 68, overflow: "visible" }}
        >
          <motion.path
            animate={{
              d: generateCurvePath(activeIndex, itemCount),
            }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            fill="hsl(var(--foreground))"
          />
        </motion.svg>

        {navItems.map((item, i) => {
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => {
                onSelect(item.label);
                const route = routeMap[item.label];
                if (route) navigate(route);
              }}
              className="relative flex flex-col items-center justify-center z-10"
              style={{ width: `${itemWidth}%` }}
            >
              <motion.div
                animate={{
                  y: isActive ? -22 : 0,
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="flex items-center justify-center"
              >
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  style={{
                    color: isActive
                      ? "hsl(var(--cream))"
                      : "hsla(var(--cream) / 0.4)",
                  }}
                />
              </motion.div>

              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? -14 : 0,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="text-[9px] font-body font-semibold tracking-wide absolute"
                style={{
                  bottom: 6,
                  color: "hsl(var(--cream))",
                }}
              >
                {item.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function generateCurvePath(activeIdx: number, total: number): string {
  const w = 400;
  const sectionW = w / total;
  const cx = sectionW * activeIdx + sectionW / 2;
  const curveW = 38;
  const curveH = 22;

  // A smooth upward bump centered on the active item
  return `
    M 0 0
    L ${cx - curveW} 0
    C ${cx - curveW * 0.5} 0, ${cx - curveW * 0.35} ${-curveH}, ${cx} ${-curveH}
    C ${cx + curveW * 0.35} ${-curveH}, ${cx + curveW * 0.5} 0, ${cx + curveW} 0
    L ${w} 0
    L ${w} 68
    L 0 68
    Z
  `;
}

export default BottomNav;
