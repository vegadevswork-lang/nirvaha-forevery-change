import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, X,
  Volume2, VolumeX, ChevronUp, ChevronDown,
} from "lucide-react";
import { useGlobalPlayer } from "@/hooks/use-global-player";
import { useNavigate } from "react-router-dom";

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const GlobalMiniPlayer = () => {
  const {
    track, isPlaying, currentTime, duration, muted, playbackSpeed,
    toggle, skip, seek, setMuted, stop,
  } = useGlobalPlayer();
  const [expanded, setExpanded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  if (!track) return null;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(pct * duration);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed left-0 right-0 z-[60]"
      style={{ bottom: 80 }}
    >
      <div
        className="mx-3 rounded-2xl overflow-hidden"
        style={{
          background: "hsla(var(--card) / 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid hsla(var(--glass-border))",
          boxShadow: "0 -4px 30px hsla(0 0% 0% / 0.25)",
        }}
      >
        <div className="p-3">
          {/* Collapsed row */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/collection/${track.id}`)} className="flex-shrink-0">
              <img src={track.image} alt={track.title} className="w-10 h-10 rounded-xl object-cover" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs font-semibold text-foreground truncate">{track.title}</p>
              <p className="font-body text-[9px] text-muted-foreground">{track.type} · {playbackSpeed}x</p>
            </div>
            <div className="flex items-center gap-0.5">
              <motion.button whileTap={{ scale: 0.9 }} onClick={toggle} className="w-8 h-8 flex items-center justify-center">
                {isPlaying ? <Pause size={16} className="text-foreground" /> : <Play size={16} fill="currentColor" className="text-foreground" />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setExpanded(!expanded)} className="w-7 h-7 flex items-center justify-center">
                {expanded ? <ChevronDown size={14} className="text-muted-foreground" /> : <ChevronUp size={14} className="text-muted-foreground" />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={stop} className="w-7 h-7 flex items-center justify-center">
                <X size={14} className="text-muted-foreground" />
              </motion.button>
            </div>
          </div>

          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="w-full h-1 rounded-full cursor-pointer mt-2"
            style={{ background: "hsl(var(--muted))" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                background: "hsl(var(--primary))",
                transition: "width 0.3s linear",
              }}
            />
          </div>

          {/* Expanded controls */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex justify-between text-[9px] font-body text-muted-foreground mt-1 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="flex items-center justify-center gap-6 pb-1">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMuted(!muted)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                    {muted ? <VolumeX size={14} className="text-muted-foreground" /> : <Volume2 size={14} className="text-foreground" />}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => skip(-15)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                    <SkipBack size={16} className="text-foreground" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggle}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    {isPlaying ? (
                      <Pause size={20} style={{ color: "hsl(var(--primary-foreground))" }} />
                    ) : (
                      <Play size={20} fill="currentColor" style={{ color: "hsl(var(--primary-foreground))" }} />
                    )}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => skip(15)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--muted))" }}>
                    <SkipForward size={16} className="text-foreground" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalMiniPlayer;
