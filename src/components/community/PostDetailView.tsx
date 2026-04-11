import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Bookmark, BookmarkCheck, CornerDownRight,
  X, Edit3, Check, Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { emotions, empathyStarters, reflectionOptions, getTimeAgo } from "@/data/communityData";
import { moderateContent, type ModerationResult } from "@/hooks/use-content-moderation";
import { useSavedPosts } from "@/hooks/use-saved-posts";
import { useNotifications } from "@/hooks/use-notifications";
import type { CommunityPost, CommunityResponse } from "./types";
import CommentThread from "./CommentThread";
import ModerationBanner from "./ModerationBanner";

const randomAura = () => {
  const colors = emotions.map((e) => e.color);
  return colors[Math.floor(Math.random() * colors.length)];
};

const PostDetailView = ({
  post,
  onClose,
  onUpdatePost,
}: {
  post: CommunityPost;
  onClose: () => void;
  onUpdatePost: (updated: CommunityPost) => void;
}) => {
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
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
      setReplyModResult(
        result.warnings.length > 0 || result.suggestions.length > 0 || result.isCrisis
          ? result
          : null
      );
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
    const newReply: CommunityResponse = {
      id: `reply-${Date.now()}`,
      content: replyText,
      auraColor: randomAura(),
      isVerified: false,
      timestamp: new Date(),
      isOwn: true,
      parentId: replyTarget || undefined,
      resonances: 0,
      resonatedByUser: false,
    };

    let updatedResponses: CommunityResponse[];
    if (replyTarget) {
      updatedResponses = post.responses.map((r) => {
        if (r.id === replyTarget) return { ...r, replies: [...(r.replies || []), newReply] };
        if (r.replies?.some((rr) => rr.id === replyTarget)) {
          return {
            ...r,
            replies: r.replies.map((rr) =>
              rr.id === replyTarget
                ? { ...rr, replies: [...(rr.replies || []), newReply] }
                : rr
            ),
          };
        }
        return r;
      });
    } else {
      updatedResponses = [...post.responses, newReply];
    }

    onUpdatePost({ ...post, responses: updatedResponses });
    addNotification({
      type: "reply",
      title: "New response",
      body: `Someone responded with empathy to a ${post.emotion.toLowerCase()} expression`,
      postId: post.id,
    });
    setReplyText("");
    setReplyModResult(null);
    setReplyTarget(null);
    setShowReflection(true);
  };

  const handleDeleteResponse = (id: string) => {
    const filterReplies = (responses: CommunityResponse[]): CommunityResponse[] =>
      responses
        .filter((r) => r.id !== id)
        .map((r) => ({
          ...r,
          replies: r.replies ? filterReplies(r.replies) : undefined,
        }));
    onUpdatePost({ ...post, responses: filterReplies(post.responses) });
  };

  const handleEditResponse = (id: string, newContent: string) => {
    const editReplies = (responses: CommunityResponse[]): CommunityResponse[] =>
      responses.map((r) =>
        r.id === id
          ? { ...r, content: newContent, edited: true }
          : { ...r, replies: r.replies ? editReplies(r.replies) : undefined }
      );
    onUpdatePost({ ...post, responses: editReplies(post.responses) });
  };

  const handleResonateResponse = (id: string) => {
    const toggleResonate = (responses: CommunityResponse[]): CommunityResponse[] =>
      responses.map((r) =>
        r.id === id
          ? {
              ...r,
              resonatedByUser: !r.resonatedByUser,
              resonances: r.resonatedByUser ? r.resonances - 1 : r.resonances + 1,
            }
          : { ...r, replies: r.replies ? toggleResonate(r.replies) : undefined }
      );
    onUpdatePost({ ...post, responses: toggleResonate(post.responses) });
  };

  const handleEditPost = () => {
    if (editPostText.trim().length < 10) return;
    onUpdatePost({ ...post, content: editPostText, edited: true });
    setEditingPost(false);
  };

  const totalReplies = post.responses.reduce(
    (sum, r) => sum + 1 + (r.replies?.length || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Emerald Void Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, hsl(${post.auraColor} / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, hsl(var(--healing-green) / 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, hsl(var(--gold) / 0.03) 0%, transparent 70%)
          `,
        }} />
        <motion.div
          animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[30%] w-[350px] h-[350px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${post.auraColor} / 0.15) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-3 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(var(--card) / 0.4)", backdropFilter: "blur(12px)", border: "1px solid hsl(var(--border) / 0.1)" }}
        >
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{
              background: `hsl(${post.auraColor})`,
              boxShadow: `0 0 10px hsl(${post.auraColor} / 0.3)`,
            }}
          >
            {emotionData?.emoji}
          </div>
          <div>
            <span className="font-body text-xs font-semibold text-foreground">
              {post.emotion}
            </span>
            <span className="font-body text-[10px] text-muted-foreground ml-1.5">
              in {post.topicSpace}
            </span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() =>
            saved
              ? unsavePost(post.id)
              : savePost(post.id, post.emotion, post.intent)
          }
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
        {/* Post content */}
        <div
          className="rounded-2xl border p-5 mb-4"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--border) / 0.5)",
          }}
        >
          {editingPost ? (
            <div className="space-y-2">
              <textarea
                value={editPostText}
                onChange={(e) => setEditPostText(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm resize-none font-body"
                style={{
                  background: "hsl(var(--muted) / 0.5)",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditPost}
                  className="flex items-center gap-1 font-body text-[10px] px-3 py-1.5 rounded-full"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <Check size={10} /> Save
                </button>
                <button
                  onClick={() => {
                    setEditPostText(post.content);
                    setEditingPost(false);
                  }}
                  className="font-body text-[10px] text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-body text-[13px] text-foreground leading-relaxed mb-3">
                {post.content}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-body text-[10px] text-muted-foreground italic">
                  {post.intent}
                </span>
                {post.edited && (
                  <span className="font-body text-[9px] text-muted-foreground italic">
                    (edited)
                  </span>
                )}
                <span className="ml-auto font-body text-[10px] text-muted-foreground">
                  {getTimeAgo(post.timestamp)}
                </span>
              </div>

              {/* Post-level actions */}
              <div
                className="flex items-center gap-2 mt-3 pt-3"
                style={{ borderTop: "1px solid hsl(var(--border) / 0.3)" }}
              >
                <span className="flex items-center gap-1 font-body text-[11px] text-muted-foreground">
                  <Heart size={13} /> {post.resonances} resonances
                </span>
                <span className="font-body text-[10px] text-muted-foreground">
                  • {totalReplies} responses
                </span>
                {post.isOwn && (
                  <button
                    onClick={() => setEditingPost(true)}
                    className="ml-auto flex items-center gap-1 font-body text-[10px] text-muted-foreground"
                  >
                    <Edit3 size={10} /> Edit
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Comments section */}
        {post.responses.length > 0 && (
          <div className="mb-4">
            <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {totalReplies} {totalReplies === 1 ? "Response" : "Responses"}
            </h3>
            <div
              className="rounded-2xl border divide-y divide-border/30"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border) / 0.5)",
              }}
            >
              {post.responses.map((r) => (
                <div key={r.id} className="px-4">
                  <CommentThread
                    r={r}
                    onDelete={handleDeleteResponse}
                    onEdit={handleEditResponse}
                    onReply={(parentId) => setReplyTarget(parentId)}
                    onResonate={handleResonateResponse}
                  />
                </div>
              ))}
            </div>
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
                onClick={() => {
                  setReplyText(s + " ");
                  setReplyModResult(null);
                }}
                className="font-body text-[11px] px-3 py-1.5 rounded-full"
                style={{
                  background: "hsl(var(--primary) / 0.08)",
                  color: "hsl(var(--primary))",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Reply target */}
        {replyTarget && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 mb-2 px-2"
          >
            <CornerDownRight size={12} className="text-primary" />
            <span className="font-body text-[10px] text-primary">
              Replying to a response
            </span>
            <button onClick={() => setReplyTarget(null)} className="ml-auto">
              <X size={12} className="text-muted-foreground" />
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {replyModResult && (
            <ModerationBanner
              result={replyModResult}
              onDismiss={() => setReplyModResult(null)}
            />
          )}
        </AnimatePresence>

        {/* Reply input */}
        <div
          className="flex gap-2 mb-6 rounded-2xl border p-2"
          style={{
            background: "hsl(var(--muted) / 0.3)",
            borderColor: "hsl(var(--border) / 0.5)",
          }}
        >
          <textarea
            value={replyText}
            onChange={(e) => handleReplyChange(e.target.value)}
            placeholder={
              replyTarget ? "Reply to this response…" : "Write your response…"
            }
            rows={2}
            className="flex-1 bg-transparent resize-none text-sm font-body px-2 py-1 outline-none"
            style={{ color: "hsl(var(--foreground))" }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={
              replyText.trim().length < 5 || (replyModResult?.isCrisis ?? false)
            }
            className="px-4 rounded-xl font-body text-xs font-medium self-end disabled:opacity-40"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              height: 36,
            }}
          >
            Reply
          </motion.button>
        </div>

        {/* Reflection loop */}
        <AnimatePresence>
          {showReflection && !reflected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border p-5 mb-4"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border) / 0.5)",
              }}
            >
              <h3 className="font-display text-base text-foreground font-semibold mb-2">
                How do you feel now?
              </h3>
              <div className="flex gap-2 flex-wrap mb-3">
                {reflectionOptions.map((r) => (
                  <motion.button
                    key={r.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReflected(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs"
                    style={{
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--foreground))",
                    }}
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
              className="rounded-2xl border p-5 mb-4 text-center"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border) / 0.5)",
              }}
            >
              <p className="font-body text-sm text-foreground mb-3">
                Thank you for reflecting 🌿
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    navigate("/chat");
                  }}
                  className="font-body text-xs px-4 py-2 rounded-full"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  Talk to Nirvaha
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    navigate("/journal");
                  }}
                  className="font-body text-xs px-4 py-2 rounded-full"
                  style={{
                    background: "hsl(var(--gold) / 0.15)",
                    color: "hsl(var(--accent))",
                  }}
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

export default PostDetailView;
