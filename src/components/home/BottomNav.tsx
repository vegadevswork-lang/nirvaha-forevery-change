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
  const itemWidth = 100 / itemCount;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="relative" style={{ height: 64 }}>
        {/* Nav bar background with animated notch */}
        <svg
          className="absolute inset-0 w-full"
          viewBox="0 0 400 64"
          preserveAspectRatio="none"
          style={{
            height: 64,
            overflow: "visible",
          }}
        >
          <motion.path
            animate={{ d: generateNavPath(activeIndex, itemCount) }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            fill="hsla(var(--foreground) / 0.82)"
          />
        </svg>

        {/* Floating active circle */}
        <motion.div
          className="absolute z-20"
          animate={{
            left: `calc(${activeIndex * itemWidth}% + ${itemWidth / 2}% - 24px)`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          style={{ top: -12 }}
        >
          {/* Glow pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "hsl(var(--primary))" }}
            animate={{
              boxShadow: [
                "0 0 0px 0px hsla(var(--healing-green) / 0.3)",
                "0 0 12px 4px hsla(var(--healing-green) / 0.25)",
                "0 0 0px 0px hsla(var(--healing-green) / 0.3)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center relative"
            style={{ background: "hsl(var(--primary))" }}
          >
            {navItems[activeIndex] && (
              <motion.div
                key={active}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {(() => {
                  const Icon = navItems[activeIndex].icon;
                  return (
                    <Icon
                      size={20}
                      strokeWidth={2.2}
                      style={{ color: "hsl(var(--cream))" }}
                    />
                  );
                })()}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Nav items */}
        <div className="absolute inset-0 flex items-center justify-around px-2 z-10">
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
                className="flex flex-col items-center justify-center relative"
                style={{ width: `${itemWidth}%`, height: 64 }}
              >
                {/* Only show icon when NOT active (active icon is in the floating circle) */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.5 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.8}
                    style={{ color: "hsla(var(--cream) / 0.4)" }}
                  />
                </motion.div>

                {/* Label appears below for active */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[9px] font-body font-semibold tracking-wide absolute"
                  style={{ bottom: 8, color: "hsl(var(--cream))" }}
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

function generateNavPath(activeIdx: number, total: number): string {
  const w = 400;
  const h = 64;
  const r = 32; // corner radius
  const sectionW = w / total;
  const cx = sectionW * activeIdx + sectionW / 2;
  const notchW = 34;
  const notchH = 16;

  return `
    M ${r} 0
    L ${cx - notchW} 0
    C ${cx - notchW * 0.55} 0, ${cx - notchW * 0.35} ${-notchH}, ${cx} ${-notchH}
    C ${cx + notchW * 0.35} ${-notchH}, ${cx + notchW * 0.55} 0, ${cx + notchW} 0
    L ${w - r} 0
    Q ${w} 0, ${w} ${r}
    L ${w} ${h - r}
    Q ${w} ${h}, ${w - r} ${h}
    L ${r} ${h}
    Q 0 ${h}, 0 ${h - r}
    L 0 ${r}
    Q 0 0, ${r} 0
    Z
  `;
}

export default BottomNav;
