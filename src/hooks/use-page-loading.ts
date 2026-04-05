import { useState, useEffect } from "react";

/**
 * Simulates a brief loading state for skeleton screens.
 * Returns true while "loading", false once ready.
 */
export function usePageLoading(durationMs = 800): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs]);
  return loading;
}
