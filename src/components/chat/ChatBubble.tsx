import { motion } from "framer-motion";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBubbleProps {
  message: ChatMessage;
  index: number;
}

const ChatBubble = ({ message, index }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-1"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
            boxShadow: "0 2px 8px hsla(var(--healing-green) / 0.2)",
          }}
        >
          <span className="text-[10px]">🌿</span>
        </div>
      )}

      <div
        className="max-w-[78%] rounded-2xl px-4 py-3"
        style={{
          background: isUser
            ? "hsl(var(--primary))"
            : "hsla(var(--glass-bg))",
          color: isUser
            ? "hsl(var(--primary-foreground))"
            : "hsl(var(--foreground))",
          borderColor: isUser ? "transparent" : "hsla(var(--glass-border))",
          borderWidth: isUser ? 0 : 1,
          backdropFilter: isUser ? "none" : "blur(20px)",
          boxShadow: isUser
            ? "0 4px 16px hsla(var(--healing-green) / 0.25)"
            : "0 2px 12px hsla(var(--glass-shadow)), inset 0 1px 0 hsla(var(--glass-border))",
          borderBottomRightRadius: isUser ? "6px" : "18px",
          borderBottomLeftRadius: isUser ? "18px" : "6px",
        }}
      >
        <p className="font-body text-[13.5px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p
          className="text-[9px] mt-1.5 font-body opacity-50 text-right"
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
