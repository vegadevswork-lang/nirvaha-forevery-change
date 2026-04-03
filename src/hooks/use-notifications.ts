import { useState, useCallback, useSyncExternalStore } from "react";

export interface Notification {
  id: string;
  type: "reply" | "mention" | "suggestion" | "reminder";
  title: string;
  body: string;
  postId?: string;
  read: boolean;
  timestamp: string;
}

const STORAGE_KEY = "nirvaha_notifications";
const TOPICS_KEY = "nirvaha_followed_topics";

let listeners: Array<() => void> = [];
function emitChange() { listeners.forEach((l) => l()); }
function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => { listeners = listeners.filter((l) => l !== listener); };
}
function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) || "[]";
}
function getTopicsSnapshot(): string {
  return localStorage.getItem(TOPICS_KEY) || "[]";
}

export function useNotifications() {
  const raw = useSyncExternalStore(subscribe, getSnapshot);
  const notifications: Notification[] = JSON.parse(raw);

  const addNotification = useCallback((n: Omit<Notification, "id" | "read" | "timestamp">) => {
    const existing: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift({
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      read: false,
      timestamp: new Date().toISOString(),
    });
    if (existing.length > 50) existing.length = 50;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    emitChange();
  }, []);

  const markRead = useCallback((id: string) => {
    const existing: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = existing.map((n) => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    emitChange();
  }, []);

  const markAllRead = useCallback(() => {
    const existing: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = existing.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    emitChange();
  }, []);

  const clearAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "[]");
    emitChange();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, addNotification, markRead, markAllRead, clearAll, unreadCount };
}

export function useFollowedTopics() {
  const raw = useSyncExternalStore(subscribe, getTopicsSnapshot);
  const topics: string[] = JSON.parse(raw);

  const followTopic = useCallback((topic: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(TOPICS_KEY) || "[]");
    if (!existing.includes(topic)) {
      existing.push(topic);
      localStorage.setItem(TOPICS_KEY, JSON.stringify(existing));
      emitChange();
    }
  }, []);

  const unfollowTopic = useCallback((topic: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(TOPICS_KEY) || "[]");
    localStorage.setItem(TOPICS_KEY, JSON.stringify(existing.filter((t) => t !== topic)));
    emitChange();
  }, []);

  const isFollowing = useCallback((topic: string) => topics.includes(topic), [topics]);

  return { topics, followTopic, unfollowTopic, isFollowing };
}
