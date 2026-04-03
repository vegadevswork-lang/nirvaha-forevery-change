import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, Heart, CornerDownRight, Edit3, Trash2,
  Check, MoreHorizontal,
} from "lucide-react";
import { getTimeAgo } from "@/data/communityData";
import type { CommunityResponse } from "./types";

const CommentThread = ({
  r,
  onDelete,
  onEdit,
  onReply,
  onResonate,
  depth = 0,
}: {
  r: CommunityResponse;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onReply: (parentId: string) => void;
  onResonate: (id: string) => void;
  depth?: number;
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(r.content);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={depth > 0 ? "ml-4 pl-3" : ""}
      style={
        depth > 0
          ? { borderLeft: "2px solid hsl(var(--border) / 0.3)" }
          : undefined
      }
    >
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="w-5 h-5 rounded-full flex-shrink-0"
            style={{
              background: `hsl(${r.auraColor})`,
              boxShadow: `0 0 6px hsl(${r.auraColor} / 0.25)`,
            }}
          />
          {r.isVerified ? (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <BadgeCheck size={11} style={{ color: "hsl(var(--primary))" }} />
              <span className="font-body text-[11px] font-semibold text-foreground">
                {r.verifiedName}
              </span>
              <span className="font-body text-[9px] text-muted-foreground">
                • {r.verifiedRole}
              </span>
            </div>
          ) : (
            <span className="font-body text-[11px] text-muted-foreground flex-1">
              Anonymous
            </span>
          )}
          <span className="font-body text-[10px] text-muted-foreground">
            {getTimeAgo(r.timestamp)}
          </span>
          {r.edited && (
            <span className="font-body text-[9px] text-muted-foreground italic">
              (edited)
            </span>
          )}
        </div>

        {/* Content */}
        {editing ? (
          <div className="space-y-2 ml-7">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-xs resize-none font-body"
              style={{
                background: "hsl(var(--muted) / 0.5)",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onEdit(r.id, editText);
                  setEditing(false);
                }}
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
                  setEditText(r.content);
                  setEditing(false);
                }}
                className="font-body text-[10px] text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="font-body text-[13px] text-foreground leading-relaxed ml-7">
            {r.content}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 ml-7 mt-1.5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onResonate(r.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-md font-body text-[10px] transition-all"
            style={
              r.resonatedByUser
                ? { color: "hsl(var(--primary))", fontWeight: 600 }
                : { color: "hsl(var(--muted-foreground))" }
            }
          >
            <Heart
              size={11}
              fill={r.resonatedByUser ? "hsl(var(--primary))" : "none"}
              stroke={
                r.resonatedByUser
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))"
              }
            />
            {r.resonances > 0 && r.resonances}
          </motion.button>

          <button
            onClick={() => onReply(r.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-md font-body text-[10px] text-muted-foreground"
          >
            <CornerDownRight size={10} /> Reply
          </button>

          {r.isOwn && (
            <div className="relative ml-auto">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-md"
              >
                <MoreHorizontal size={12} className="text-muted-foreground" />
              </button>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-6 z-20 rounded-lg border py-1 min-w-[100px]"
                  style={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    boxShadow: "0 4px 12px hsl(var(--glass-shadow))",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setEditing(true);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 w-full text-left font-body text-[11px] text-foreground"
                  >
                    <Edit3 size={10} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(r.id);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 w-full text-left font-body text-[11px] text-destructive"
                  >
                    <Trash2 size={10} /> Delete
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {r.replies?.map((child) => (
        <CommentThread
          key={child.id}
          r={child}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
          onResonate={onResonate}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

export default CommentThread;
