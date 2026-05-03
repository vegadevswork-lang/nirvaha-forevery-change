
# Nirvaha — Full App Audit & Optimization Plan

## Audit Findings

**Codebase scale**
- 33 pages, 19 home components, ~9.3k LoC in pages+home alone.
- Largest pages: `Collection.tsx` (714), `Community.tsx` (527), `ContentDetail.tsx` (464), `Welcome.tsx` (276), `MentorProfile.tsx` (272), `SessionFeedback.tsx` (267).
- 93 files import `framer-motion` directly — heavy, but already routed through lazy pages.
- 50 Unsplash URLs hard-coded (no width param normalization, no `srcset`, mixed `dpr`).
- 21 raw `<img>` tags — only 5 use `loading="lazy"`, none use `decoding="async"` or width/height.
- 0 `: any` types, 0 stray `console.log` (only one legitimate `console.error` in 404). Type hygiene is good.
- `data/` is 71KB total — `companionData` (22KB) and `collectionData` (19KB) are eagerly imported into rails on Home.

**Tests**
- Only `src/test/example.test.ts` exists (1 trivial assertion). No real coverage.
- Vitest + RTL + jsdom configured and passing. Playwright fixture present, no e2e specs.

**Configuration gaps**
- `vite.config.ts` has no `build.rollupOptions.manualChunks` — vendor splitting relies entirely on route-level lazy loading.
- No image domain whitelist / no `<link rel="preconnect">` for `images.unsplash.com`.
- HMR overlay disabled (fine, intentional).

**Render/runtime hotspots (suspected, to verify)**
- `HeroCarousel` (258 LoC, 6 useEffects) — likely the biggest Home render cost.
- `EmotionChips` (267 LoC) — re-renders on every emotion tap; passes new callback identity from Home.
- `BottomNav` (193 LoC, 3 useEffects) — fine but unmemoized children.
- `useMoodLog` / `useNotifications` parse `localStorage` JSON on every snapshot read — `getSnapshot` must return a stable string (it does), but parsed array is re-created each render in consumers.

**Accessibility / polish**
- Many decorative `<img>` lack `alt=""`; some content images lack descriptive alt.
- Tap targets on `EmotionChips` and `BottomNav` look ≥44px — OK.
- No `prefers-reduced-motion` guards around the heavy framer-motion ambient pulses.

---

## Optimization Plan (prioritized)

### Tier 1 — High impact, low risk

1. **Image pipeline**
   - Add `loading="lazy"` + `decoding="async"` + explicit `width`/`height` to every `<img>` in pages/components.
   - Normalize Unsplash URLs through a tiny helper `unsplash(url, w)` that appends `?w={w}&q=80&auto=format&fit=crop` so we stop shipping 2x DPR full-bleed photos into 96px thumbs.
   - Add `<link rel="preconnect" href="https://images.unsplash.com" crossorigin>` in `index.html`.

2. **Bundle splitting in `vite.config.ts`**
   - `manualChunks`: split `react`+`react-dom`+`react-router-dom` (`react-vendor`), `framer-motion` (`motion`), `recharts` (`charts`), `@radix-ui/*` (`radix`), `lucide-react` (`icons`).
   - Expected: smaller initial chunk, better long-term caching across routes.

3. **Render hygiene on Home**
   - Wrap `EmotionChips`, `MentorRail`, `CollectionRail`, `SoundRail`, `CompactTile`, `BottomNav` in `React.memo`.
   - `useCallback` the `handleEmotionTap` and `setActiveNav` handlers in `Home.tsx`.
   - Memoize the `acknowledgments[selectedEmotion]` lookup is fine; ensure rails re-rank only on emotion change (already memoized via `useMemo`).

4. **Reduced-motion respect**
   - In `src/index.css`, add a `@media (prefers-reduced-motion: reduce)` block that disables `animate-pulse-soft`, ambient orbs, and long framer-motion loops (we'll set `transition: none !important` for safety on `.ambient-orb`).

### Tier 2 — Medium impact

5. **Data lazy loading**
   - Convert `companionData` / `collectionData` / `soundCategoryData` imports in rails to `React.lazy` data fetch via dynamic `import()` inside the rail component, so Home initial render doesn't pull 41KB of static data.

6. **Hook ergonomics**
   - In `useMoodLog` / `useNotifications`, memoize the parsed array with `useMemo([raw])` so consumers get a stable reference between unrelated renders.

### Tier 3 — Test baseline

7. **Add real Vitest coverage** for the most behavior-bearing pure logic:
   - `useMoodLog` — log + read round-trip, multi-listener sync.
   - `useNotifications` — add/markRead/markAllRead/clearAll, unread count cap.
   - `EmotionChips` — selecting a chip fires `onSelect` with correct label.
   - `SmartActions` — `subtitleByEmotion` mapping returns expected copy per mood.
   - `CompactTile` — renders title, label chip, navigates on click (RTL + memory router).

8. **Sanity smoke test** for `Home.tsx` rendering all four tiles + greeting (with router + providers).

Target: ~12 focused tests, all under 2s total. Then run `bun run test` to confirm green.

### Tier 4 — Nice-to-have (defer unless requested)

- Audit unused shadcn/ui components and tree-shake by deleting unused files (currently all 50+ ui primitives ship even if one route uses them — though Vite will tree-shake at build).
- Replace large Unsplash hero images with locally-bundled WebP variants for the 4 utility tiles.
- Extract the 700-line `Collection.tsx` into smaller subcomponents (`HeroBanner`, `RowList`, `ContentRow`).

---

## Files Touched

```text
NEW
  src/lib/image.ts                          unsplash() helper
  src/hooks/__tests__/use-mood-log.test.ts
  src/hooks/__tests__/use-notifications.test.ts
  src/components/home/__tests__/EmotionChips.test.tsx
  src/components/home/__tests__/SmartActions.test.tsx
  src/components/home/__tests__/CompactTile.test.tsx
  src/pages/__tests__/Home.test.tsx

EDIT
  vite.config.ts                            manualChunks
  index.html                                preconnect to unsplash
  src/index.css                             prefers-reduced-motion block
  src/pages/Home.tsx                        useCallback handlers
  src/components/home/{CompactTile,EmotionChips,MentorRail,
    CollectionRail,SoundRail,BottomNav}.tsx   React.memo + lazy/dimensioned imgs
  src/components/home/SmartActions.tsx      memo + reduced-motion guard
  src/hooks/{use-mood-log,use-notifications}.ts   useMemo parsed value
  src/components/home/HeroCarousel.tsx      lazy/dimensioned imgs, reduced-motion guard
  src/pages/{Collection,SoundHealing,ContentDetail,MyList,Chat}.tsx  img attrs
```

## Out of Scope
- No design changes, no route changes, no copy changes.
- No new dependencies.
- No backend / Lovable Cloud changes.
- Bottom-nav and home visual tone (recently approved) untouched.

## Validation
After implementation: `bun run test` must pass with all new specs green, app boots on `/home` with no new console warnings, and Lighthouse-style image attributes are present on every `<img>`.
