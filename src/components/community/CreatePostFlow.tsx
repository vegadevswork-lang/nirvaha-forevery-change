import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import { emotions, intents, communityTopics } from "@/data/communityData";
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
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState("");
  const [intent, setIntent] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("Emotional Health");
  const [sparkleOrigin, setSparkleOrigin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [modResult, setModResult] = useState<ModerationResult | null>(null);
  const [saferTip, setSaferTip] = useState<string | null>(null);

  const triggerSparkle = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setSparkleTrigger((t) => t + 1);
  };

  const handleTextChange = (val: string) => {
    setText(val);
    setSaferTip(getSaferPhrasing(val));
    if (val.length > 15) {
      const result = moderateContent(val);
      setModResult(
        result.warnings.length > 0 ||
          result.isCrisis ||
          result.suggestions.length > 0
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
    const emotionData = emotions.find((em) => em.label === emotion);
    onPost({
      id: `user-${Date.now()}`,
      emotion,
      intent,
      content: text,
      auraColor: emotionData?.color || "152 35% 45%",
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

  const steps = ["Feel", "Intent", "Topic", "Write"];

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
        style={{
          width: 200,
          height: 200,
          top: "5%",
          right: "-10%",
          background: "hsl(var(--healing-green))",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => (step > 0 ? setStep(step - 1) : onClose())}
          className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <div className="flex-1">
          <h1 className="font-display text-lg text-foreground font-semibold">
            New Expression
          </h1>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex gap-1.5 px-5 mb-5">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="h-1 w-full rounded-full transition-all"
              style={{
                background:
                  i <= step
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
              }}
            />
            <span
              className="font-body text-[9px]"
              style={{
                color:
                  i <= step
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--muted-foreground))",
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">
                What are you feeling?
              </h2>
              <p className="font-body text-xs text-muted-foreground mb-6">
                Choose the one that resonates most.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {emotions.map((em) => (
                  <motion.button
                    key={em.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      triggerSparkle(e);
                      setEmotion(em.label);
                      setTimeout(() => setStep(1), 300);
                    }}
                    className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all ${
                      emotion === em.label ? "ring-2" : ""
                    }`}
                    style={{
                      background: "hsl(var(--card))",
                      borderColor:
                        emotion === em.label
                          ? `hsl(${em.color})`
                          : "hsl(var(--border) / 0.5)",
                      ...(emotion === em.label
                        ? { boxShadow: `0 0 0 2px hsl(${em.color} / 0.3)` }
                        : {}),
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: `linear-gradient(135deg, hsl(${em.color} / 0.3), hsl(${em.color} / 0.1))`,
                      }}
                    >
                      {em.emoji}
                    </div>
                    <span className="font-body text-sm font-medium text-foreground">
                      {em.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">
                What do you need right now?
              </h2>
              <p className="font-body text-xs text-muted-foreground mb-6">
                This helps others respond better.
              </p>
              <div className="flex flex-col gap-3">
                {intents.map((it) => (
                  <motion.button
                    key={it.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      triggerSparkle(e);
                      setIntent(it.label);
                      setTimeout(() => setStep(2), 300);
                    }}
                    className="rounded-2xl border p-4 flex items-center gap-4 text-left"
                    style={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border) / 0.5)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "hsl(var(--primary) / 0.1)" }}
                    >
                      {it.emoji}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">
                        {it.label}
                      </p>
                      <p className="font-body text-[11px] text-muted-foreground">
                        {it.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">
                Choose a space
              </h2>
              <p className="font-body text-xs text-muted-foreground mb-6">
                Where does this belong?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {communityTopics.map((t) => (
                  <motion.button
                    key={t.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setTopic(t.label);
                      setTimeout(() => setStep(3), 200);
                    }}
                    className="rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all"
                    style={{
                      background: "hsl(var(--card))",
                      borderColor:
                        topic === t.label
                          ? "hsl(var(--primary))"
                          : "hsl(var(--border) / 0.5)",
                      ...(topic === t.label
                        ? {
                            boxShadow:
                              "0 0 0 2px hsl(var(--primary) / 0.2)",
                          }
                        : {}),
                    }}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="font-body text-xs font-medium text-foreground">
                      {t.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">
                Say what's on your mind…
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: `hsl(${
                      emotions.find((e) => e.label === emotion)?.color ||
                      "152 35% 45%"
                    })`,
                  }}
                />
                <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
                  {emotion} • {intent} • {topic}
                </span>
              </div>

              <AnimatePresence>
                {modResult && (
                  <ModerationBanner
                    result={modResult}
                    onDismiss={() => setModResult(null)}
                  />
                )}
              </AnimatePresence>

              {saferTip && (
                <p className="font-body text-[11px] text-muted-foreground mb-2 italic">
                  {saferTip}
                </p>
              )}

              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Share what's on your heart…"
                rows={6}
                className="w-full rounded-2xl border px-4 py-3 text-sm resize-none font-body"
                style={{
                  background: "hsl(var(--muted) / 0.4)",
                  borderColor: "hsl(var(--border) / 0.5)",
                  color: "hsl(var(--foreground))",
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="font-body text-[10px] text-muted-foreground">
                  {text.length} characters
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={text.trim().length < 10 || modResult?.isCrisis}
                className="w-full mt-4 py-3.5 rounded-2xl font-body text-sm font-semibold disabled:opacity-40"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Share Expression
              </motion.button>
              <p className="font-body text-[10px] text-muted-foreground text-center mt-3">
                🛡️ Your identity stays hidden. Only your aura is visible.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CreatePostFlow;
