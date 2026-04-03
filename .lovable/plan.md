
## Companion Mode — Deep Analysis & Build Plan

### 🧠 Strategic Analysis (Lead PM Lens)

**Positioning**: Companion Mode is Nirvaha's monetization & differentiation layer — it bridges AI self-help with human expertise, creating a flywheel:
- AI conversations → surface user needs → recommend mentors → sessions improve AI context → better recommendations

**Key Insight**: The user provided specs for TWO distinct experiences:
1. **General Mentors** (Career, Relationships, Purpose, Emotional Regulation) — marketplace model with ratings, pricing, instant booking
2. **Spiritual Guides** (Monks, Practitioners, Meditation teachers) — sacred model with donation-based, request-based, no ratings

These require **different UX flows, different trust signals, different booking mechanics**.

---

### 📐 Feature Architecture (Phased)

#### Phase 1: UI Foundation (What we build NOW — frontend-only, no backend)
1. **Companion Mode Entry Point** — New card on Home page with two paths: "Talk to a Companion" / "Become a Companion"
2. **Companion Hub Page** (`/companion`) — Landing with two sections: Mentors & Spiritual Guides
3. **Mentor Listing Page** — Browse/filter mentors with "For You" top 3 + full list
4. **Spiritual Guide Listing Page** — Separate browse experience (humble, no ratings)
5. **Mentor Profile Page** — Full profile with all layers (trust, connection, specificity, social proof, logistics)
6. **Spiritual Guide Profile Page** — Different structure (teaching-focused, donation-based, request model)
7. **Booking Flow** — Session type selection → time slot → payment summary → confirmation
8. **Become a Companion Flow** — Application/onboarding entry point

#### Phase 2: Backend (Requires Lovable Cloud)
- Mentor/Guide profiles table, reviews, bookings, payments
- Matching algorithm, session infrastructure, moderation

---

### 🎨 UX Flow Map

```
Home Page
  └─ Companion Mode Card
       ├─ "Talk to a Companion" →
       │    └─ Companion Hub
       │         ├─ "For You" (AI-matched top 3)
       │         ├─ Mentors Section → Mentor List → Mentor Profile → Book Session
       │         └─ Spiritual Guides → Guide List → Guide Profile → Request Session
       └─ "Become a Companion" →
            └─ Application Flow (name, credentials, specialization, video intro)
```

---

### 🧪 Behavior Analysis

**Retention Hooks**:
- Post-session AI follow-up ("How did it go with [Mentor]?")
- Progress tracking tied to mentor sessions
- "Your mentor suggested..." action items in home feed

**Trust Architecture**:
- Mentors: Verification badges + ratings + reviews (marketplace trust)
- Guides: Lineage verification + institutional affiliation + community endorsement (sacred trust)

---

### 📋 Build Order (Phase 1)

1. Create Companion Mode card on Home page
2. Build `/companion` hub page with two-path navigation
3. Build Mentor listing with mock data (cards, filters, "For You")
4. Build Spiritual Guide listing with different visual treatment
5. Build Mentor Profile page (all 6 layers from spec)
6. Build Spiritual Guide Profile page (different structure)
7. Build Booking/Request flow
8. Build "Become a Companion" entry page
9. Add route to BottomNav or integrate navigation
10. Polish animations, transitions, mobile responsiveness
