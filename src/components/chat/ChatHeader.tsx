import { motion } from "framer-motion";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-10 pb-3"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--background)), hsla(var(--background) / 0.9))",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2">
          <ArrowLeft size={20} className="text-foreground" />
        </button>

        <div className="flex items-center gap-3">
          {/* Glowing orb avatar */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(var(--healing-green) / 0.4), transparent)",
                filter: "blur(6px)",
              }}
            />
            <div
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
                boxShadow: "0 2px 12px hsla(var(--healing-green) / 0.3)",
              }}
            >
              <span className="text-sm" style={{ color: "hsl(var(--primary-foreground))" }}>🌿</span>
            </div>
          </div>
          <div>
            <h1 className="font-display text-base font-semibold text-foreground leading-tight">Nirvaha</h1>
            <p className="text-[10px] font-body text-muted-foreground">Your wise companion</p>
          </div>
        </div>

        <button className="p-2 -mr-2">
          <MoreVertical size={18} className="text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
