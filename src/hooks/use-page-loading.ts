import { useState, useEffect } from "react";

/**
 * Simulates a brief loading state for skeleton screens.
 * Returns true while "loading", false once ready.
 */
export function usePageLoading(durationMs = 200): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Cap any caller-supplied delay so pages always feel snappy (<= 250ms).
    const capped = Math.min(durationMs, 250);
    const timer = setTimeout(() => setLoading(false), capped);
    return () => clearTimeout(timer);
  }, [durationMs]);
  return loading;
}
