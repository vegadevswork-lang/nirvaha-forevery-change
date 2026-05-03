import { describe, it, expect } from "vitest";
import { unsplash } from "../image";

describe("unsplash()", () => {
  it("returns non-Unsplash URLs unchanged", () => {
    expect(unsplash("https://example.com/cat.jpg", 400)).toBe("https://example.com/cat.jpg");
  });

  it("appends width, quality, format and dpr params", () => {
    const u = unsplash("https://images.unsplash.com/photo-123", 600);
    expect(u).toContain("w=600");
    expect(u).toContain("q=80");
    expect(u).toContain("auto=format");
    expect(u).toContain("dpr=2");
  });

  it("does not double-apply if w= is already present", () => {
    const original = "https://images.unsplash.com/photo-123?w=400&q=90";
    expect(unsplash(original, 999)).toBe(original);
  });

  it("respects custom q and dpr overrides", () => {
    const u = unsplash("https://images.unsplash.com/photo-123", 300, { q: 60, dpr: 1 });
    expect(u).toContain("q=60");
    expect(u).toContain("dpr=1");
  });

  it("handles empty input safely", () => {
    expect(unsplash("", 400)).toBe("");
  });
});
