import { useState, useCallback, useSyncExternalStore } from "react";

export interface MoodEntry {
  mood: string;
  timestamp: string;
}

const STORAGE_KEY = "nirvaha_moods";

// Simple external store to sync across components
let listeners: Array<() => void> = [];
function emitChange() {
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

export function useMoodLog() {
  const raw = useSyncExternalStore(subscribe, getSnapshot);
  const moodLog: MoodEntry[] = JSON.parse(raw);

  const logMood = useCallback((mood: string) => {
    const entry: MoodEntry = {
      mood,
      timestamp: new Date().toISOString(),
    };
    const existing: MoodEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    emitChange();
  }, []);

  return { moodLog, logMood };
}
