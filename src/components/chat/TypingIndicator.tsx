import { motion } from "framer-motion";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    className="flex items-center gap-2 mb-3"
  >
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
      }}
    >
      <span className="text-[10px]">🌿</span>
    </div>
    <div
      className="rounded-2xl px-4 py-3 flex items-center gap-1.5"
      style={{
        background: "hsla(var(--glass-bg))",
        borderColor: "hsla(var(--glass-border))",
        borderWidth: 1,
        backdropFilter: "blur(20px)",
        boxShadow: "0 2px 12px hsla(var(--glass-shadow))",
        borderBottomLeftRadius: "6px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full"
          style={{ background: "hsl(var(--primary))" }}
        />
      ))}
    </div>
  </motion.div>
);

export default TypingIndicator;
