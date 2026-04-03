import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Shield, Search, BadgeCheck, Bookmark, BookmarkCheck,
  AlertTriangle, Heart, Sparkles, Bell, Edit3, Trash2, CornerDownRight,
  Hash, Users, X, Check, MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import {
  emotions, intents, empathyStarters, reflectionOptions, samplePosts,
  communityTopics, getTimeAgo,
  type CommunityPost, type CommunityResponse,
} from "@/data/communityData";
import { moderateContent, getSaferPhrasing, type ModerationResult } from "@/hooks/use-content-moderation";
import { useSavedPosts } from "@/hooks/use-saved-posts";
import { useNotifications, useFollowedTopics } from "@/hooks/use-notifications";

/* ─── Helpers ─── */
const randomAura = () => {
  const colors = emotions.map((e) => e.color);
  return colors[Math.floor(Math.random() * colors.length)];
};

/* ═══════════════ RESPONSE BUBBLE (with threads, edit, delete) ═══════════════ */
const ResponseBubble = ({
  r,
  onDelete,
  onEdit,
  onReplyToResponse,
  depth = 0,
}: {
  r: CommunityResponse;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onReplyToResponse: (parentId: string) => void;
  depth?: number;
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(r.content);

  return (
    <div style={{ marginLeft: depth > 0 ? 20 : 0 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 mb-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0"
            style={{ background: `hsl(${r.auraColor})`, boxShadow: `0 0 8px hsl(${r.auraColor} / 0.3)` }}
          />
          {r.isVerified ? (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <BadgeCheck size={12} style={{ color: "hsl(var(--primary))" }} />
              <span className="font-body text-xs font-semibold text-foreground">{r.verifiedName}</span>
              <span className="font-body text-[10px] text-muted-foreground">• {r.verifiedRole}</span>
            </div>
          ) : (
            <span className="font-body text-[10px] text-muted-foreground flex-1">Anonymous</span>
          )}
          <span className="font-body text-[10px] text-muted-foreground">{getTimeAgo(r.timestamp)}</span>
          {r.edited && <span className="font-body text-[9px] text-muted-foreground italic">(edited)</span>}
        </div>

        {editing ? (
          <div className="space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="glass-input resize-none text-sm"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { onEdit(r.id, editText); setEditing(false); }}
                className="flex items-center gap-1 font-body text-[10px] px-3 py-1.5 rounded-full"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
              >
                <Check size={10} /> Save
              </button>
              <button
                onClick={() => { setEditText(r.content); setEditing(false); }}
                className="font-body text-[10px] text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="font-body text-sm text-foreground leading-relaxed">{r.content}</p>
        )}

        {/* Action row */}
        <div className="flex items-center gap-3 mt-2 pt-2" style={{ borderTop: "1px solid hsl(var(--border) / 0.2)" }}>
          <button
            onClick={() => onReplyToResponse(r.id)}
            className="flex items-center gap-1 font-body text-[10px] text-muted-foreground"
          >
            <CornerDownRight size={10} /> Reply
          </button>
          {r.isOwn && (
            <>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 font-body text-[10px] text-muted-foreground"
              >
                <Edit3 size={10} /> Edit
              </button>
              <button
                onClick={() => onDelete(r.id)}
                className="flex items-center gap-1 font-body text-[10px] text-muted-foreground"
              >
                <Trash2 size={10} /> Delete
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Threaded replies */}
      {r.replies?.map((child) => (
        <ResponseBubble
          key={child.id}
          r={child}
          onDelete={onDelete}
          onEdit={onEdit}
          onReplyToResponse={onReplyToResponse}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

/* ═══════════════ POST CARD ═══════════════ */
const PostCard = ({
  post, onOpen, isSaved, onToggleSave, onEdit, onDelete,
}: {
  post: CommunityPost;
  onOpen: (p: CommunityPost) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const emotionData = emotions.find((e) => e.label === post.emotion);
  const totalReplies = post.responses.reduce((sum, r) => sum + 1 + (r.replies?.length || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-5 w-full mb-4"
    >
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
              style={{ background: `hsl(${post.auraColor} / 0.15)`, color: `hsl(${post.auraColor})` }}
            >
              {post.emotion}
            </span>
            <span className="font-body text-[10px] text-muted-foreground">•</span>
            <span className="font-body text-[10px] text-muted-foreground">{post.energyState}</span>
            {post.edited && <span className="font-body text-[9px] text-muted-foreground italic">(edited)</span>}
          </div>
        </div>
        {post.isOwn && (
          <div className="flex items-center gap-1">
            <motion.button whileTap={{ scale: 0.85 }} onClick={(e) => { e.stopPropagation(); onEdit(post.id); }} className="p-1">
              <Edit3 size={13} className="text-muted-foreground" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} onClick={(e) => { e.stopPropagation(); onDelete(post.id); }} className="p-1">
              <Trash2 size={13} className="text-muted-foreground" />
            </motion.button>
          </div>
        )}
        <motion.button whileTap={{ scale: 0.85 }} onClick={(e) => { e.stopPropagation(); onToggleSave(); }} className="p-1.5">
          {isSaved ? <BookmarkCheck size={16} style={{ color: "hsl(var(--primary))" }} /> : <Bookmark size={16} className="text-muted-foreground" />}
        </motion.button>
        <span className="font-body text-[10px] text-muted-foreground flex-shrink-0">{getTimeAgo(post.timestamp)}</span>
      </div>

      <button onClick={() => onOpen(post)} className="w-full text-left">
        <p className="font-body text-sm text-foreground leading-relaxed line-clamp-3 mb-3">{post.content}</p>
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] text-muted-foreground italic">"{post.intent}"</span>
          <span className="font-body text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
            Respond
          </span>
        </div>
        {totalReplies > 0 && (
          <div className="mt-3 pt-3 flex items-center gap-1.5" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
            <MessageCircle size={12} className="text-muted-foreground" />
            <span className="font-body text-[10px] text-muted-foreground">
              {totalReplies} {totalReplies === 1 ? "response" : "responses"}
            </span>
          </div>
        )}
      </button>
    </motion.div>
  );
};

/* ═══════════════ MODERATION BANNER ═══════════════ */
const ModerationBanner = ({ result, onDismiss }: { result: ModerationResult; onDismiss: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
    className="rounded-xl p-4 mb-3"
    style={{
      background: result.isCrisis
        ? "linear-gradient(135deg, hsl(0 60% 50% / 0.15), hsl(0 60% 50% / 0.05))"
        : "linear-gradient(135deg, hsl(42 80% 55% / 0.15), hsl(42 80% 55% / 0.05))",
      border: `1px solid ${result.isCrisis ? "hsl(0 60% 50% / 0.2)" : "hsl(42 80% 55% / 0.2)"}`,
    }}
  >
    <div className="flex items-start gap-2.5">
      {result.isCrisis ? <Heart size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(0 60% 50%)" }} /> : <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(42 80% 55%)" }} />}
      <div className="flex-1">
        {result.isCrisis ? (
          <>
            <p className="font-body text-sm font-semibold text-foreground mb-1">We care about you 💛</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed whitespace-pre-line mb-2">{result.crisisResources}</p>
          </>
        ) : (
          <>
            {result.warnings.map((w, i) => <p key={i} className="font-body text-xs text-foreground mb-1">{w}</p>)}
            {result.suggestions.map((s, i) => <p key={i} className="font-body text-[11px] text-muted-foreground italic">{s}</p>)}
          </>
        )}
        {!result.isCrisis && <button onClick={onDismiss} className="font-body text-[10px] text-muted-foreground underline mt-1">Dismiss</button>}
      </div>
    </div>
  </motion.div>
);

/* ═══════════════ INSIGHTS PANEL ═══════════════ */
const InsightsPanel = ({ onClose }: { onClose: () => void }) => {
  const { savedPosts, getInsights } = useSavedPosts();
  const insights = getInsights();
  const emotionCounts: Record<string, number> = {};
  savedPosts.forEach((p) => { emotionCounts[p.emotion] = (emotionCounts[p.emotion] || 0) + 1; });
  const total = savedPosts.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div>
          <h1 className="font-display text-lg text-foreground font-semibold">Your Emotional Journey</h1>
          <p className="font-body text-[10px] text-muted-foreground">{savedPosts.length} saved expressions</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {total > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 mb-4">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">Emotional Themes</h3>
            <div className="space-y-2.5">
              {Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]).map(([emotion, count]) => {
                const em = emotions.find((e) => e.label === emotion);
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={emotion}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-xs text-foreground">{em?.emoji} {emotion}</span>
                      <span className="font-body text-[10px] text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "hsl(var(--muted))" }}>
                      <motion.div className="h-1.5 rounded-full" style={{ background: `hsl(${em?.color || "152 35% 45%"})` }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: 0.2 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        {insights.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-1.5"><Sparkles size={14} style={{ color: "hsl(var(--gold))" }} /> Insights</h3>
            {insights.map((insight, i) => (
              <motion.div key={insight.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-1.5"><span className="text-base">{insight.emoji}</span><span className="font-body text-xs font-semibold text-foreground">{insight.label}</span></div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12"><p className="font-body text-sm text-muted-foreground">Save more expressions to unlock insights 🌿</p></div>
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════ NOTIFICATIONS PANEL ═══════════════ */
const NotificationsPanel = ({ onClose, onOpenPost }: { onClose: () => void; onOpenPost: (postId: string) => void }) => {
  const { notifications, markRead, markAllRead, clearAll } = useNotifications();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div className="flex-1">
          <h1 className="font-display text-lg text-foreground font-semibold">Notifications</h1>
          <p className="font-body text-[10px] text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="font-body text-[10px] px-3 py-1.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>Read all</button>
          <button onClick={clearAll} className="font-body text-[10px] text-muted-foreground">Clear</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={32} className="mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="font-body text-sm text-muted-foreground">No notifications yet</p>
            <p className="font-body text-[10px] text-muted-foreground mt-1">Interact with posts to receive updates</p>
          </div>
        ) : (
          notifications.map((n) => (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => { markRead(n.id); if (n.postId) onOpenPost(n.postId); }}
              className={`glass-card p-4 mb-3 w-full text-left transition-all ${!n.read ? "ring-1" : "opacity-70"}`}
              style={!n.read ? { borderColor: "hsl(var(--primary) / 0.3)" } : {}}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: "hsl(var(--primary) / 0.1)" }}
                >
                  {n.type === "reply" ? "💬" : n.type === "suggestion" ? "✨" : n.type === "reminder" ? "🌿" : "📌"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs font-semibold text-foreground">{n.title}</p>
                  <p className="font-body text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{n.body}</p>
                  <p className="font-body text-[9px] text-muted-foreground mt-1">{getTimeAgo(new Date(n.timestamp))}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: "hsl(var(--primary))" }} />}
              </div>
            </motion.button>
          ))
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════ TOPICS PANEL ═══════════════ */
const TopicsPanel = ({ onClose }: { onClose: () => void }) => {
  const { topics, followTopic, unfollowTopic, isFollowing } = useFollowedTopics();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div>
          <h1 className="font-display text-lg text-foreground font-semibold">Follow Topics</h1>
          <p className="font-body text-[10px] text-muted-foreground">Follow topics, not people</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p className="font-body text-xs text-muted-foreground mb-4">Get notified when new expressions match your interests.</p>
        <div className="space-y-3">
          {communityTopics.map((topic) => {
            const following = isFollowing(topic.label);
            return (
              <motion.button
                key={topic.label} whileTap={{ scale: 0.97 }}
                onClick={() => following ? unfollowTopic(topic.label) : followTopic(topic.label)}
                className={`glass-card p-4 w-full flex items-center gap-3 transition-all ${following ? "ring-1" : ""}`}
                style={following ? { borderColor: "hsl(var(--primary) / 0.4)" } : {}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "hsl(var(--muted))" }}>{topic.emoji}</div>
                <span className="font-body text-sm font-medium text-foreground flex-1 text-left">{topic.label}</span>
                <span className="font-body text-[10px] px-3 py-1 rounded-full" style={following ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  {following ? "Following" : "Follow"}
                </span>
              </motion.button>
            );
          })}
        </div>
        {topics.length > 0 && (
          <p className="font-body text-[10px] text-muted-foreground text-center mt-6">Following {topics.length} topic{topics.length > 1 ? "s" : ""}</p>
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════ SMALL GROUP CIRCLES ═══════════════ */
interface Circle {
  id: string;
  name: string;
  emotion: string;
  members: number;
  maxMembers: number;
  topic: string;
  messages: Array<{ id: string; content: string; auraColor: string; timestamp: Date }>;
  expiresAt: Date;
}

const sampleCircles: Circle[] = [
  {
    id: "c1", name: "Gentle Mornings", emotion: "Calm", members: 3, maxMembers: 5,
    topic: "Morning routines for peace",
    messages: [
      { id: "cm1", content: "I've started waking up 10 minutes earlier just to sit in silence. It changes everything.", auraColor: "152 35% 45%", timestamp: new Date(Date.now() - 1000 * 60 * 15) },
      { id: "cm2", content: "Same here! No phone for the first 20 minutes has been transformative.", auraColor: "45 70% 60%", timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    ],
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: "c2", name: "Navigating Anxiety", emotion: "Anxious", members: 4, maxMembers: 5,
    topic: "Sharing what helps with daily anxiety",
    messages: [
      { id: "cm3", content: "Has anyone tried the 5-4-3-2-1 grounding technique? It's been helping me.", auraColor: "42 60% 55%", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    ],
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
  },
  {
    id: "c3", name: "Finding Purpose", emotion: "Exploring", members: 2, maxMembers: 5,
    topic: "Exploring what matters most",
    messages: [],
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 36),
  },
];

const CirclesPanel = ({ onClose }: { onClose: () => void }) => {
  const [circles] = useState<Circle[]>(sampleCircles);
  const [activeCircle, setActiveCircle] = useState<Circle | null>(null);
  const [circleMsg, setCircleMsg] = useState("");

  const getTimeRemaining = (date: Date) => {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `${hours}h remaining`;
    const mins = Math.floor(diff / (1000 * 60));
    return `${mins}m remaining`;
  };

  if (activeCircle) {
    const em = emotions.find((e) => e.label === activeCircle.emotion);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
        <div className="ambient-orb animate-pulse-soft" style={{ width: 160, height: 160, top: "5%", right: "-8%", background: `hsl(${em?.color || "152 35% 45%"})` }} />
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveCircle(null)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
          <div className="flex-1">
            <h1 className="font-display text-base text-foreground font-semibold">{activeCircle.name}</h1>
            <p className="font-body text-[10px] text-muted-foreground">{activeCircle.members}/{activeCircle.maxMembers} members • {getTimeRemaining(activeCircle.expiresAt)}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="glass-card p-4 mb-4">
            <p className="font-body text-xs text-muted-foreground">{activeCircle.topic}</p>
          </div>

          {activeCircle.messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-body text-sm text-muted-foreground">This circle is quiet.</p>
              <p className="font-body text-[10px] text-muted-foreground mt-1">Be the first to share 🌿</p>
            </div>
          ) : (
            activeCircle.messages.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${m.auraColor})` }} />
                  <span className="font-body text-[10px] text-muted-foreground">Anonymous</span>
                  <span className="ml-auto font-body text-[10px] text-muted-foreground">{getTimeAgo(m.timestamp)}</span>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{m.content}</p>
              </motion.div>
            ))
          )}
        </div>

        <div className="px-5 pb-6 pt-2">
          <div className="flex gap-2">
            <textarea
              value={circleMsg}
              onChange={(e) => setCircleMsg(e.target.value)}
              placeholder="Share with the circle…"
              rows={1}
              className="glass-input resize-none flex-1 text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (circleMsg.trim().length < 3) return;
                setActiveCircle({
                  ...activeCircle,
                  messages: [...activeCircle.messages, {
                    id: `cm-${Date.now()}`, content: circleMsg, auraColor: randomAura(), timestamp: new Date(),
                  }],
                });
                setCircleMsg("");
              }}
              disabled={circleMsg.trim().length < 3}
              className="px-4 rounded-xl font-body text-xs font-medium self-end disabled:opacity-40"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", height: 40 }}
            >
              Send
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div>
          <h1 className="font-display text-lg text-foreground font-semibold">Small Circles</h1>
          <p className="font-body text-[10px] text-muted-foreground">Temporary safe groups for deeper connection</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p className="font-body text-xs text-muted-foreground mb-4">Join a small, anonymous group (3-5 people) to share and support each other. Circles are temporary and expire after 24-48 hours.</p>

        <div className="space-y-3">
          {circles.map((circle) => {
            const em = emotions.find((e) => e.label === circle.emotion);
            return (
              <motion.button
                key={circle.id} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCircle(circle)}
                className="glass-card p-5 w-full text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: `linear-gradient(135deg, hsl(${em?.color || "152 35% 45%"} / 0.3), hsl(${em?.color || "152 35% 45%"} / 0.1))` }}
                  >
                    {em?.emoji || "🌿"}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-foreground">{circle.name}</p>
                    <p className="font-body text-[10px] text-muted-foreground">{circle.topic}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                      <Users size={10} /> {circle.members}/{circle.maxMembers}
                    </span>
                    <span className="font-body text-[10px] text-muted-foreground">{getTimeRemaining(circle.expiresAt)}</span>
                  </div>
                  <span className="font-body text-[10px] px-3 py-1 rounded-full"
                    style={circle.members < circle.maxMembers
                      ? { background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }
                      : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }
                    }
                  >
                    {circle.members < circle.maxMembers ? "Join" : "Full"}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════ CREATE FLOW ═══════════════ */
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
      setModResult(result.warnings.length > 0 || result.isCrisis || result.suggestions.length > 0 ? result : null);
    } else { setModResult(null); }
  };

  const handleSubmit = () => {
    const finalCheck = moderateContent(text);
    if (!finalCheck.isAllowed) { setModResult(finalCheck); return; }
    const emotionData = emotions.find((em) => em.label === emotion);
    onPost({
      id: `user-${Date.now()}`, emotion, intent, content: text,
      auraColor: emotionData?.color || "152 35% 45%", energyState: "Opening up",
      timestamp: new Date(), responses: [], isOwn: true,
    });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div className="flex-1">
          <h1 className="font-display text-lg text-foreground font-semibold">Express Yourself</h1>
          <p className="font-body text-[10px] text-muted-foreground">Step {step + 1} of 3</p>
        </div>
      </div>
      <div className="px-5 mb-6">
        <div className="h-1 rounded-full" style={{ background: "hsl(var(--muted))" }}>
          <motion.div className="h-1 rounded-full" style={{ background: "hsl(var(--primary))" }} animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.4 }} />
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
                  <motion.button key={em.label} whileTap={{ scale: 0.95 }} onClick={(e) => { triggerSparkle(e); setEmotion(em.label); setTimeout(() => setStep(1), 300); }}
                    className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${emotion === em.label ? "ring-2" : ""}`}
                    style={emotion === em.label ? { borderColor: `hsl(${em.color})`, boxShadow: `0 0 0 2px hsl(${em.color} / 0.3)` } : {}}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, hsl(${em.color} / 0.3), hsl(${em.color} / 0.1))`, boxShadow: `0 0 16px hsl(${em.color} / 0.2)` }}>{em.emoji}</div>
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
                  <motion.button key={it.label} whileTap={{ scale: 0.97 }} onClick={(e) => { triggerSparkle(e); setIntent(it.label); setTimeout(() => setStep(2), 300); }} className="glass-card p-4 flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.1)" }}>{it.emoji}</div>
                    <div><p className="font-body text-sm font-semibold text-foreground">{it.label}</p><p className="font-body text-[11px] text-muted-foreground">{it.description}</p></div>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-4 font-body text-xs text-muted-foreground underline">← Back</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-display text-xl text-foreground font-semibold mb-2">Say what's on your mind…</h2>
              <p className="font-body text-xs text-muted-foreground mb-1">Your identity stays hidden. Only your aura and emotion are visible.</p>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${emotions.find((e) => e.label === emotion)?.color || "152 35% 45%"})`, boxShadow: `0 0 8px hsl(${emotions.find((e) => e.label === emotion)?.color || "152 35% 45%"} / 0.4)` }} />
                <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{emotion} • {intent}</span>
              </div>
              <textarea value={text} onChange={(e) => handleTextChange(e.target.value)} placeholder="Write freely. This is your safe space…" rows={6} className="glass-input resize-none mb-2" style={{ minHeight: 140 }} />
              <AnimatePresence>{saferTip && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="font-body text-[11px] text-muted-foreground mb-2">{saferTip}</motion.p>}</AnimatePresence>
              <AnimatePresence>{modResult && <ModerationBanner result={modResult} onDismiss={() => setModResult(null)} />}</AnimatePresence>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={text.trim().length < 10 || (modResult?.isCrisis ?? false)} className="btn-primary disabled:opacity-40 mt-2">Share Anonymously</motion.button>
              <button onClick={() => setStep(1)} className="mt-3 w-full font-body text-xs text-muted-foreground underline">← Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ═══════════════ POST DETAIL (threaded, edit/delete, reply-to-reply) ═══════════════ */
const PostDetail = ({
  post, onClose, onUpdatePost,
}: {
  post: CommunityPost;
  onClose: () => void;
  onUpdatePost: (updated: CommunityPost) => void;
}) => {
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState<string | null>(null); // null = top-level, id = threaded
  const [showReflection, setShowReflection] = useState(false);
  const [reflected, setReflected] = useState(false);
  const [replyModResult, setReplyModResult] = useState<ModerationResult | null>(null);
  const [editingPost, setEditingPost] = useState(false);
  const [editPostText, setEditPostText] = useState(post.content);
  const navigate = useNavigate();
  const { isPostSaved, savePost, unsavePost } = useSavedPosts();
  const { addNotification } = useNotifications();
  const emotionData = emotions.find((e) => e.label === post.emotion);
  const saved = isPostSaved(post.id);

  const handleReplyChange = (val: string) => {
    setReplyText(val);
    if (val.length > 10) {
      const result = moderateContent(val);
      setReplyModResult(result.warnings.length > 0 || result.suggestions.length > 0 || result.isCrisis ? result : null);
    } else { setReplyModResult(null); }
  };

  const handleSend = () => {
    const check = moderateContent(replyText);
    if (!check.isAllowed) { setReplyModResult(check); return; }

    const newReply: CommunityResponse = {
      id: `reply-${Date.now()}`, content: replyText, auraColor: randomAura(),
      isVerified: false, timestamp: new Date(), isOwn: true, parentId: replyTarget || undefined,
    };

    let updatedResponses: CommunityResponse[];
    if (replyTarget) {
      // Threaded reply
      updatedResponses = post.responses.map((r) => {
        if (r.id === replyTarget) return { ...r, replies: [...(r.replies || []), newReply] };
        // Check nested
        if (r.replies?.some((rr) => rr.id === replyTarget)) {
          return { ...r, replies: r.replies.map((rr) => rr.id === replyTarget ? { ...rr, replies: [...(rr.replies || []), newReply] } : rr) };
        }
        return r;
      });
    } else {
      updatedResponses = [...post.responses, newReply];
    }

    onUpdatePost({ ...post, responses: updatedResponses });
    addNotification({ type: "reply", title: "New response", body: `Someone responded with empathy to a ${post.emotion.toLowerCase()} expression`, postId: post.id });
    setReplyText(""); setReplyModResult(null); setReplyTarget(null); setShowReflection(true);
  };

  const handleDeleteResponse = (id: string) => {
    const filterReplies = (responses: CommunityResponse[]): CommunityResponse[] =>
      responses.filter((r) => r.id !== id).map((r) => ({ ...r, replies: r.replies ? filterReplies(r.replies) : undefined }));
    onUpdatePost({ ...post, responses: filterReplies(post.responses) });
  };

  const handleEditResponse = (id: string, newContent: string) => {
    const editReplies = (responses: CommunityResponse[]): CommunityResponse[] =>
      responses.map((r) => r.id === id ? { ...r, content: newContent, edited: true } : { ...r, replies: r.replies ? editReplies(r.replies) : undefined });
    onUpdatePost({ ...post, responses: editReplies(post.responses) });
  };

  const handleEditPost = () => {
    if (editPostText.trim().length < 10) return;
    onUpdatePost({ ...post, content: editPostText, edited: true });
    setEditingPost(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="ambient-orb animate-pulse-soft" style={{ width: 180, height: 180, top: "5%", right: "-8%", background: `hsl(${post.auraColor})` }} />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: `hsl(${post.auraColor})`, boxShadow: `0 0 10px hsl(${post.auraColor} / 0.3)` }}>{emotionData?.emoji}</div>
          <div>
            <span className="font-body text-xs font-semibold text-foreground">{post.emotion}</span>
            <span className="font-body text-[10px] text-muted-foreground ml-1.5">• {post.energyState}</span>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => saved ? unsavePost(post.id) : savePost(post.id, post.emotion, post.intent)} className="p-2">
          {saved ? <BookmarkCheck size={18} style={{ color: "hsl(var(--primary))" }} /> : <Bookmark size={18} className="text-muted-foreground" />}
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Post content (editable) */}
        <div className="glass-card p-5 mb-4">
          {editingPost ? (
            <div className="space-y-2">
              <textarea value={editPostText} onChange={(e) => setEditPostText(e.target.value)} className="glass-input resize-none text-sm" rows={4} />
              <div className="flex gap-2">
                <button onClick={handleEditPost} className="flex items-center gap-1 font-body text-[10px] px-3 py-1.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}><Check size={10} /> Save</button>
                <button onClick={() => { setEditPostText(post.content); setEditingPost(false); }} className="font-body text-[10px] text-muted-foreground">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-body text-sm text-foreground leading-relaxed mb-3">{post.content}</p>
              <div className="flex items-center gap-2">
                <span className="font-body text-[10px] text-muted-foreground italic">"{post.intent}"</span>
                {post.edited && <span className="font-body text-[9px] text-muted-foreground italic">(edited)</span>}
                <span className="ml-auto font-body text-[10px] text-muted-foreground">{getTimeAgo(post.timestamp)}</span>
              </div>
              {post.isOwn && (
                <div className="flex gap-3 mt-3 pt-3" style={{ borderTop: "1px solid hsl(var(--border) / 0.2)" }}>
                  <button onClick={() => setEditingPost(true)} className="flex items-center gap-1 font-body text-[10px] text-muted-foreground"><Edit3 size={10} /> Edit</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Responses (threaded) */}
        {post.responses.length > 0 && (
          <div className="mb-4">
            <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Responses</h3>
            {post.responses.map((r) => (
              <ResponseBubble key={r.id} r={r} onDelete={handleDeleteResponse} onEdit={handleEditResponse} onReplyToResponse={(parentId) => setReplyTarget(parentId)} />
            ))}
          </div>
        )}

        {/* Empathy guide */}
        <div className="mb-3">
          <p className="font-body text-[11px] text-muted-foreground italic mb-2">💛 Respond with empathy. Listen before advising.</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {empathyStarters.map((s) => (
              <button key={s} onClick={() => { setReplyText(s + " "); setReplyModResult(null); }} className="font-body text-[11px] px-3 py-1.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.08)", color: "hsl(var(--primary))" }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Reply target indicator */}
        {replyTarget && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-2 mb-2 px-2">
            <CornerDownRight size={12} className="text-primary" />
            <span className="font-body text-[10px] text-primary">Replying to a response</span>
            <button onClick={() => setReplyTarget(null)} className="ml-auto"><X size={12} className="text-muted-foreground" /></button>
          </motion.div>
        )}

        <AnimatePresence>{replyModResult && <ModerationBanner result={replyModResult} onDismiss={() => setReplyModResult(null)} />}</AnimatePresence>

        <div className="flex gap-2 mb-6">
          <textarea value={replyText} onChange={(e) => handleReplyChange(e.target.value)} placeholder={replyTarget ? "Reply to this response…" : "Write your response…"} rows={2} className="glass-input resize-none flex-1" />
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSend} disabled={replyText.trim().length < 5 || (replyModResult?.isCrisis ?? false)} className="px-4 rounded-xl font-body text-xs font-medium self-end disabled:opacity-40" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", height: 40 }}>Send</motion.button>
        </div>

        {/* Reflection loop */}
        <AnimatePresence>
          {showReflection && !reflected && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-5 mb-4">
              <h3 className="font-display text-base text-foreground font-semibold mb-2">How do you feel now?</h3>
              <div className="flex gap-2 flex-wrap mb-3">
                {reflectionOptions.map((r) => (
                  <motion.button key={r.label} whileTap={{ scale: 0.95 }} onClick={() => setReflected(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs" style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>{r.emoji} {r.label}</motion.button>
                ))}
              </div>
            </motion.div>
          )}
          {reflected && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 mb-4 text-center">
              <p className="font-body text-sm text-foreground mb-3">Thank you for reflecting 🌿</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onClose(); navigate("/chat"); }} className="font-body text-xs px-4 py-2 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>Talk to Nirvaha</motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onClose(); navigate("/journal"); }} className="font-body text-xs px-4 py-2 rounded-full" style={{ background: "hsl(var(--gold) / 0.15)", color: "hsl(var(--accent))" }}>Write a journal</motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ═══════════════ EDIT POST MODAL ═══════════════ */
const EditPostModal = ({ post, onClose, onSave }: { post: CommunityPost; onClose: () => void; onSave: (id: string, content: string) => void }) => {
  const [text, setText] = useState(post.content);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-5" style={{ background: "hsla(0 0% 0% / 0.5)" }}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-5 w-full max-w-sm">
        <h3 className="font-display text-base text-foreground font-semibold mb-3">Edit Expression</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="glass-input resize-none mb-3 text-sm" rows={4} />
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { if (text.trim().length >= 10) onSave(post.id, text); }} disabled={text.trim().length < 10} className="flex-1 py-2.5 rounded-xl font-body text-xs font-medium disabled:opacity-40" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Save</motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="px-4 py-2.5 rounded-xl font-body text-xs text-muted-foreground" style={{ background: "hsl(var(--muted))" }}>Cancel</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════ MAIN PAGE ═══════════════ */
const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityPost[]>(samplePosts);
  const [showCreate, setShowCreate] = useState(false);
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInsights, setShowInsights] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const { isPostSaved, savePost, unsavePost } = useSavedPosts();
  const { unreadCount } = useNotifications();

  const handleNewPost = useCallback((post: CommunityPost) => {
    setPosts((prev) => [post, ...prev]);
    setSparkleOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setSparkleTrigger((t) => t + 1);
  }, []);

  const handleDeletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleEditPost = useCallback((id: string, newContent: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, content: newContent, edited: true } : p));
    setEditingPostId(null);
  }, []);

  const handleUpdatePost = useCallback((updated: CommunityPost) => {
    setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    setActivePost(updated);
  }, []);

  const handleOpenPostById = useCallback((postId: string) => {
    const found = posts.find((p) => p.id === postId);
    if (found) { setActivePost(found); setShowNotifications(false); }
  }, [posts]);

  const filteredPosts = posts.filter((p) => {
    if (filterEmotion && p.emotion !== filterEmotion) return false;
    if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const editingPost = editingPostId ? posts.find((p) => p.id === editingPostId) : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col relative">
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 240, height: 240, top: "3%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 180, height: 180, bottom: "20%", left: "-8%", background: "hsl(var(--sage))", animationDelay: "3s" }} />

      {/* Header */}
      <div className="px-5 pt-12 pb-2 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card"><ArrowLeft size={18} className="text-foreground" /></motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /><h1 className="font-display text-lg text-foreground font-semibold">Nirvaha Space</h1></div>
            <p className="font-body text-[10px] text-muted-foreground">A space to be heard — anonymously</p>
          </div>
          <div className="flex gap-1.5">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCircles(true)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
              <Users size={15} className="text-muted-foreground" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowTopics(true)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
              <Hash size={15} className="text-muted-foreground" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotifications(true)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card relative">
              <Bell size={15} className="text-muted-foreground" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>{unreadCount > 9 ? "9+" : unreadCount}</div>
              )}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowInsights(true)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
              <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search expressions…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="glass-input pl-9 py-2.5 text-xs" />
        </div>

        {/* Emotion filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          <button onClick={() => setFilterEmotion(null)} className={`font-body text-[11px] px-3 py-1.5 rounded-full flex-shrink-0 transition-all ${!filterEmotion ? "font-semibold" : ""}`}
            style={!filterEmotion ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>All</button>
          {emotions.map((em) => (
            <button key={em.label} onClick={() => setFilterEmotion(em.label === filterEmotion ? null : em.label)}
              className="font-body text-[11px] px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-1 transition-all"
              style={filterEmotion === em.label ? { background: `hsl(${em.color} / 0.2)`, color: `hsl(${em.color})`, fontWeight: 600 } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
            >{em.emoji} {em.label}</button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16"><p className="font-body text-sm text-muted-foreground">No expressions yet in this space.</p><p className="font-body text-xs text-muted-foreground mt-1">Be the first to share 🌿</p></div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onOpen={setActivePost}
              isSaved={isPostSaved(post.id)}
              onToggleSave={() => isPostSaved(post.id) ? unsavePost(post.id) : savePost(post.id, post.emotion, post.intent)}
              onEdit={setEditingPostId} onDelete={handleDeletePost}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCreate(true)}
        className="fixed bottom-8 right-5 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green-light)))", boxShadow: "0 8px 24px hsl(var(--healing-green) / 0.35)" }}>
        <Plus size={24} className="text-primary-foreground" />
      </motion.button>

      {/* Overlays */}
      <AnimatePresence>{showCreate && <CreateFlow onClose={() => setShowCreate(false)} onPost={handleNewPost} />}</AnimatePresence>
      <AnimatePresence>{activePost && <PostDetail post={activePost} onClose={() => setActivePost(null)} onUpdatePost={handleUpdatePost} />}</AnimatePresence>
      <AnimatePresence>{showInsights && <InsightsPanel onClose={() => setShowInsights(false)} />}</AnimatePresence>
      <AnimatePresence>{showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} onOpenPost={handleOpenPostById} />}</AnimatePresence>
      <AnimatePresence>{showTopics && <TopicsPanel onClose={() => setShowTopics(false)} />}</AnimatePresence>
      <AnimatePresence>{showCircles && <CirclesPanel onClose={() => setShowCircles(false)} />}</AnimatePresence>
      <AnimatePresence>{editingPost && <EditPostModal post={editingPost} onClose={() => setEditingPostId(null)} onSave={handleEditPost} />}</AnimatePresence>
    </motion.div>
  );
};

export default Community;
