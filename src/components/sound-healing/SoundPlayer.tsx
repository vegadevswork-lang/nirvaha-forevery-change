import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Repeat, Volume2, X, VolumeX } from "lucide-react";
import { useSoundEngine } from "@/hooks/use-sound-engine";

interface SoundPlayerProps {
  track: { id?: string; title: string; description: string; moodTag: string; icon: string; duration: string } | null;
  onClose: () => void;
}

const WaveformVisual = ({ playing }: { playing: boolean }) => (
  <div className="flex items-center justify-center gap-[3px] h-24 my-6">
    {Array.from({ length: 32 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full"
        style={{ background: "linear-gradient(to top, hsl(var(--healing-green)), hsl(var(--gold)))" }}
        animate={playing ? {
          height: [8, 20 + Math.sin(i * 0.5) * 40, 12 + Math.cos(i * 0.3) * 30, 8],
        } : { height: 8 }}
        transition={playing ? {
          duration: 1.5 + Math.random() * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.04,
        } : { duration: 0.5 }}
      />
    ))}
  </div>
);

const SoundPlayer = ({ track, onClose }: SoundPlayerProps) => {
  const { play, stop, isPlaying, volume, setVolume } = useSoundEngine();
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (track) {
      setProgress(0);
      stop();
    }
  }, [track, stop]);

  const handlePlayPause = () => {
    if (!track) return;
    if (isPlaying) {
      stop();
    } else {
      play(track.title);
    }
  };

  const handleClose = () => {
    stop();
    onClose();
  };

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "hsl(var(--background))" }}
        >
          {/* Ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "hsl(var(--healing-green))" }} />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl"
            style={{ background: "hsl(var(--gold))" }} />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleClose}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <X size={18} className="text-muted-foreground" />
            </motion.button>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">Now Playing</p>
            <div className="w-10" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
            <motion.div
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--gold) / 0.12))",
                boxShadow: isPlaying ? "0 0 60px hsla(var(--healing-green) / 0.2)" : "none",
              }}
            >
              <span className="text-5xl">{track.icon}</span>
            </motion.div>

            <h2 className="font-display text-2xl text-foreground font-semibold text-center">{track.title}</h2>
            <p className="font-body text-sm text-muted-foreground mt-1 text-center max-w-xs">{track.description}</p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-body"
              style={{ background: "hsla(var(--healing-green) / 0.1)", color: "hsl(var(--primary))" }}>
              {track.moodTag}
            </span>

            <WaveformVisual playing={isPlaying} />

            {/* Progress */}
            <div className="w-full max-w-xs mb-6">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "hsla(var(--muted))" }}>
                <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(var(--healing-green)), hsl(var(--gold)))" }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-muted-foreground font-body">
                  {Math.floor(progress * 0.12)}:{String(Math.floor((progress * 7.2) % 60)).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground font-body">{track.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <motion.button whileTap={{ scale: 0.85 }} className="text-muted-foreground"><Repeat size={20} /></motion.button>
              <motion.button whileTap={{ scale: 0.85 }} className="text-foreground"><SkipBack size={24} /></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handlePlayPause}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--healing-green-light)))",
                  boxShadow: "0 8px 32px hsla(var(--healing-green) / 0.3)",
                }}>
                {isPlaying ? <Pause size={28} className="text-primary-foreground" /> : <Play size={28} className="text-primary-foreground ml-1" />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.85 }} className="text-foreground"><SkipForward size={24} /></motion.button>
              <motion.button whileTap={{ scale: 0.85 }} className="text-muted-foreground" onClick={() => setShowVolume(!showVolume)}>
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </motion.button>
            </div>

            {/* Volume slider */}
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 w-full max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <VolumeX size={14} className="text-muted-foreground" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "hsl(var(--healing-green))" }}
                    />
                    <Volume2 size={14} className="text-muted-foreground" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Intention */}
          <div className="relative z-10 px-8 pb-12 text-center">
            <p className="font-body text-xs text-muted-foreground italic">
              "Let the sound guide you back to balance"
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SoundPlayer;
