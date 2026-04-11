import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3, Trash2, MoreHorizontal,
} from "lucide-react";
import { emotions, getTimeAgo, getEmotionPath, sacredPaths } from "@/data/communityData";
import type { CommunityPost } from "./types";

/* Empathetic signal icons as inline SVGs */
const RippleIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="7" opacity="0.5" />
    <circle cx="12" cy="12" r="11" opacity="0.25" />
  </svg>
);

const MirrorIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M12 3C7 3 3 7 3 12s4 9 9 9" />
    <path d="M12 3c5 0 9 4 9 9s-4 9-9 9" opacity="0.4" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
  </svg>
);

const LotusIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
    <path d="M12 21c0-6-4-9-4-14a4 4 0 018 0c0 5-4 8-4 14z" />
    <path d="M8 14c-3-1-5-4-5-7 3 0 5 2 5 7z" opacity="0.5" />
    <path d="M16 14c3-1 5-4 5-7-3 0-5 2-5 7z" opacity="0.5" />
  </svg>
);

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
  const path = getEmotionPath(post.emotion);
  const pathData = sacredPaths.find((p) => p.id === path);
  const glowColor = pathData?.hue || post.auraColor;
  const totalReplies = post.responses.reduce(
    (sum, r) => sum + 1 + (r.replies?.length || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-3"
    >
      <div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{
          background: "hsl(var(--card) / 0.45)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: `1px solid hsl(${glowColor} / 0.15)`,
          boxShadow: `0 0 30px hsl(${glowColor} / 0.06), 0 8px 32px hsl(var(--glass-shadow)), inset 0 1px 0 hsl(${glowColor} / 0.08)`,
        }}
      >
        {/* Subtle emotion glow in corner */}
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${glowColor} / 0.12) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Top row: aura + meta + menu */}
        <div className="flex items-start gap-3 relative z-10">
          {/* Pulsing aura sphere */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 12px hsl(${post.auraColor} / 0.3)`,
                `0 0 20px hsl(${post.auraColor} / 0.5)`,
                `0 0 12px hsl(${post.auraColor} / 0.3)`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full flex-shrink-0 mt-0.5"
            style={{
              background: `radial-gradient(circle at 35% 35%, hsl(${post.auraColor} / 0.8), hsl(${post.auraColor} / 0.3))`,
            }}
          />

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {/* Meta line */}
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="font-display text-[11px] font-semibold italic tracking-wide"
                style={{ color: `hsl(${glowColor})` }}
              >
                {post.emotion}
              </span>
              <span className="font-body text-[10px] text-muted-foreground/60">
                · {getTimeAgo(post.timestamp)}
              </span>
              {post.edited && (
                <span className="font-body text-[9px] text-muted-foreground/50 italic">
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
                    className="p-1.5 rounded-full transition-colors"
                    style={{ background: showMenu ? "hsl(var(--muted) / 0.5)" : "transparent" }}
                  >
                    <MoreHorizontal size={14} className="text-muted-foreground/60" />
                  </motion.button>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-8 z-20 rounded-2xl py-1.5 min-w-[110px]"
                      style={{
                        background: "hsl(var(--card) / 0.9)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid hsl(var(--border) / 0.2)",
                        boxShadow: "0 8px 32px hsl(var(--glass-shadow))",
                      }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onEdit(post.id); }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left font-body text-xs text-foreground hover:bg-muted/30 transition-colors"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(post.id); }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left font-body text-xs text-destructive hover:bg-muted/30 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Content — clickable */}
            <button onClick={() => onOpen(post)} className="w-full text-left">
              <p className="font-body text-[14px] text-foreground/90 leading-[1.75] line-clamp-5">
                {post.content}
              </p>
            </button>

            {/* Empathetic action bar */}
            <div className="flex items-center gap-1 mt-4 -ml-1">
              {/* Resonate (ripple) */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); onResonate(post.id); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-body text-[11px] transition-all"
                style={
                  post.resonatedByUser
                    ? { color: `hsl(${glowColor})`, background: `hsl(${glowColor} / 0.1)` }
                    : { color: "hsl(var(--muted-foreground) / 0.7)" }
                }
              >
                <RippleIcon size={15} />
                {post.resonances > 0 && (
                  <span>{post.resonances} {post.resonances === 1 ? "soul" : "souls"}</span>
                )}
              </motion.button>

              {/* Reflect (mirror) */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-body text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                <MirrorIcon size={15} />
              </button>

              {/* Offer Wisdom (lotus) */}
              <button
                onClick={() => onOpen(post)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-body text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                <LotusIcon size={15} />
                {totalReplies > 0 && <span>{totalReplies}</span>}
              </button>

              {/* Save (bookmark) */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
                className="ml-auto px-2 py-1.5"
              >
                <svg width={15} height={15} viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  style={{ color: isSaved ? `hsl(${glowColor})` : "hsl(var(--muted-foreground) / 0.5)" }}
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
