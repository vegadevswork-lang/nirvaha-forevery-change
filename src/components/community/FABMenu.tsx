import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, PenLine, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FABMenu = ({ onNewPost }: { onNewPost: () => void }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30"
            style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(12px)" }}
          />
        )}
      </AnimatePresence>

      {/* Menu items */}
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-28 right-5 z-40 flex flex-col gap-3 items-end">
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setOpen(false); navigate("/people-chat"); }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl"
              style={{
                background: "hsl(var(--card) / 0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "0 8px 32px hsl(var(--glass-shadow))",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary) / 0.12)" }}>
                <MessageCircle size={18} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div className="text-left">
                <p className="font-body text-sm font-semibold text-foreground">New Chat</p>
                <p className="font-body text-[10px] text-muted-foreground/70">Chat with people</p>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setOpen(false); onNewPost(); }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl"
              style={{
                background: "hsl(var(--card) / 0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(var(--border) / 0.2)",
                boxShadow: "0 8px 32px hsl(var(--glass-shadow))",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.15)" }}>
                <PenLine size={18} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <div className="text-left">
                <p className="font-body text-sm font-semibold text-foreground">New Post</p>
                <p className="font-body text-[10px] text-muted-foreground/70">Share in the community</p>
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Glowing Seed FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open
            ? "hsl(var(--muted) / 0.6)"
            : "radial-gradient(circle at 40% 40%, hsl(var(--healing-green-light)), hsl(var(--primary)))",
          boxShadow: open
            ? "none"
            : "0 0 30px hsl(var(--healing-green) / 0.4), 0 0 60px hsl(var(--healing-green) / 0.15), 0 4px 16px hsl(var(--glass-shadow))",
          backdropFilter: open ? "blur(12px)" : undefined,
          border: open ? "1px solid hsl(var(--border) / 0.2)" : "none",
        }}
      >
        <motion.span
          animate={open ? { rotate: 45, scale: 0.9 } : { rotate: 0, scale: 1 }}
          className="text-xl"
        >
          {open ? "✕" : "🌱"}
        </motion.span>
      </motion.button>
    </>
  );
};

export default FABMenu;
