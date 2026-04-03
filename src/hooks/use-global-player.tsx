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
  play: (track: PlayerTrack) => void;
  toggle: () => void;
  pause: () => void;
  seek: (time: number) => void;
  skip: (delta: number) => void;
  setMuted: (m: boolean) => void;
  setPlaybackSpeed: (s: number) => void;
  stop: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const useGlobalPlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("useGlobalPlayer must be used within GlobalPlayerProvider");
  return ctx;
};

export const GlobalPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<PlayerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMutedState] = useState(false);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => setIsPlaying(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => {});
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
  }, [track]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, track]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const skip = useCallback((delta: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + delta));
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        currentTime,
        duration,
        muted,
        playbackSpeed,
        play,
        toggle,
        pause,
        seek,
        skip,
        setMuted: setMutedState,
        setPlaybackSpeed: setPlaybackSpeedState,
        stop,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
