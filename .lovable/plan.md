

# Nirvaha Home — Optimization Plan

Restructure Home into a 3-tier hierarchy (hero → rails → tiles), make emotion chips functional, and surface real content above the fold. Brand, routes, and animations preserved.

## New Home Structure

```text
┌──────────────────────────────────────┐
│ Good evening, Aarav      [avatar•]   │  time-aware greeting + notif dot
│ How are you feeling?                 │
│ [😊][😌][😟][😡] More                 │  emotion chips → re-rank below
├──────────────────────────────────────┤
│ AI HERO — Talk to Nirvaha            │  Tier 1: only full hero
│ Private · Anonymous · Not medical    │  trust microcopy
├──────────────────────────────────────┤
│ Companions          View All →       │  Tier 2: horizontal rail
│ (○)(○)(○)(○)(○)  ← avatars + names   │
├──────────────────────────────────────┤
│ From the Collection View All →       │  Tier 2: thumbnail rail
│ [thumb 12m][thumb 8m][thumb 15m]     │  duration badges
├──────────────────────────────────────┤
│ Sound Healing       View All →       │  Tier 2: chip rail
│ [Binaural][Solfeggio][Nature]        │
├──────────────────────────────────────┤
│ [Community]   [Journal]              │  Tier 3: compact 2-col tiles
│ [Wisdom]      [Wellness]             │
├──────────────────────────────────────┤
│ Smart Actions (3 chips)              │  micro CTAs
│ 7-day streak ▸                       │  thin stat strip
└──────────────────────────────────────┘
```

## Files Changed

**New components:**
- `src/components/home/SectionHeader.tsx` — title + subtitle + "View All →"
- `src/components/home/MentorRail.tsx` — horizontal avatars from `companionData`
- `src/components/home/CollectionRail.tsx` — horizontal thumbnails + duration badges from `collectionData`
- `src/components/home/SoundRail.tsx` — horizontal chips from `soundCategoryData`
- `src/components/home/CompactTile.tsx` — small icon + title + subtitle tile
- `src/components/home/GreetingHeader.tsx` — time-aware greeting, avatar, notif dot

**Edited:**
- `src/pages/Home.tsx` — full restructure, holds `selectedEmotion` and passes to rails for re-ranking
- `src/components/home/EmotionChips.tsx` — already emits selection (no schema change)
- `src/components/skeletons/HomeSkeleton.tsx` — match new layout (rails + tiles)

**Preserved (not used on Home, kept for other surfaces):**
- `CompanionCard`, `CollectionCard`, `CommunityCard`, `WisdomSelfieCard`, `JournalCard`, `SoundHealingCard` — left intact

## Key Behaviors

1. **Greeting**: "Good morning/afternoon/evening" by `new Date().getHours()`. Avatar tap → `/profile`. Red dot if notifications unread.
2. **Emotion → re-ranking**: `selectedEmotion` state in `Home.tsx` is passed to rails. Each rail re-orders its items via a small `rankByEmotion(items, emotion)` helper:
   - Stressed/Angry → Sound Healing rail moves above Collection; Breathing items first
   - Sad/Hurt → Companions rail prioritized; Journal tile gets a subtle gold ring
   - Joyful/Grateful → Community + Wisdom Selfie tiles highlighted
   - A 1-line acknowledgment appears above AI Hero: e.g. "Let's slow it down together."
3. **Duration badges**: Read existing `duration` fields on `collectionData` / `soundCategoryData`; render as a small pill on each thumbnail.
4. **Trust microcopy**: One line under AI Hero — "Private · Anonymous · Not a substitute for medical care."
5. **Smart Actions**: Compressed into a single horizontal row of 3 chips (kept, not removed).
6. **Skeleton**: Updated to mirror rails + tiles for first-paint accuracy.

## Design Tokens (no new tokens)
- Reuses `glass-card`, `--healing-green`, `--gold`, existing `font-display` / `font-body`.
- Rails: `overflow-x-auto` with `scrollbar-width: none`, items `flex-shrink-0`.
- Tiles: `aspect-square` or `h-28`, glassmorphism, `backdrop-blur-md`.
- Light + dark mode safe (uses theme tokens, not hardcoded colors).

## What This Fixes

| Before | After |
|---|---|
| 9 full-width hero cards, ~2400px scroll | 1 hero + 3 rails + 4 tiles, ~1300px scroll |
| Emotion chips decorative | Chips re-rank rails + show acknowledgment |
| No durations / no faces | Real avatars + duration badges visible |
| Flat hierarchy | 3 clear tiers |
| No greeting personalization | Time-aware greeting + avatar + notif dot |
| No trust signals | Privacy microcopy under hero |

## Out of Scope
- No new routes, no dependency changes, no backend.
- AI Hero card untouched (strongest element).
- Bottom nav untouched.
- Existing `*Card` components preserved for reuse elsewhere.

