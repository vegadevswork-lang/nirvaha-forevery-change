import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Shield, Search, BadgeCheck, Bookmark, BookmarkCheck, AlertTriangle, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import {
  emotions,
  intents,
  empathyStarters,
  reflectionOptions,
  samplePosts,
  getTimeAgo,
  type CommunityPost,
  type CommunityResponse,
} from "@/data/communityData";
import { moderateContent, getSaferPhrasing, type ModerationResult } from "@/hooks/use-content-moderation";
import { useSavedPosts } from "@/hooks/use-saved-posts";

/* ─── Feed Post Card ─── */
const PostCard = ({
  post,
  onOpen,
  isSaved,
  onToggleSave,
}: {
  post: CommunityPost;
  onOpen: (p: CommunityPost) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}) => {
  const emotionData = emotions.find((e) => e.label === post.emotion);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-5 w-full mb-4"
    >
      {/* Aura header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: `linear-gradient(135deg, hsl(${post.auraColor}), hsl(${post.auraColor} / 0.5))`,
            boxShadow: `0 0 12px hsl(${post.auraColor} / 0.3)`,
          }}
        >
          {emotionData?.emoji || "✨"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="font-body text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `hsl(${post.auraColor} / 0.15)`,
                color: `hsl(${post.auraColor})`,
              }}
            >
              {post.emotion}
            </span>
            <span className="font-body text-[10px] text-muted-foreground">•</span>
            <span className="font-body text-[10px] text-muted-foreground">{post.energyState}</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className="p-1.5"
        >
          {isSaved ? (
            <BookmarkCheck size={16} style={{ color: "hsl(var(--primary))" }} />
          ) : (
            <Bookmark size={16} className="text-muted-foreground" />
          )}
        </motion.button>
        <span className="font-body text-[10px] text-muted-foreground flex-shrink-0">{getTimeAgo(post.timestamp)}</span>
      </div>

      <button onClick={() => onOpen(post)} className="w-full text-left">
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-3 mb-3">{post.content}</p>

        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] text-muted-foreground italic">"{post.intent}"</span>
          <span
            className="font-body text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
          >
            Respond
          </span>
        </div>

        {post.responses.length > 0 && (
          <div className="mt-3 pt-3 flex items-center gap-1.5" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
            <div className="flex -space-x-1.5">
              {post.responses.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="w-5 h-5 rounded-full border-2"
                  style={{
                    borderColor: "hsl(var(--background))",
                    background: `hsl(${r.auraColor})`,
                  }}
                />
              ))}
            </div>
            <span className="font-body text-[10px] text-muted-foreground">
              {post.responses.length} {post.responses.length === 1 ? "response" : "responses"}
            </span>
          </div>
        )}
      </button>
    </motion.div>
  );
};

/* ─── Response Bubble ─── */
const ResponseBubble = ({ r }: { r: CommunityResponse }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-4 mb-3"
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className="w-6 h-6 rounded-full"
        style={{ background: `hsl(${r.auraColor})`, boxShadow: `0 0 8px hsl(${r.auraColor} / 0.3)` }}
      />
      {r.isVerified ? (
        <div className="flex items-center gap-1">
          <BadgeCheck size={12} style={{ color: "hsl(var(--primary))" }} />
          <span className="font-body text-xs font-semibold text-foreground">{r.verifiedName}</span>
          <span className="font-body text-[10px] text-muted-foreground">• {r.verifiedRole}</span>
        </div>
      ) : (
        <span className="font-body text-[10px] text-muted-foreground">Anonymous</span>
      )}
      <span className="ml-auto font-body text-[10px] text-muted-foreground">{getTimeAgo(r.timestamp)}</span>
    </div>
    <p className="font-body text-sm text-foreground leading-relaxed">{r.content}</p>
  </motion.div>
);

/* ─── Moderation Banner ─── */
const ModerationBanner = ({ result, onDismiss }: { result: ModerationResult; onDismiss: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    className="rounded-xl p-4 mb-3"
    style={{
      background: result.isCrisis
        ? "linear-gradient(135deg, hsl(0 60% 50% / 0.15), hsl(0 60% 50% / 0.05))"
        : "linear-gradient(135deg, hsl(42 80% 55% / 0.15), hsl(42 80% 55% / 0.05))",
      border: `1px solid ${result.isCrisis ? "hsl(0 60% 50% / 0.2)" : "hsl(42 80% 55% / 0.2)"}`,
    }}
  >
    <div className="flex items-start gap-2.5">
      {result.isCrisis ? (
        <Heart size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(0 60% 50%)" }} />
      ) : (
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(42 80% 55%)" }} />
      )}
      <div className="flex-1">
        {result.isCrisis ? (
          <>
            <p className="font-body text-sm font-semibold text-foreground mb-1">We care about you 💛</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed whitespace-pre-line mb-2">
              {result.crisisResources}
            </p>
          </>
        ) : (
          <>
            {result.warnings.map((w, i) => (
              <p key={i} className="font-body text-xs text-foreground mb-1">{w}</p>
            ))}
            {result.suggestions.map((s, i) => (
              <p key={i} className="font-body text-[11px] text-muted-foreground italic">{s}</p>
            ))}
          </>
        )}
        {!result.isCrisis && (
          <button onClick={onDismiss} className="font-body text-[10px] text-muted-foreground underline mt-1">
            Dismiss
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Insights Panel ─── */
const InsightsPanel = ({ onClose }: { onClose: () => void }) => {
  const { savedPosts, getInsights } = useSavedPosts();
  const insights = getInsights();

  // Emotion distribution
  const emotionCounts: Record<string, number> = {};
  savedPosts.forEach((p) => { emotionCounts[p.emotion] = (emotionCounts[p.emotion] || 0) + 1; });
  const total = savedPosts.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <div>
          <h1 className="font-display text-lg text-foreground font-semibold">Your Emotional Journey</h1>
          <p className="font-body text-[10px] text-muted-foreground">{savedPosts.length} saved expressions</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Emotion Distribution */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 mb-4"
          >
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">Emotional Themes</h3>
            <div className="space-y-2.5">
              {Object.entries(emotionCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([emotion, count]) => {
                  const em = emotions.find((e) => e.label === emotion);
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={emotion}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-body text-xs text-foreground">{em?.emoji} {emotion}</span>
                        <span className="font-body text-[10px] text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "hsl(var(--muted))" }}>
                        <motion.div
                          className="h-1.5 rounded-full"
                          style={{ background: `hsl(${em?.color || "152 35% 45%"})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* AI Insights */}
        {insights.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
              Insights
            </h3>
            {insights.map((insight, i) => (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">{insight.emoji}</span>
                  <span className="font-body text-xs font-semibold text-foreground">{insight.label}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body text-sm text-muted-foreground">Save more expressions to unlock insights 🌿</p>
            <p className="font-body text-[10px] text-muted-foreground mt-1">At least 2 saved posts needed</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Guided Create Flow ─── */
const CreateFlow = ({ onClose, onPost }: { onClose: () => void; onPost: (post: CommunityPost) => void }) => {
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState("");
  const [intent, setIntent] = useState("");
  const [text, setText] = useState("");
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [modResult, setModResult] = useState<ModerationResult | null>(null);
  const [saferTip, setSaferTip] = useState<string | null>(null);

  const triggerSparkle = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSparkleTrigger((t) => t + 1);
  };

  const handleTextChange = (val: string) => {
    setText(val);
    setSaferTip(getSaferPhrasing(val));
    if (val.length > 15) {
      const result = moderateContent(val);
      if (result.warnings.length > 0 || result.isCrisis || result.suggestions.length > 0) {
        setModResult(result);
      } else {
        setModResult(null);
      }
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
    const post: CommunityPost = {
      id: `user-${Date.now()}`,
      emotion,
      intent,
      content: text,
      auraColor: emotionData?.color || "152 35% 45%",
      energyState: "Opening up",
      timestamp: new Date(),
      responses: [],
    };
    onPost(post);
    onClose();
  };

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

      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <div className="flex-1">
          <h1 className="font-display text-lg text-foreground font-semibold">Express Yourself</h1>
          <p className="font-body text-[10px] text-muted-foreground">Step {step + 1} of 3</p>
        </div>
      </div>

      <div className="px-5 mb-6">
        <div className="h-1 rounded-full" style={{ background: "hsl(var(--muted))" }}>
          <motion.div
            className="h-1 rounded-full"
            style={{ background: "hsl(var(--primary))" }}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">What are you feeling right now?</h2>
              <p className="font-body text-xs text-muted-foreground mb-6">Choose the one that resonates most.</p>
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
                    className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${emotion === em.label ? "ring-2" : ""}`}
                    style={emotion === em.label ? { borderColor: `hsl(${em.color})`, boxShadow: `0 0 0 2px hsl(${em.color} / 0.3)` } : {}}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: `linear-gradient(135deg, hsl(${em.color} / 0.3), hsl(${em.color} / 0.1))`,
                        boxShadow: `0 0 16px hsl(${em.color} / 0.2)`,
                      }}
                    >
                      {em.emoji}
                    </div>
                    <span className="font-body text-sm font-medium text-foreground">{em.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">What do you want right now?</h2>
              <p className="font-body text-xs text-muted-foreground mb-6">This helps others respond better.</p>
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
                    className="glass-card p-4 flex items-center gap-4 text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "hsl(var(--primary) / 0.1)" }}
                    >
                      {it.emoji}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">{it.label}</p>
                      <p className="font-body text-[11px] text-muted-foreground">{it.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-4 font-body text-xs text-muted-foreground underline">← Back</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">Say what's on your mind…</h2>
              <p className="font-body text-xs text-muted-foreground mb-1">
                Your identity stays hidden. Only your aura and emotion are visible.
              </p>
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: `hsl(${emotions.find((e) => e.label === emotion)?.color || "152 35% 45%"})`,
                    boxShadow: `0 0 8px hsl(${emotions.find((e) => e.label === emotion)?.color || "152 35% 45%"} / 0.4)`,
                  }}
                />
                <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
                  {emotion} • {intent}
                </span>
              </div>

              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Write freely. This is your safe space…"
                rows={6}
                className="glass-input resize-none mb-2"
                style={{ minHeight: 140 }}
              />

              {/* Safer phrasing tip */}
              <AnimatePresence>
                {saferTip && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-body text-[11px] text-muted-foreground mb-2"
                  >
                    {saferTip}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Moderation warnings */}
              <AnimatePresence>
                {modResult && (
                  <ModerationBanner result={modResult} onDismiss={() => setModResult(null)} />
                )}
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={text.trim().length < 10 || (modResult?.isCrisis ?? false)}
                className="btn-primary disabled:opacity-40 mt-2"
              >
                Share Anonymously
              </motion.button>
              <button onClick={() => setStep(1)} className="mt-3 w-full font-body text-xs text-muted-foreground underline">← Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Post Detail Sheet ─── */
const PostDetail = ({
  post,
  onClose,
}: {
  post: CommunityPost;
  onClose: () => void;
}) => {
  const [replyText, setReplyText] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [reflected, setReflected] = useState(false);
  const [replyModResult, setReplyModResult] = useState<ModerationResult | null>(null);
  const navigate = useNavigate();
  const { isPostSaved, savePost, unsavePost } = useSavedPosts();
  const emotionData = emotions.find((e) => e.label === post.emotion);
  const saved = isPostSaved(post.id);

  const handleReplyChange = (val: string) => {
    setReplyText(val);
    if (val.length > 10) {
      const result = moderateContent(val);
      if (result.warnings.length > 0 || result.suggestions.length > 0 || result.isCrisis) {
        setReplyModResult(result);
      } else {
        setReplyModResult(null);
      }
    } else {
      setReplyModResult(null);
    }
  };

  const handleSend = () => {
    const check = moderateContent(replyText);
    if (!check.isAllowed) {
      setReplyModResult(check);
      return;
    }
    setReplyText("");
    setReplyModResult(null);
    setShowReflection(true);
  };

  const handleReflect = (_label: string) => {
    setReflected(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, top: "5%", right: "-8%", background: `hsl(${post.auraColor})` }}
      />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ background: `hsl(${post.auraColor})`, boxShadow: `0 0 10px hsl(${post.auraColor} / 0.3)` }}
          >
            {emotionData?.emoji}
          </div>
          <div>
            <span className="font-body text-xs font-semibold text-foreground">{post.emotion}</span>
            <span className="font-body text-[10px] text-muted-foreground ml-1.5">• {post.energyState}</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => saved ? unsavePost(post.id) : savePost(post.id, post.emotion, post.intent)}
          className="p-2"
        >
          {saved ? (
            <BookmarkCheck size={18} style={{ color: "hsl(var(--primary))" }} />
          ) : (
            <Bookmark size={18} className="text-muted-foreground" />
          )}
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="glass-card p-5 mb-4">
          <p className="font-body text-sm text-foreground leading-relaxed mb-3">{post.content}</p>
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] text-muted-foreground italic">"{post.intent}"</span>
            <span className="ml-auto font-body text-[10px] text-muted-foreground">{getTimeAgo(post.timestamp)}</span>
          </div>
        </div>

        {post.responses.length > 0 && (
          <div className="mb-4">
            <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Responses</h3>
            {post.responses.map((r) => (
              <ResponseBubble key={r.id} r={r} />
            ))}
          </div>
        )}

        {/* Empathy guide */}
        <div className="mb-3">
          <p className="font-body text-[11px] text-muted-foreground italic mb-2">
            💛 Respond with empathy. Listen before advising.
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {empathyStarters.map((s) => (
              <button
                key={s}
                onClick={() => { setReplyText(s + " "); setReplyModResult(null); }}
                className="font-body text-[11px] px-3 py-1.5 rounded-full"
                style={{ background: "hsl(var(--primary) / 0.08)", color: "hsl(var(--primary))" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Reply moderation */}
        <AnimatePresence>
          {replyModResult && (
            <ModerationBanner result={replyModResult} onDismiss={() => setReplyModResult(null)} />
          )}
        </AnimatePresence>

        {/* Reply input */}
        <div className="flex gap-2 mb-6">
          <textarea
            value={replyText}
            onChange={(e) => handleReplyChange(e.target.value)}
            placeholder="Write your response…"
            rows={2}
            className="glass-input resize-none flex-1"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={replyText.trim().length < 5 || (replyModResult?.isCrisis ?? false)}
            className="px-4 rounded-xl font-body text-xs font-medium self-end disabled:opacity-40"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", height: 40 }}
          >
            Send
          </motion.button>
        </div>

        {/* Reflection loop */}
        <AnimatePresence>
          {showReflection && !reflected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card p-5 mb-4"
            >
              <h3 className="font-display text-base text-foreground font-semibold mb-2">How do you feel now?</h3>
              <div className="flex gap-2 flex-wrap mb-3">
                {reflectionOptions.map((r) => (
                  <motion.button
                    key={r.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReflect(r.label)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
                  >
                    {r.emoji} {r.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {reflected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 mb-4 text-center"
            >
              <p className="font-body text-sm text-foreground mb-3">Thank you for reflecting 🌿</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onClose(); navigate("/chat"); }}
                  className="font-body text-xs px-4 py-2 rounded-full"
                  style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
                >
                  Talk to Nirvaha
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onClose(); navigate("/journal"); }}
                  className="font-body text-xs px-4 py-2 rounded-full"
                  style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--accent))" }}
                >
                  Write a journal
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ═══════════════ MAIN PAGE ═══════════════ */
const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityPost[]>(samplePosts);
  const [showCreate, setShowCreate] = useState(false);
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInsights, setShowInsights] = useState(false);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const { isPostSaved, savePost, unsavePost } = useSavedPosts();

  const handleNewPost = useCallback((post: CommunityPost) => {
    setPosts((prev) => [post, ...prev]);
    setSparkleOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setSparkleTrigger((t) => t + 1);
  }, []);

  const filteredPosts = posts.filter((p) => {
    if (filterEmotion && p.emotion !== filterEmotion) return false;
    if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex flex-col relative"
    >
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 240, height: 240, top: "3%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, bottom: "20%", left: "-8%", background: "hsl(var(--sage))", animationDelay: "3s" }}
      />

      {/* Header */}
      <div className="px-5 pt-12 pb-2 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <h1 className="font-display text-lg text-foreground font-semibold">Nirvaha Space</h1>
            </div>
            <p className="font-body text-[10px] text-muted-foreground">A space to be heard — anonymously</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowInsights(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"
          >
            <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search expressions…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input pl-9 py-2.5 text-xs"
          />
        </div>

        {/* Emotion filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          <button
            onClick={() => setFilterEmotion(null)}
            className={`font-body text-[11px] px-3 py-1.5 rounded-full flex-shrink-0 transition-all ${!filterEmotion ? "font-semibold" : ""}`}
            style={
              !filterEmotion
                ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
            }
          >
            All
          </button>
          {emotions.map((em) => (
            <button
              key={em.label}
              onClick={() => setFilterEmotion(em.label === filterEmotion ? null : em.label)}
              className="font-body text-[11px] px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-1 transition-all"
              style={
                filterEmotion === em.label
                  ? { background: `hsl(${em.color} / 0.2)`, color: `hsl(${em.color})`, fontWeight: 600 }
                  : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
              }
            >
              {em.emoji} {em.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-sm text-muted-foreground">No expressions yet in this space.</p>
            <p className="font-body text-xs text-muted-foreground mt-1">Be the first to share 🌿</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpen={setActivePost}
              isSaved={isPostSaved(post.id)}
              onToggleSave={() =>
                isPostSaved(post.id)
                  ? unsavePost(post.id)
                  : savePost(post.id, post.emotion, post.intent)
              }
            />
          ))
        )}
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCreate(true)}
        className="fixed bottom-8 right-5 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))",
          boxShadow: "0 8px 24px hsl(var(--healing-green) / 0.35)",
        }}
      >
        <Plus size={24} className="text-primary-foreground" />
      </motion.button>

      {/* Overlays */}
      <AnimatePresence>
        {showCreate && <CreateFlow onClose={() => setShowCreate(false)} onPost={handleNewPost} />}
      </AnimatePresence>
      <AnimatePresence>
        {activePost && <PostDetail post={activePost} onClose={() => setActivePost(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showInsights && <InsightsPanel onClose={() => setShowInsights(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Community;
