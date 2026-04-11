import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash } from "lucide-react";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import { communityTopics } from "@/data/communityData";
import {
  moderateContent,
  getSaferPhrasing,
  type ModerationResult,
} from "@/hooks/use-content-moderation";
import type { CommunityPost } from "./types";
import ModerationBanner from "./ModerationBanner";

const CreatePostFlow = ({
  onClose,
  onPost,
}: {
  onClose: () => void;
  onPost: (post: CommunityPost) => void;
}) => {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("Emotional Health");
  const [showTopics, setShowTopics] = useState(false);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [modResult, setModResult] = useState<ModerationResult | null>(null);
  const [saferTip, setSaferTip] = useState<string | null>(null);

  const handleTextChange = (val: string) => {
    setText(val);
    setSaferTip(getSaferPhrasing(val));
    if (val.length > 15) {
      const result = moderateContent(val);
      setModResult(
        result.warnings.length > 0 || result.isCrisis || result.suggestions.length > 0
          ? result
          : null
      );
    } else {
      setModResult(null);
    }
  };

  const handleSubmit = () => {
    const finalCheck = moderateContent(text);
    if (!finalCheck.isAllowed) {
      setModResult(finalCheck);
      return;
    }
    setSparkleOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setSparkleTrigger((t) => t + 1);
    onPost({
      id: `user-${Date.now()}`,
      emotion: "Sharing",
      intent: "Express",
      content: text,
      auraColor: "152 35% 45%",
      energyState: "Opening up",
      timestamp: new Date(),
      responses: [],
      isOwn: true,
      topicSpace: topic,
      resonances: 0,
      resonatedByUser: false,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: "hsl(var(--background) / 0.6)",
        backdropFilter: "blur(40px) saturate(1.2)",
        WebkitBackdropFilter: "blur(40px) saturate(1.2)",
      }}
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--healing-green) / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="font-body text-sm text-muted-foreground/70"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={text.trim().length < 10 || modResult?.isCrisis}
          className="px-6 py-2 rounded-2xl font-body text-sm font-semibold disabled:opacity-20 transition-all"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: text.trim().length >= 10 ? "0 0 20px hsl(var(--primary) / 0.3)" : "none",
          }}
        >
          Plant Seed
        </motion.button>
      </div>

      {/* Compose — centered thought bubble */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto px-6 pt-8 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="What wisdom is your heart seeking today?"
            rows={10}
            autoFocus
            className="w-full bg-transparent text-base resize-none font-body outline-none leading-[1.85] text-center"
            style={{
              color: "hsl(var(--foreground) / 0.9)",
              caretColor: "hsl(var(--primary))",
            }}
          />

          {/* Moderation */}
          <AnimatePresence>
            {modResult && (
              <div className="mt-4">
                <ModerationBanner result={modResult} onDismiss={() => setModResult(null)} />
              </div>
            )}
          </AnimatePresence>

          {saferTip && (
            <p className="font-body text-[11px] text-muted-foreground/60 mt-3 italic text-center">
              {saferTip}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 pb-8 pt-3 relative z-10" style={{ borderTop: "1px solid hsl(var(--border) / 0.1)" }}>
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTopics(!showTopics)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
            style={{
              background: "hsl(var(--muted) / 0.3)",
              border: "1px solid hsl(var(--border) / 0.15)",
            }}
          >
            <Hash size={12} className="text-primary/60" />
            <span className="font-body text-xs text-foreground/70">{topic}</span>
          </motion.button>

          <span className="font-body text-[10px] text-muted-foreground/40">
            {text.length} chars
          </span>
        </div>

        {/* Topic picker */}
        <AnimatePresence>
          {showTopics && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="flex flex-wrap gap-2">
                {communityTopics.map((t) => (
                  <motion.button
                    key={t.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setTopic(t.label); setShowTopics(false); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-body transition-all"
                    style={topic === t.label ? {
                      background: "hsl(var(--primary) / 0.12)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                    } : {
                      background: "hsl(var(--muted) / 0.3)",
                      color: "hsl(var(--foreground) / 0.7)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                    }}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="font-body text-[10px] text-muted-foreground/40 text-center mt-4 font-display italic">
          🛡️ Your identity remains sacred. Only your aura is visible.
        </p>
      </div>
    </motion.div>
  );
};

export default CreatePostFlow;
