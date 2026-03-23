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
  Wellness: "/home",
  Profile: "/home",
};

const BottomNav = ({ active, onSelect }: BottomNavProps) => {
  const navigate = useNavigate();
  const activeIndex = navItems.findIndex((n) => n.label === active);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="relative">
        {/* SVG blob background with animated notch */}
        <svg
          viewBox="0 0 390 72"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(0 -4px 20px hsla(var(--foreground) / 0.15))" }}
        >
          <defs>
            <clipPath id="nav-clip">
              <rect x="0" y="0" width="390" height="72" rx="28" />
            </clipPath>
          </defs>
          <motion.path
            animate={{
              d: generateBlobPath(activeIndex, navItems.length),
            }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            fill="hsl(var(--foreground))"
            clipPath="url(#nav-clip)"
          />
        </svg>

        {/* Nav items overlay */}
        <div className="absolute inset-0 flex items-center justify-around px-4">
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
                className="relative flex flex-col items-center justify-center w-16 z-10"
              >
                <motion.div
                  animate={
                    isActive
                      ? { y: -14, scale: 1.15 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex flex-col items-center"
                >
                  {/* Active circle bg */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-bulge"
                      className="absolute -top-1 w-12 h-12 rounded-full"
                      style={{
                        background: "hsl(var(--primary))",
                        boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.4)",
                      }}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    />
                  )}
                  <div className="relative z-10 p-2.5">
                    <item.icon
                      size={20}
                      style={{
                        color: isActive
                          ? "hsl(var(--primary-foreground))"
                          : "hsla(var(--cream) / 0.45)",
                      }}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                </motion.div>
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  className="text-[9px] font-body font-medium mt-0.5"
                  style={{
                    color: isActive
                      ? "hsl(var(--cream))"
                      : "hsla(var(--cream) / 0.45)",
                  }}
                >
                  {item.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function generateBlobPath(activeIdx: number, total: number): string {
  const w = 390;
  const h = 72;
  const r = 28;
  const sectionW = w / total;
  const cx = sectionW * activeIdx + sectionW / 2;
  const bulgeW = 32;
  const bulgeH = 14;

  return `
    M ${r} 0
    L ${cx - bulgeW} 0
    C ${cx - bulgeW * 0.6} 0 ${cx - bulgeW * 0.4} ${-bulgeH} ${cx} ${-bulgeH}
    C ${cx + bulgeW * 0.4} ${-bulgeH} ${cx + bulgeW * 0.6} 0 ${cx + bulgeW} 0
    L ${w - r} 0
    Q ${w} 0 ${w} ${r}
    L ${w} ${h - r}
    Q ${w} ${h} ${w - r} ${h}
    L ${r} ${h}
    Q 0 ${h} 0 ${h - r}
    L 0 ${r}
    Q 0 0 ${r} 0
    Z
  `;
}

export default BottomNav;
