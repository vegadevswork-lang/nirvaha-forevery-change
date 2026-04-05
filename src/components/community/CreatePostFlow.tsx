import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, Hash } from "lucide-react";
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

  const selectedTopic = communityTopics.find(t => t.label === topic);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="font-body text-sm text-muted-foreground"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={text.trim().length < 10 || modResult?.isCrisis}
          className="px-5 py-2 rounded-full font-body text-sm font-semibold disabled:opacity-30"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Post
        </motion.button>
      </div>

      {/* Compose area */}
      <div className="flex-1 overflow-y-auto px-4 relative z-10">
        {/* User avatar + textarea */}
        <div className="flex gap-3 pt-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--healing-green) / 0.3))",
            }}
          >
            <span className="text-sm">✨</span>
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="What's on your mind?"
              rows={8}
              autoFocus
              className="w-full bg-transparent text-base resize-none font-body outline-none leading-relaxed placeholder:text-muted-foreground"
              style={{ color: "hsl(var(--foreground))" }}
            />
          </div>
        </div>

        {/* Moderation */}
        <AnimatePresence>
          {modResult && (
            <div className="mt-2">
              <ModerationBanner result={modResult} onDismiss={() => setModResult(null)} />
            </div>
          )}
        </AnimatePresence>

        {saferTip && (
          <p className="font-body text-[11px] text-muted-foreground mt-2 italic px-13">
            {saferTip}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div className="px-4 pb-8 pt-3 relative z-10" style={{ borderTop: "1px solid hsl(var(--border) / 0.15)" }}>
        <div className="flex items-center justify-between">
          {/* Topic selector */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTopics(!showTopics)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "hsl(var(--muted) / 0.5)", border: "1px solid hsl(var(--border) / 0.2)" }}
          >
            <Hash size={13} className="text-primary" />
            <span className="font-body text-xs text-foreground">{topic}</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <Globe size={16} className="text-muted-foreground" />
            <span className="font-body text-[10px] text-muted-foreground">
              {text.length} chars
            </span>
          </div>
        </div>

        {/* Topic picker dropdown */}
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
                    onClick={() => {
                      setTopic(t.label);
                      setShowTopics(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all"
                    style={topic === t.label ? {
                      background: "hsl(var(--primary) / 0.12)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--primary) / 0.3)",
                    } : {
                      background: "hsl(var(--muted) / 0.4)",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--border) / 0.2)",
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

        <p className="font-body text-[10px] text-muted-foreground text-center mt-3">
          🛡️ Your identity stays anonymous. Only your aura is visible.
        </p>
      </div>
    </motion.div>
  );
};

export default CreatePostFlow;
