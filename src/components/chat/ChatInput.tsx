import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + "px";
    }
  };

  const hasText = text.trim().length > 0;

  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-3 pt-3"
      style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)",
      }}
    >
      <div
        className="flex items-end gap-2 rounded-2xl border px-3 py-2"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.2)",
        }}
      >
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none font-body text-sm py-1.5 placeholder:text-white/40"
          style={{ maxHeight: 100, color: "rgba(255,255,255,0.9)" }}
          placeholder="Share what's on your mind..."
          disabled={disabled}
        />

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleSend}
          disabled={disabled}
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: hasText ? "hsl(var(--primary))" : "transparent",
            color: hasText ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
          }}
        >
          {hasText ? <Send size={16} /> : <Mic size={18} />}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
