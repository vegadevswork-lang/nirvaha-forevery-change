import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/use-notifications";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const GreetingHeader = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-5"
    >
      <div className="min-w-0">
        <h1 className="font-display text-xl text-foreground font-semibold leading-tight">
          {getGreeting()}
        </h1>
        <p className="font-body text-xs text-muted-foreground mt-0.5">
          How are you feeling today?
        </p>
      </div>
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => navigate("/profile")}
        aria-label="Open profile"
        className="relative w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0"
        style={{
          background: "hsla(var(--glass-bg))",
          borderColor: "hsla(var(--glass-border))",
          backdropFilter: "blur(12px)",
        }}
      >
        <User size={18} className="text-muted-foreground" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ring-background"
            style={{ background: "hsl(var(--destructive))" }}
            aria-label={`${unreadCount} unread notifications`}
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default GreetingHeader;
