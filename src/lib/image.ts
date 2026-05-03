/**
 * Normalize an Unsplash URL with appropriate width, quality and format params.
 * If the URL isn't an Unsplash URL we return it unchanged.
 *
 * Usage: unsplash(url, 600) → adds ?w=600&q=80&auto=format&fit=crop
 * If the URL already has w= or q= params we leave it alone (caller knows best).
 */
export function unsplash(url: string, width: number, opts?: { q?: number; dpr?: number }): string {
  if (!url || !url.includes("images.unsplash.com")) return url;
  if (/[?&]w=/.test(url)) return url;
  const q = opts?.q ?? 80;
  const dpr = opts?.dpr ?? 2;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${width}&q=${q}&auto=format&fit=crop&dpr=${dpr}`;
}
