import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMoodLog } from "../use-mood-log";

describe("useMoodLog", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty", () => {
    const { result } = renderHook(() => useMoodLog());
    expect(result.current.moodLog).toEqual([]);
  });

  it("logs a mood and persists it", () => {
    const { result } = renderHook(() => useMoodLog());
    act(() => result.current.logMood("Calm"));
    expect(result.current.moodLog).toHaveLength(1);
    expect(result.current.moodLog[0].mood).toBe("Calm");
    expect(JSON.parse(localStorage.getItem("nirvaha_moods")!)).toHaveLength(1);
  });

  it("syncs across two hook instances", () => {
    const a = renderHook(() => useMoodLog());
    const b = renderHook(() => useMoodLog());
    act(() => a.result.current.logMood("Joyful"));
    expect(b.result.current.moodLog).toHaveLength(1);
    expect(b.result.current.moodLog[0].mood).toBe("Joyful");
  });

  it("returns a stable array reference between renders when raw is unchanged", () => {
    const { result, rerender } = renderHook(() => useMoodLog());
    const first = result.current.moodLog;
    rerender();
    expect(result.current.moodLog).toBe(first);
  });
});
