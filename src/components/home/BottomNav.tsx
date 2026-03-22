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
  <div className="fixed bottom-0 left-0 right-0 z-50">
    <div
      className="flex items-center justify-around py-3 px-4 border-t"
      style={{
        background: "hsla(var(--glass-bg))",
        borderColor: "hsla(var(--glass-border))",
        backdropFilter: "blur(24px) saturate(1.2)",
        WebkitBackdropFilter: "blur(24px) saturate(1.2)",
      }}
    >
      {navItems.map((item) => {
        const isActive = active === item.label;
        return (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className="flex flex-col items-center gap-0.5 transition-all duration-300"
          >
            <motion.div
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              style={isActive ? { boxShadow: "0 0 16px hsla(var(--healing-green) / 0.2)" } : undefined}
            >
              <item.icon size={20} />
            </motion.div>
            <span
              className={`text-[10px] font-body ${
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              }`}
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
