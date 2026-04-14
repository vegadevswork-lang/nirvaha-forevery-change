import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBubble, { type ChatMessage } from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import QuickReplies from "@/components/chat/QuickReplies";
import MoodTracker from "@/components/chat/MoodTracker";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import { useMoodLog } from "@/hooks/use-mood-log";
import BottomNav from "@/components/home/BottomNav";
import chariotBg from "@/assets/chariot.jpeg";

// Nirvaha persona responses
const nirvahaResponses: Record<string, string[]> = {
  greeting: [
    "Welcome back 🌿 I'm glad you're here. How are you feeling today?",
    "Hello, dear one. I'm here whenever you need to talk. What's on your mind?",
  ],
  happy: [
    "That's wonderful to hear 🌸 Joy is a gift — even noticing it is a practice. What's bringing you this lightness today?",
  ],
  calm: [
    "A calm mind is a powerful mind. In many traditions, this stillness is where wisdom speaks 🌊 Would you like to deepen this feeling with a brief meditation?",
  ],
  sad: [
    "I hear you, and I'm sorry you're carrying that weight right now. It's okay to feel this way — sadness often means something matters deeply to you 💛 Would you like to talk about it, or shall we try a gentle grounding exercise?",
  ],
  anxious: [
    "Anxiety can feel overwhelming, but remember — it's your mind trying to protect you. Let's slow things down together 🌿 Would you like to try a 4-4-6 breathing exercise, or would you prefer to talk about what's on your mind?",
  ],
  frustrated: [
    "Frustration is a valid feeling — it often signals that something needs to change. I appreciate you sharing that with me. What feels like the biggest source of this right now?",
  ],
  grateful: [
    "Gratitude is one of the most healing emotions 🙏 Research shows it can rewire how we experience the world. What are you feeling grateful for today?",
  ],
  breathing: [
    "Let's do this together 🌬️\n\nBreathe in slowly for 4 counts...\nHold gently for 4 counts...\nNow exhale softly for 6 counts...\n\nRepeat this 3 times. I'll be right here when you're done. Take your time.",
  ],
  journal: [
    "That's a beautiful practice 📝 Here's a gentle prompt for you:\n\n\"What is one thing I'm holding onto that I could gently release today?\"\n\nTake a moment to sit with this. There's no rush.",
  ],
  wisdom: [
    "The Wisdom Selfie is a way to see yourself through the lens of your inner strength ✨ It can be a powerful reflection tool. Would you like to try creating one now?",
  ],
  default: [
    "Thank you for sharing that with me. I hear you, and what you're feeling is completely valid 💛 Would you like to explore this further, or shall I suggest something that might help?",
    "That makes sense. It takes courage to put feelings into words. I'm here with you 🌿 What feels most important about this right now?",
    "I appreciate you opening up. Let's sit with this together for a moment. Sometimes just naming what we feel is the first step toward understanding it 🌸",
  ],
};

function getResponse(input: string): { reply: string; suggestions: string[] } {
  const lower = input.toLowerCase();
  let key = "default";
  
  if (/happy|joy|great|good|wonderful|amazing/.test(lower)) key = "happy";
  else if (/calm|peaceful|serene|relaxed/.test(lower)) key = "calm";
  else if (/sad|down|unhappy|depressed|lonely|lost/.test(lower)) key = "sad";
  else if (/anxious|anxiety|worried|nervous|stress|overwhelm/.test(lower)) key = "anxious";
  else if (/angry|frustrated|annoyed|irritated|mad/.test(lower)) key = "frustrated";
  else if (/grateful|thankful|blessed|appreciate/.test(lower)) key = "grateful";
  else if (/breath|breathing/.test(lower)) key = "breathing";
  else if (/journal|write|reflect/.test(lower)) key = "journal";
  else if (/wisdom|selfie/.test(lower)) key = "wisdom";
  else if (/hello|hi |hey|good morning|good evening/.test(lower)) key = "greeting";

  const responses = nirvahaResponses[key];
  const reply = responses[Math.floor(Math.random() * responses.length)];

  // Contextual suggestions
  let suggestions = ["Tell me more", "Practice Breathing", "Journal"];
  if (key === "anxious" || key === "sad") suggestions = ["Practice Breathing", "Tell me more", "Wisdom Selfie"];
  if (key === "happy" || key === "grateful") suggestions = ["Journal", "Tell me more", "Wisdom Selfie"];
  if (key === "breathing") suggestions = ["I feel better", "Tell me more", "Journal"];

  return { reply, suggestions };
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Welcome to your safe space 🌿\n\nI'm Nirvaha — a calm presence here to walk beside you. I blend ancient wisdom with modern insight to help you understand what you feel.\n\nI'm not a therapist, but I'm always here to listen. How are you feeling today?",
    timestamp: new Date(),
  },
];

const Chat = () => {
  const { logMood } = useMoodLog();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(["I'm feeling stressed", "Tell me more", "Practice Breathing"]);
  const [showMoodTracker, setShowMoodTracker] = useState(true);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const triggerSparkle = (x: number, y: number) => {
    setSparkleOrigin({ x, y });
    setSparkleTrigger((t) => t + 1);
  };

  const handleSend = (text: string) => {
    // Sparkle on send
    triggerSparkle(window.innerWidth / 2, window.innerHeight - 60);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setSuggestions([]);
    setIsTyping(true);

    // Simulate Nirvaha thinking
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const { reply, suggestions: newSuggestions } = getResponse(text);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      setSuggestions(newSuggestions);
    }, delay);
  };

  const handleMoodSelect = (mood: string) => {
    setShowMoodTracker(false);
    logMood(mood);
    handleSend(`I'm feeling ${mood.toLowerCase()} right now`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Chariot background */}
      <img
        src={chariotBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%)" }} />

      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      <ChatHeader />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-24 pb-36 relative z-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence>
          {showMoodTracker && (
            <MoodTracker
              onMoodSelect={handleMoodSelect}
              onDismiss={() => setShowMoodTracker(false)}
            />
          )}
        </AnimatePresence>

        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} message={msg} index={i} />
        ))}

        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        {!isTyping && suggestions.length > 0 && (
          <QuickReplies suggestions={suggestions} onSelect={handleSend} />
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
      <BottomNav />
    </div>
  );
};

export default Chat;
