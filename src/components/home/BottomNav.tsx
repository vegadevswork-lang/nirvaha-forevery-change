import { motion } from "framer-motion";
import { Home as HomeIcon, MessageCircle, BookOpen, User } from "lucide-react";

const navItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Chat", icon: MessageCircle },
  { label: "Journal", icon: BookOpen },
  { label: "Profile", icon: User },
];

interface BottomNavProps {
  active: string;
  onSelect: (label: string) => void;
}

const BottomNav = ({ active, onSelect }: BottomNavProps) => (
  <div className="fixed bottom-4 left-4 right-4 z-50">
    <div
      className="flex items-center justify-around py-2.5 px-2 rounded-2xl"
      style={{
        background: "hsl(var(--foreground))",
        boxShadow: "0 8px 32px hsla(var(--foreground) / 0.3), 0 2px 8px hsla(var(--foreground) / 0.15)",
      }}
    >
      {navItems.map((item) => {
        const isActive = active === item.label;
        return (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className="relative flex flex-col items-center gap-0.5 transition-all duration-300 px-3 py-1"
          >
            {isActive && (
              <motion.div
                layoutId="nav-active-bg"
                className="absolute inset-0 rounded-xl"
                style={{ background: "hsl(var(--primary))" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <motion.div
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              className="relative z-10 p-1"
            >
              <item.icon
                size={19}
                className={isActive ? "text-primary-foreground" : "text-muted-foreground"}
                style={!isActive ? { color: "hsla(var(--cream) / 0.5)" } : undefined}
              />
            </motion.div>
            <span
              className="text-[9px] font-body font-medium relative z-10"
              style={{
                color: isActive ? "hsl(var(--primary-foreground))" : "hsla(var(--cream) / 0.5)",
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

export default BottomNav;
