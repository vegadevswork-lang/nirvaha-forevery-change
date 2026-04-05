import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle, PenLine } from "lucide-react";
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
            style={{ background: "hsla(0 0% 0% / 0.4)", backdropFilter: "blur(4px)" }}
          />
        )}
      </AnimatePresence>

      {/* Menu items */}
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3 items-end">
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setOpen(false);
                navigate("/chat");
              }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl shadow-lg"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.3)",
                boxShadow: "0 8px 24px hsl(var(--glass-shadow))",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary) / 0.12)" }}
              >
                <MessageCircle size={18} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div className="text-left">
                <p className="font-body text-sm font-semibold text-foreground">New Chat</p>
                <p className="font-body text-[10px] text-muted-foreground">Talk to Nirvaha AI</p>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setOpen(false);
                onNewPost();
              }}
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl shadow-lg"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.3)",
                boxShadow: "0 8px 24px hsl(var(--glass-shadow))",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.15)" }}
              >
                <PenLine size={18} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <div className="text-left">
                <p className="font-body text-sm font-semibold text-foreground">New Post</p>
                <p className="font-body text-[10px] text-muted-foreground">Share in the community</p>
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        animate={{ rotate: open ? 45 : 0 }}
        className="fixed bottom-8 right-5 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: open
            ? "hsl(var(--muted))"
            : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
          boxShadow: open
            ? "none"
            : "0 8px 24px hsl(var(--healing-green) / 0.35)",
        }}
      >
        {open ? (
          <X size={22} className="text-foreground" />
        ) : (
          <Plus size={24} className="text-primary-foreground" />
        )}
      </motion.button>
    </>
  );
};

export default FABMenu;
