import { motion } from "framer-motion";
import { BookOpen, Camera, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Journal",
    desc: "Capture what matters",
    icon: BookOpen,
    route: "/journal",
  },
  {
    label: "Legends Selfie",
    desc: "A moment with wisdom",
    icon: Camera,
    route: "/legends-selfie",
  },
];

const QuietActions = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="mb-6 space-y-2.5"
    >
      {items.map((item, i) => (
        <motion.button
          key={item.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.06 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(item.route)}
          className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl"
          style={{
            background: "hsla(var(--glass-bg))",
            border: "1px solid hsla(var(--glass-border))",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--gold) / 0.1))",
            }}
          >
            <item.icon size={16} className="text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-display text-sm text-foreground font-semibold leading-tight">
              {item.label}
            </p>
            <p className="font-body text-[11px] text-muted-foreground mt-0.5">
              {item.desc}
            </p>
          </div>
          <ArrowRight size={14} className="text-muted-foreground" />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuietActions;
