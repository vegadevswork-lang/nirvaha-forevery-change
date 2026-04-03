import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, MessageCircle, Bookmark, BookmarkCheck,
  Edit3, Trash2, MoreHorizontal, Share2,
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border mb-3 overflow-hidden"
      style={{
        background: "hsl(var(--card))",
        borderColor: "hsl(var(--border) / 0.5)",
      }}
    >
      {/* Top meta bar */}
      <div className="flex items-center gap-2 px-4 pt-3.5 pb-1">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
          style={{
            background: `linear-gradient(135deg, hsl(${post.auraColor} / 0.4), hsl(${post.auraColor} / 0.15))`,
          }}
        >
          {emotionData?.emoji || "✨"}
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-1.5 flex-wrap">
          <span
            className="font-body text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `hsl(${post.auraColor} / 0.12)`,
              color: `hsl(${post.auraColor})`,
            }}
          >
            {post.emotion}
          </span>
          <span className="font-body text-[10px] text-muted-foreground">
            in{" "}
            <span className="font-semibold text-foreground/70">
              {post.topicSpace}
            </span>
          </span>
          <span className="font-body text-[10px] text-muted-foreground">
            • {getTimeAgo(post.timestamp)}
          </span>
          {post.edited && (
            <span className="font-body text-[9px] text-muted-foreground italic">
              (edited)
            </span>
          )}
        </div>

        {/* 3-dot menu for own posts */}
        <div className="relative">
          {post.isOwn && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 rounded-lg"
              style={{ background: showMenu ? "hsl(var(--muted))" : "transparent" }}
            >
              <MoreHorizontal size={14} className="text-muted-foreground" />
            </motion.button>
          )}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-8 z-20 rounded-xl border py-1 min-w-[120px]"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                boxShadow: "0 4px 16px hsl(var(--glass-shadow))",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onEdit(post.id);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-left font-body text-xs text-foreground hover:bg-muted/50"
              >
                <Edit3 size={12} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onDelete(post.id);
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-left font-body text-xs text-destructive hover:bg-muted/50"
              >
                <Trash2 size={12} /> Delete
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Intent badge */}
      <div className="px-4 pb-1">
        <span className="font-body text-[10px] text-muted-foreground italic">
          {post.intent}
        </span>
      </div>

      {/* Content — clickable */}
      <button onClick={() => onOpen(post)} className="w-full text-left px-4 pb-3">
        <p className="font-body text-[13px] text-foreground leading-relaxed line-clamp-4">
          {post.content}
        </p>
      </button>

      {/* Bottom action bar */}
      <div
        className="flex items-center gap-1 px-2 py-2 border-t"
        style={{ borderColor: "hsl(var(--border) / 0.3)" }}
      >
        {/* Resonate */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onResonate(post.id);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-[11px] transition-all"
          style={
            post.resonatedByUser
              ? {
                  background: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  fontWeight: 600,
                }
              : { color: "hsl(var(--muted-foreground))" }
          }
        >
          <Heart
            size={14}
            fill={post.resonatedByUser ? "hsl(var(--primary))" : "none"}
            stroke={
              post.resonatedByUser
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))"
            }
          />
          {post.resonances > 0 && post.resonances}
          {post.resonances === 0 ? "Resonate" : ""}
        </motion.button>

        {/* Comments */}
        <button
          onClick={() => onOpen(post)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-[11px] text-muted-foreground"
        >
          <MessageCircle size={14} />
          {totalReplies > 0 ? totalReplies : "Respond"}
        </button>

        {/* Share */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-[11px] text-muted-foreground">
          <Share2 size={13} />
        </button>

        {/* Save — pushed right */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className="ml-auto p-2"
        >
          {isSaved ? (
            <BookmarkCheck size={15} style={{ color: "hsl(var(--primary))" }} />
          ) : (
            <Bookmark size={15} className="text-muted-foreground" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PostCard;
