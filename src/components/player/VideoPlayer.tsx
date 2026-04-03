import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize, Minimize, X, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  posterImage: string;
  onClose: () => void;
}

// Free sample videos for demo
const sampleVideos = [
  "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
];

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({ title, posterImage, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();
  const progressRef = useRef<HTMLDivElement>(null);

  const videoSrc = sampleVideos[1];

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (isPlaying) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handleTogglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
    } else {
      vid.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    resetHideTimer();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * duration;
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={containerRef}
        className="fixed inset-0 z-[70] bg-black flex flex-col"
        onClick={resetHideTimer}
      >
        {/* Video */}
        <div className="flex-1 relative flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            className="w-full h-full object-contain"
            muted={muted}
            playsInline
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onEnded={() => setIsPlaying(false)}
            onClick={handleTogglePlay}
          />

          {/* Controls overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col justify-between"
                style={{ background: "linear-gradient(to bottom, hsla(0 0% 0% / 0.5) 0%, transparent 30%, transparent 70%, hsla(0 0% 0% / 0.7) 100%)" }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 pt-10">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "hsla(0 0% 100% / 0.15)", backdropFilter: "blur(8px)" }}
                  >
                    <X size={18} color="white" />
                  </motion.button>
                  <p className="font-body text-sm font-medium text-white truncate flex-1 mx-4 text-center">{title}</p>
                  <div className="w-9" />
                </div>

                {/* Center play button */}
                <div className="flex items-center justify-center">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); handleTogglePlay(); }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "hsla(0 0% 100% / 0.2)", backdropFilter: "blur(12px)" }}
                  >
                    {isPlaying ? (
                      <Pause size={28} color="white" />
                    ) : (
                      <Play size={28} fill="white" color="white" />
                    )}
                  </motion.button>
                </div>

                {/* Bottom controls */}
                <div className="px-4 pb-8">
                  {/* Progress */}
                  <div
                    ref={progressRef}
                    onClick={(e) => { e.stopPropagation(); handleSeek(e); }}
                    className="w-full h-1.5 rounded-full cursor-pointer mb-3"
                    style={{ background: "hsla(0 0% 100% / 0.2)" }}
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
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[10px] text-white/70">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                      >
                        {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                      >
                        {isFullscreen ? <Minimize size={18} color="white" /> : <Maximize size={18} color="white" />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
