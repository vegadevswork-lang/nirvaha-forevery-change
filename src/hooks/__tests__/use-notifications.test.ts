import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNotifications, useFollowedTopics } from "../use-notifications";

describe("useNotifications", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty with zero unread", () => {
    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toEqual([]);
    expect(result.current.unreadCount).toBe(0);
  });

  it("adds a notification at the top", () => {
    const { result } = renderHook(() => useNotifications());
    act(() => result.current.addNotification({ type: "reply", title: "Hi", body: "x" }));
    act(() => result.current.addNotification({ type: "mention", title: "Yo", body: "y" }));
    expect(result.current.notifications).toHaveLength(2);
    expect(result.current.notifications[0].title).toBe("Yo");
    expect(result.current.unreadCount).toBe(2);
  });

  it("markRead / markAllRead / clearAll work", () => {
    const { result } = renderHook(() => useNotifications());
    act(() => result.current.addNotification({ type: "reply", title: "1", body: "" }));
    act(() => result.current.addNotification({ type: "reply", title: "2", body: "" }));
    const id = result.current.notifications[0].id;
    act(() => result.current.markRead(id));
    expect(result.current.unreadCount).toBe(1);
    act(() => result.current.markAllRead());
    expect(result.current.unreadCount).toBe(0);
    act(() => result.current.clearAll());
    expect(result.current.notifications).toEqual([]);
  });

  it("caps notifications at 50", () => {
    const { result } = renderHook(() => useNotifications());
    act(() => {
      for (let i = 0; i < 60; i++) {
        result.current.addNotification({ type: "reply", title: `n${i}`, body: "" });
      }
    });
    expect(result.current.notifications).toHaveLength(50);
  });
});

describe("useFollowedTopics", () => {
  beforeEach(() => localStorage.clear());

  it("follows and unfollows topics without duplicates", () => {
    const { result } = renderHook(() => useFollowedTopics());
    act(() => result.current.followTopic("anxiety"));
    act(() => result.current.followTopic("anxiety"));
    act(() => result.current.followTopic("focus"));
    expect(result.current.topics).toEqual(["anxiety", "focus"]);
    expect(result.current.isFollowing("anxiety")).toBe(true);
    act(() => result.current.unfollowTopic("anxiety"));
    expect(result.current.isFollowing("anxiety")).toBe(false);
    expect(result.current.topics).toEqual(["focus"]);
  });
});
