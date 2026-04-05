import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Shield, Search, Bell, Sparkles,
  Hash, Users, X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleEffect from "@/components/onboarding/SparkleEffect";
import { emotions, communityTopics, getTimeAgo } from "@/data/communityData";
import { samplePosts } from "@/data/samplePosts";
import { useSavedPosts } from "@/hooks/use-saved-posts";
import { useNotifications, useFollowedTopics } from "@/hooks/use-notifications";
import type { CommunityPost, CommunityResponse, SortMode } from "@/components/community/types";
import TopicBar from "@/components/community/TopicBar";
import SortTabs from "@/components/community/SortTabs";
import PostCard from "@/components/community/PostCard";
import PostDetailView from "@/components/community/PostDetailView";
import CreatePostFlow from "@/components/community/CreatePostFlow";
import FABMenu from "@/components/community/FABMenu";

/* ─── Panels (Insights, Notifications, Topics, Circles) ─── */

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
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-5 mb-4" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}>
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
              <motion.div key={insight.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="rounded-2xl border p-4" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}>
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
          </div>
        ) : (
          notifications.map((n) => (
            <motion.button key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => { markRead(n.id); if (n.postId) onOpenPost(n.postId); }}
              className={`rounded-2xl border p-4 mb-3 w-full text-left transition-all ${!n.read ? "ring-1" : "opacity-70"}`}
              style={{ background: "hsl(var(--card))", borderColor: !n.read ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border) / 0.5)" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm" style={{ background: "hsl(var(--primary) / 0.1)" }}>
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
              <motion.button key={topic.label} whileTap={{ scale: 0.97 }}
                onClick={() => following ? unfollowTopic(topic.label) : followTopic(topic.label)}
                className={`rounded-2xl border p-4 w-full flex items-center gap-3 transition-all ${following ? "ring-1" : ""}`}
                style={{ background: "hsl(var(--card))", borderColor: following ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border) / 0.5)" }}
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
        {topics.length > 0 && <p className="font-body text-[10px] text-muted-foreground text-center mt-6">Following {topics.length} topic{topics.length > 1 ? "s" : ""}</p>}
      </div>
    </motion.div>
  );
};

/* ─── Circles Panel ─── */
interface Circle {
  id: string; name: string; emotion: string; members: number; maxMembers: number;
  topic: string; messages: Array<{ id: string; content: string; auraColor: string; timestamp: Date }>;
  expiresAt: Date;
}

const sampleCircles: Circle[] = [
  { id: "c1", name: "Gentle Mornings", emotion: "Calm", members: 3, maxMembers: 5, topic: "Morning routines for peace",
    messages: [
      { id: "cm1", content: "I've started waking up 10 minutes earlier just to sit in silence.", auraColor: "152 35% 45%", timestamp: new Date(Date.now() - 1000 * 60 * 15) },
      { id: "cm2", content: "No phone for the first 20 minutes has been transformative.", auraColor: "45 70% 60%", timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    ],
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  { id: "c2", name: "Navigating Anxiety", emotion: "Anxious", members: 4, maxMembers: 5, topic: "Sharing what helps with daily anxiety",
    messages: [{ id: "cm3", content: "Has anyone tried the 5-4-3-2-1 grounding technique?", auraColor: "42 60% 55%", timestamp: new Date(Date.now() - 1000 * 60 * 30) }],
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
  },
  { id: "c3", name: "Finding Purpose", emotion: "Exploring", members: 2, maxMembers: 5, topic: "Exploring what matters most", messages: [], expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 36) },
];

const CirclesPanel = ({ onClose }: { onClose: () => void }) => {
  const [circles] = useState<Circle[]>(sampleCircles);
  const [activeCircle, setActiveCircle] = useState<Circle | null>(null);
  const [circleMsg, setCircleMsg] = useState("");
  const randomAura = () => emotions[Math.floor(Math.random() * emotions.length)].color;

  const getTimeRemaining = (date: Date) => {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 0 ? `${hours}h remaining` : `${Math.floor(diff / (1000 * 60))}m remaining`;
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
          <div className="rounded-2xl border p-4 mb-4" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}>
            <p className="font-body text-xs text-muted-foreground">{activeCircle.topic}</p>
          </div>
          {activeCircle.messages.length === 0 ? (
            <div className="text-center py-8"><p className="font-body text-sm text-muted-foreground">This circle is quiet. Be the first to share 🌿</p></div>
          ) : (
            activeCircle.messages.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-4 mb-3" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}>
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
          <div className="flex gap-2 rounded-2xl border p-2" style={{ background: "hsl(var(--muted) / 0.3)", borderColor: "hsl(var(--border) / 0.5)" }}>
            <textarea value={circleMsg} onChange={(e) => setCircleMsg(e.target.value)} placeholder="Share with the circle…" rows={1} className="flex-1 bg-transparent resize-none text-sm font-body px-2 py-1 outline-none" style={{ color: "hsl(var(--foreground))" }} />
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => {
              if (circleMsg.trim().length < 3) return;
              setActiveCircle({ ...activeCircle, messages: [...activeCircle.messages, { id: `cm-${Date.now()}`, content: circleMsg, auraColor: randomAura(), timestamp: new Date() }] });
              setCircleMsg("");
            }} disabled={circleMsg.trim().length < 3} className="px-4 rounded-xl font-body text-xs font-medium self-end disabled:opacity-40" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", height: 36 }}>
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
        <p className="font-body text-xs text-muted-foreground mb-4">Join a small, anonymous group (3-5 people). Circles expire after 24-48 hours.</p>
        <div className="space-y-3">
          {circles.map((circle) => {
            const em = emotions.find((e) => e.label === circle.emotion);
            return (
              <motion.button key={circle.id} whileTap={{ scale: 0.97 }} onClick={() => setActiveCircle(circle)}
                className="rounded-2xl border p-5 w-full text-left" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, hsl(${em?.color || "152 35% 45%"} / 0.3), hsl(${em?.color || "152 35% 45%"} / 0.1))` }}>{em?.emoji || "🌿"}</div>
                  <div className="flex-1"><p className="font-body text-sm font-semibold text-foreground">{circle.name}</p><p className="font-body text-[10px] text-muted-foreground">{circle.topic}</p></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground"><Users size={10} /> {circle.members}/{circle.maxMembers}</span>
                    <span className="font-body text-[10px] text-muted-foreground">{getTimeRemaining(circle.expiresAt)}</span>
                  </div>
                  <span className="font-body text-[10px] px-3 py-1 rounded-full" style={circle.members < circle.maxMembers ? { background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
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

/* ─── Edit Post Modal ─── */
const EditPostModal = ({ post, onClose, onSave }: { post: CommunityPost; onClose: () => void; onSave: (id: string, content: string) => void }) => {
  const [text, setText] = useState(post.content);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-5" style={{ background: "hsla(0 0% 0% / 0.5)" }}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-2xl border p-5 w-full max-w-sm" style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border) / 0.5)" }}>
        <h3 className="font-display text-base text-foreground font-semibold mb-3">Edit Expression</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm resize-none font-body mb-3" style={{ background: "hsl(var(--muted) / 0.5)", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }} rows={4} />
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { if (text.trim().length >= 10) onSave(post.id, text); }} disabled={text.trim().length < 10} className="flex-1 py-2.5 rounded-xl font-body text-xs font-medium disabled:opacity-40" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>Save</motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="px-4 py-2.5 rounded-xl font-body text-xs text-muted-foreground" style={{ background: "hsl(var(--muted))" }}>Cancel</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════ MAIN COMMUNITY PAGE ═══════════════ */
const Community = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading(700);
  const [posts, setPosts] = useState<CommunityPost[]>(samplePosts);
  const [showCreate, setShowCreate] = useState(false);
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState("All");
  const [sortMode, setSortMode] = useState<SortMode>("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
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

  const handleDeletePost = useCallback((id: string) => setPosts((prev) => prev.filter((p) => p.id !== id)), []);
  const handleEditPost = useCallback((id: string, newContent: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, content: newContent, edited: true } : p));
    setEditingPostId(null);
  }, []);

  const handleUpdatePost = useCallback((updated: CommunityPost) => {
    setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    setActivePost(updated);
  }, []);

  const handleResonate = useCallback((id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, resonatedByUser: !p.resonatedByUser, resonances: p.resonatedByUser ? p.resonances - 1 : p.resonances + 1 } : p));
  }, []);

  const handleOpenPostById = useCallback((postId: string) => {
    const found = posts.find((p) => p.id === postId);
    if (found) { setActivePost(found); setShowNotifications(false); }
  }, [posts]);

  // Filter & sort
  const filteredPosts = posts
    .filter((p) => {
      if (activeTopic !== "All" && p.topicSpace !== activeTopic) return false;
      if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortMode === "new") return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortMode === "resonated") return b.resonances - a.resonances;
      // "seeking" — prioritize posts with fewer responses
      return a.responses.length - b.responses.length;
    });

  const editingPost = editingPostId ? posts.find((p) => p.id === editingPostId) : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col relative">
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 220, height: 220, top: "3%", right: "-10%", background: "hsl(var(--healing-green))" }} />

      {/* ─── Header ─── */}
      <div className="px-4 pt-12 pb-1 relative z-10">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              <h1 className="font-display text-lg text-foreground font-semibold">Nirvaha Space</h1>
            </div>
            <p className="font-body text-[10px] text-muted-foreground">Anonymous · Safe · Empathetic</p>
          </div>
          <div className="flex gap-0.5">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowSearch(!showSearch)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: showSearch ? "hsl(var(--primary) / 0.1)" : "transparent" }}>
              <Search size={16} className={showSearch ? "text-primary" : "text-muted-foreground"} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowCircles(true)} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-muted-foreground" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowTopics(true)} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Hash size={16} className="text-muted-foreground" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotifications(true)} className="w-8 h-8 rounded-lg flex items-center justify-center relative">
              <Bell size={16} className="text-muted-foreground" />
              {unreadCount > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>{unreadCount > 9 ? "9+" : unreadCount}</div>
              )}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowInsights(true)} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
            </motion.button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search expressions, emotions, topics…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border pl-9 pr-8 py-2.5 text-xs font-body outline-none"
                  style={{ background: "hsl(var(--muted) / 0.4)", borderColor: "hsl(var(--border) / 0.5)", color: "hsl(var(--foreground))" }}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={13} className="text-muted-foreground" /></button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topic bar */}
        <TopicBar active={activeTopic} onSelect={setActiveTopic} />

        {/* Sort tabs */}
        <div className="mt-3 mb-2">
          <SortTabs active={sortMode} onSelect={setSortMode} />
        </div>
      </div>

      {/* ─── Feed ─── */}
      <div className="flex-1 overflow-y-auto pb-28 relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="font-body text-sm text-muted-foreground">No expressions in this space yet.</p>
            <p className="font-body text-xs text-muted-foreground mt-1">Be the first to share 🌿</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpen={setActivePost}
              isSaved={isPostSaved(post.id)}
              onToggleSave={() => isPostSaved(post.id) ? unsavePost(post.id) : savePost(post.id, post.emotion, post.intent)}
              onEdit={setEditingPostId}
              onDelete={handleDeletePost}
              onResonate={handleResonate}
            />
          ))
        )}
      </div>

      {/* ─── FAB ─── */}
      <FABMenu onNewPost={() => setShowCreate(true)} />

      {/* ─── Overlays ─── */}
      <AnimatePresence>{showCreate && <CreatePostFlow onClose={() => setShowCreate(false)} onPost={handleNewPost} />}</AnimatePresence>
      <AnimatePresence>{activePost && <PostDetailView post={activePost} onClose={() => setActivePost(null)} onUpdatePost={handleUpdatePost} />}</AnimatePresence>
      <AnimatePresence>{showInsights && <InsightsPanel onClose={() => setShowInsights(false)} />}</AnimatePresence>
      <AnimatePresence>{showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} onOpenPost={handleOpenPostById} />}</AnimatePresence>
      <AnimatePresence>{showTopics && <TopicsPanel onClose={() => setShowTopics(false)} />}</AnimatePresence>
      <AnimatePresence>{showCircles && <CirclesPanel onClose={() => setShowCircles(false)} />}</AnimatePresence>
      <AnimatePresence>{editingPost && <EditPostModal post={editingPost} onClose={() => setEditingPostId(null)} onSave={handleEditPost} />}</AnimatePresence>
    </motion.div>
  );
};

export default Community;
