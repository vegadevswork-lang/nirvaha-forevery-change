import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, MessageCircle, Bookmark, BookmarkCheck,
  Edit3, Trash2, MoreHorizontal, Share2, Repeat2,
} from "lucide-react";
import { emotions, getTimeAgo } from "@/data/communityData";
import type { CommunityPost } from "./types";

const PostCard = ({
  post,
  onOpen,
  isSaved,
  onToggleSave,
  onEdit,
  onDelete,
  onResonate,
}: {
  post: CommunityPost;
  onOpen: (p: CommunityPost) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onResonate: (id: string) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const emotionData = emotions.find((e) => e.label === post.emotion);
  const totalReplies = post.responses.reduce(
    (sum, r) => sum + 1 + (r.replies?.length || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="border-b"
      style={{ borderColor: "hsl(var(--border) / 0.15)" }}
    >
      <div className="px-4 py-4">
        {/* Top row: avatar + meta + menu */}
        <div className="flex items-start gap-3">
          {/* Aura avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5"
            style={{
              background: `linear-gradient(135deg, hsl(${post.auraColor} / 0.5), hsl(${post.auraColor} / 0.2))`,
              boxShadow: `0 0 12px hsl(${post.auraColor} / 0.15)`,
            }}
          >
            {emotionData?.emoji || "✨"}
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {/* Meta line */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="font-body text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                style={{
                  background: `hsl(${post.auraColor} / 0.12)`,
                  color: `hsl(${post.auraColor})`,
                }}
              >
                {post.emotion}
              </span>
              <span className="font-body text-[11px] text-muted-foreground">
                in{" "}
                <span className="font-medium text-foreground/70">
                  {post.topicSpace}
                </span>
              </span>
              <span className="font-body text-[11px] text-muted-foreground">
                · {getTimeAgo(post.timestamp)}
              </span>
              {post.edited && (
                <span className="font-body text-[10px] text-muted-foreground italic">
                  (edited)
                </span>
              )}

              {/* Menu */}
              {post.isOwn && (
                <div className="relative ml-auto">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                    }}
                    className="p-1 rounded-full"
                    style={{ background: showMenu ? "hsl(var(--muted))" : "transparent" }}
                  >
                    <MoreHorizontal size={14} className="text-muted-foreground" />
                  </motion.button>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-7 z-20 rounded-xl border py-1 min-w-[110px]"
                      style={{
                        background: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        boxShadow: "0 4px 16px hsl(var(--glass-shadow))",
                      }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onEdit(post.id); }}
                        className="flex items-center gap-2 px-3 py-2 w-full text-left font-body text-xs text-foreground hover:bg-muted/50"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(post.id); }}
                        className="flex items-center gap-2 px-3 py-2 w-full text-left font-body text-xs text-destructive hover:bg-muted/50"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Intent */}
            <p className="font-body text-[11px] text-muted-foreground italic mb-2">
              {post.intent}
            </p>

            {/* Content — clickable */}
            <button onClick={() => onOpen(post)} className="w-full text-left">
              <p className="font-body text-[14px] text-foreground leading-[1.65] line-clamp-5">
                {post.content}
              </p>
            </button>

            {/* Action bar — X-style */}
            <div className="flex items-center justify-between mt-3 -ml-2">
              {/* Replies */}
              <button
                onClick={() => onOpen(post)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-body text-[12px] text-muted-foreground hover:text-primary transition-colors group"
              >
                <MessageCircle size={16} className="group-hover:text-primary transition-colors" />
                {totalReplies > 0 && <span>{totalReplies}</span>}
              </button>

              {/* Repost placeholder */}
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-body text-[12px] text-muted-foreground hover:text-accent transition-colors group">
                <Repeat2 size={16} className="group-hover:text-accent transition-colors" />
              </button>

              {/* Resonate (heart) */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); onResonate(post.id); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-body text-[12px] transition-colors group"
                style={
                  post.resonatedByUser
                    ? { color: "hsl(var(--primary))" }
                    : { color: "hsl(var(--muted-foreground))" }
                }
              >
                <Heart
                  size={16}
                  fill={post.resonatedByUser ? "hsl(var(--primary))" : "none"}
                  className="group-hover:text-primary transition-colors"
                />
                {post.resonances > 0 && <span>{post.resonances}</span>}
              </motion.button>

              {/* Share */}
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-body text-[12px] text-muted-foreground hover:text-primary transition-colors group">
                <Share2 size={15} className="group-hover:text-primary transition-colors" />
              </button>

              {/* Bookmark */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
                className="px-2 py-1.5"
              >
                {isSaved ? (
                  <BookmarkCheck size={16} style={{ color: "hsl(var(--primary))" }} />
                ) : (
                  <Bookmark size={16} className="text-muted-foreground hover:text-primary transition-colors" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
