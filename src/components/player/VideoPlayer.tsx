import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize, Minimize, X, Volume2, VolumeX, PictureInPicture2 } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  posterImage: string;
  onClose: () => void;
}

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
  const [isPiP, setIsPiP] = useState(false);
  const [pipSupported, setPipSupported] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();
  const progressRef = useRef<HTMLDivElement>(null);

  const videoSrc = sampleVideos[1];

  useEffect(() => {
    setPipSupported("pictureInPictureEnabled" in document && (document as any).pictureInPictureEnabled);
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current); };
  }, []);

  // Listen for PiP events
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnter = () => setIsPiP(true);
    const onLeave = () => setIsPiP(false);
    vid.addEventListener("enterpictureinpicture", onEnter);
    vid.addEventListener("leavepictureinpicture", onLeave);
    return () => {
      vid.removeEventListener("enterpictureinpicture", onEnter);
      vid.removeEventListener("leavepictureinpicture", onLeave);
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
    if (isPlaying) { vid.pause(); } else { vid.play().catch(() => {}); }
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
    } catch {}
  };

  const togglePiP = async () => {
    const vid = videoRef.current;
    if (!vid) return;
    try {
      if ((document as any).pictureInPictureElement) {
        await (document as any).exitPictureInPicture();
      } else {
        await (vid as any).requestPictureInPicture();
      }
    } catch {}
  };

  const handleClose = () => {
    // Exit PiP if active before closing
    if ((document as any).pictureInPictureElement) {
      (document as any).exitPictureInPicture().catch(() => {});
    }
    onClose();
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // If in PiP mode, allow closing the main overlay so user can browse
  if (isPiP) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 left-3 right-3 z-[60] rounded-2xl p-3"
        style={{
          background: "hsla(var(--card) / 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid hsla(var(--glass-border))",
          boxShadow: "0 -4px 30px hsla(0 0% 0% / 0.25)",
        }}
      >
        {/* Hidden video element to keep PiP running */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterImage}
          muted={muted}
          playsInline
          className="hidden"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="flex items-center gap-3">
          <img src={posterImage} alt={title} className="w-10 h-10 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-body text-xs font-semibold text-foreground truncate">{title}</p>
            <p className="font-body text-[9px] text-muted-foreground">Playing in Picture-in-Picture</p>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={togglePiP} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "hsl(var(--muted))" }}>
            <PictureInPicture2 size={14} className="text-primary" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleClose} className="w-8 h-8 flex items-center justify-center">
            <X size={14} className="text-muted-foreground" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

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
                    onClick={(e) => { e.stopPropagation(); handleClose(); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "hsla(0 0% 100% / 0.15)", backdropFilter: "blur(8px)" }}
                  >
                    <X size={18} color="white" />
                  </motion.button>
                  <p className="font-body text-sm font-medium text-white truncate flex-1 mx-4 text-center">{title}</p>
                  {pipSupported && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); togglePiP(); }}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "hsla(0 0% 100% / 0.15)", backdropFilter: "blur(8px)" }}
                    >
                      <PictureInPicture2 size={16} color="white" />
                    </motion.button>
                  )}
                  {!pipSupported && <div className="w-9" />}
                </div>

                {/* Center play */}
                <div className="flex items-center justify-center">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); handleTogglePlay(); }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "hsla(0 0% 100% / 0.2)", backdropFilter: "blur(12px)" }}
                  >
                    {isPlaying ? <Pause size={28} color="white" /> : <Play size={28} fill="white" color="white" />}
                  </motion.button>
                </div>

                {/* Bottom controls */}
                <div className="px-4 pb-8">
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
                      <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}>
                        {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}>
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
