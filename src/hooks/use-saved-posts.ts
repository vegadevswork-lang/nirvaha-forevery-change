import { useState, useCallback, useSyncExternalStore } from "react";

export interface SavedPost {
  postId: string;
  emotion: string;
  intent: string;
  savedAt: string;
}

export interface EmotionalInsight {
  label: string;
  description: string;
  emoji: string;
}

const STORAGE_KEY = "nirvaha_saved_posts";

let listeners: Array<() => void> = [];
function emitChange() { listeners.forEach((l) => l()); }
function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => { listeners = listeners.filter((l) => l !== listener); };
}
function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

export function useSavedPosts() {
  const raw = useSyncExternalStore(subscribe, getSnapshot);
  const savedPosts: SavedPost[] = JSON.parse(raw);

  const savePost = useCallback((postId: string, emotion: string, intent: string) => {
    const existing: SavedPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (existing.some((p) => p.postId === postId)) return;
    existing.push({ postId, emotion, intent, savedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    emitChange();
  }, []);

  const unsavePost = useCallback((postId: string) => {
    const existing: SavedPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.filter((p) => p.postId !== postId)));
    emitChange();
  }, []);

  const isPostSaved = useCallback((postId: string) => {
    return savedPosts.some((p) => p.postId === postId);
  }, [savedPosts]);

  const getInsights = useCallback((): EmotionalInsight[] => {
    if (savedPosts.length < 2) return [];
    const insights: EmotionalInsight[] = [];

    // Most saved emotion
    const emotionCounts: Record<string, number> = {};
    savedPosts.forEach((p) => { emotionCounts[p.emotion] = (emotionCounts[p.emotion] || 0) + 1; });
    const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
    if (topEmotion && topEmotion[1] >= 2) {
      insights.push({
        label: "Emotional Pattern",
        description: `You often resonate with "${topEmotion[0]}" expressions — this may reflect your inner landscape.`,
        emoji: "🔮",
      });
    }

    // Most saved intent
    const intentCounts: Record<string, number> = {};
    savedPosts.forEach((p) => { intentCounts[p.intent] = (intentCounts[p.intent] || 0) + 1; });
    const topIntent = Object.entries(intentCounts).sort((a, b) => b[1] - a[1])[0];
    if (topIntent && topIntent[1] >= 2) {
      const intentMessages: Record<string, string> = {
        "To be heard": "You often seek clarity during uncertain moments.",
        "To get perspective": "You're drawn to perspectives that broaden understanding.",
        "To share freely": "You value authentic, free expression.",
        "To ask something": "You're naturally curious and seeking answers.",
      };
      insights.push({
        label: "Seeking Pattern",
        description: intentMessages[topIntent[0]] || `You're drawn to "${topIntent[0]}" — follow that thread.`,
        emoji: "🧭",
      });
    }

    // Time-based pattern
    const recentPosts = savedPosts.filter((p) => {
      const d = new Date(p.savedAt);
      return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
    });
    if (recentPosts.length >= 3) {
      insights.push({
        label: "Active Reflection",
        description: "You've been actively engaging with the community this week — a sign of growth.",
        emoji: "🌱",
      });
    }

    // Diversity of emotions
    const uniqueEmotions = new Set(savedPosts.map((p) => p.emotion));
    if (uniqueEmotions.size >= 4) {
      insights.push({
        label: "Emotional Range",
        description: "You connect with a wide range of emotions — this shows deep empathy.",
        emoji: "🌈",
      });
    }

    return insights;
  }, [savedPosts]);

  return { savedPosts, savePost, unsavePost, isPostSaved, getInsights };
}
