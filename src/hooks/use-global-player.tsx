import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from "react";

export interface PlayerTrack {
  id: string;
  title: string;
  type: string;
  image: string;
  audioSrc: string;
}

interface PlayerContextType {
  track: PlayerTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  playbackSpeed: number;
  queue: PlayerTrack[];
  queueIndex: number;
  play: (track: PlayerTrack) => void;
  toggle: () => void;
  pause: () => void;
  seek: (time: number) => void;
  skip: (delta: number) => void;
  setMuted: (m: boolean) => void;
  setPlaybackSpeed: (s: number) => void;
  stop: () => void;
  addToQueue: (track: PlayerTrack) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  playNext: () => void;
  playPrev: () => void;
  playQueue: (tracks: PlayerTrack[], startIndex?: number) => void;
}

const noopPlayer: PlayerContextType = {
  track: null, isPlaying: false, currentTime: 0, duration: 0, muted: false,
  playbackSpeed: 1, queue: [], queueIndex: -1,
  play: () => {}, toggle: () => {}, pause: () => {}, seek: () => {}, skip: () => {},
  setMuted: () => {}, setPlaybackSpeed: () => {}, stop: () => {},
  addToQueue: () => {}, removeFromQueue: () => {}, clearQueue: () => {},
  playNext: () => {}, playPrev: () => {}, playQueue: () => {},
};

const PlayerContext = createContext<PlayerContextType>(noopPlayer);

export const useGlobalPlayer = () => useContext(PlayerContext);

export const GlobalPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<PlayerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMutedState] = useState(false);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);
  const [queue, setQueue] = useState<PlayerTrack[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      setIsPlaying(false);
      // Auto-play next in queue
      setQueue((q) => {
        setQueueIndex((idx) => {
          if (idx < q.length - 1) {
            const next = q[idx + 1];
            setTimeout(() => {
              audio.src = next.audioSrc;
              audio.load();
              audio.play().catch(() => {});
              setTrack(next);
              setIsPlaying(true);
            }, 0);
            return idx + 1;
          }
          return idx;
        });
        return q;
      });
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const play = useCallback((newTrack: PlayerTrack) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (track?.id !== newTrack.id || track?.audioSrc !== newTrack.audioSrc) {
      audio.src = newTrack.audioSrc;
      audio.load();
    }
    setTrack(newTrack);
    audio.play().catch(() => {});
    setIsPlaying(true);
    // If playing from queue, update index
    setQueue((q) => {
      const idx = q.findIndex((t) => t.id === newTrack.id);
      if (idx >= 0) setQueueIndex(idx);
      return q;
    });
  }, [track]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); setIsPlaying(true); }
  }, [isPlaying, track]);

  const pause = useCallback(() => { audioRef.current?.pause(); setIsPlaying(false); }, []);

  const seek = useCallback((time: number) => { if (audioRef.current) audioRef.current.currentTime = time; }, []);

  const skip = useCallback((delta: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + delta));
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setTrack(null); setIsPlaying(false); setCurrentTime(0); setDuration(0);
    setQueue([]); setQueueIndex(-1);
  }, []);

  const addToQueue = useCallback((newTrack: PlayerTrack) => {
    setQueue((q) => {
      if (q.some((t) => t.id === newTrack.id)) return q;
      return [...q, newTrack];
    });
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((q) => q.filter((_, i) => i !== index));
    setQueueIndex((idx) => (index < idx ? idx - 1 : idx));
  }, []);

  const clearQueue = useCallback(() => { setQueue([]); setQueueIndex(-1); }, []);

  const playNext = useCallback(() => {
    setQueue((q) => {
      setQueueIndex((idx) => {
        if (idx < q.length - 1) {
          const next = q[idx + 1];
          const audio = audioRef.current;
          if (audio) {
            audio.src = next.audioSrc; audio.load();
            audio.play().catch(() => {});
          }
          setTrack(next); setIsPlaying(true);
          return idx + 1;
        }
        return idx;
      });
      return q;
    });
  }, []);

  const playPrev = useCallback(() => {
    setQueue((q) => {
      setQueueIndex((idx) => {
        if (idx > 0) {
          const prev = q[idx - 1];
          const audio = audioRef.current;
          if (audio) {
            audio.src = prev.audioSrc; audio.load();
            audio.play().catch(() => {});
          }
          setTrack(prev); setIsPlaying(true);
          return idx - 1;
        }
        return idx;
      });
      return q;
    });
  }, []);

  const playQueue = useCallback((tracks: PlayerTrack[], startIndex = 0) => {
    setQueue(tracks);
    setQueueIndex(startIndex);
    const t = tracks[startIndex];
    if (t) {
      const audio = audioRef.current;
      if (audio) {
        audio.src = t.audioSrc; audio.load();
        audio.play().catch(() => {});
      }
      setTrack(t); setIsPlaying(true);
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        track, isPlaying, currentTime, duration, muted, playbackSpeed,
        queue, queueIndex,
        play, toggle, pause, seek, skip,
        setMuted: setMutedState, setPlaybackSpeed: setPlaybackSpeedState,
        stop, addToQueue, removeFromQueue, clearQueue, playNext, playPrev, playQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
