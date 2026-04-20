import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AiHeroCard from "./AiHeroCard";
import CompanionCard from "./CompanionCard";
import CollectionCard from "./CollectionCard";
import SoundHealingCard from "./SoundHealingCard";
import CommunityCard from "./CommunityCard";
import WisdomSelfieCard from "./WisdomSelfieCard";
import WellnessCard from "./WellnessCard";

type SlideId = "ai" | "companion" | "collection" | "sound" | "community" | "selfie" | "wellness";

const baseSlides: { id: SlideId; node: JSX.Element }[] = [
  { id: "ai", node: <AiHeroCard /> },
  { id: "companion", node: <CompanionCard /> },
  { id: "collection", node: <CollectionCard /> },
  { id: "sound", node: <SoundHealingCard /> },
  { id: "community", node: <CommunityCard /> },
  { id: "selfie", node: <WisdomSelfieCard /> },
  { id: "wellness", node: <WellnessCard /> },
];

const HEAVY = ["Stressed", "Angry", "Sensitive", "Hurt", "Insecure", "Guilty"];
const LIGHT = ["Joyful", "Grateful", "Excited"];
const CALM = ["Calm"];

const getSlideOrder = (emotion: string | null): SlideId[] => {
  // Default order — AI first
  const def: SlideId[] = ["ai", "companion", "collection", "sound", "community", "selfie", "wellness"];
  if (!emotion) return def;
  if (HEAVY.includes(emotion)) {
    // Soothe first
    return ["sound", "ai", "companion", "collection", "selfie", "community", "wellness"];
  }
  if (LIGHT.includes(emotion)) {
    // Connection & expansion first
    return ["community", "collection", "ai", "selfie", "companion", "sound", "wellness"];
  }
  if (CALM.includes(emotion)) {
    return ["collection", "sound", "ai", "selfie", "companion", "community", "wellness"];
  }
  // Confused / Bored — discovery first
  return ["selfie", "collection", "ai", "community", "companion", "sound", "wellness"];
};

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_MS = 10000;

interface HeroCarouselProps {
  emotion?: string | null;
}

const HeroCarousel = ({ emotion = null }: HeroCarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIdxRef = useRef(0);
  const cycleStartRef = useRef<number>(Date.now());

  const slides = useMemo(() => {
    const order = getSlideOrder(emotion);
    return order
      .map((id) => baseSlides.find((s) => s.id === id))
      .filter((s): s is { id: SlideId; node: JSX.Element } => Boolean(s));
  }, [emotion]);

  // Reset to first slide when emotion (and thus order) changes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "auto" });
    setActiveIdx(0);
    activeIdxRef.current = 0;
    cycleStartRef.current = Date.now();
    setProgress(0);
  }, [emotion]);

  // Track scroll → update active index
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / w);
      if (idx !== activeIdxRef.current) {
        setActiveIdx(idx);
        activeIdxRef.current = idx;
        cycleStartRef.current = Date.now();
        setProgress(0);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const wrapped = ((i % slides.length) + slides.length) % slides.length;
      el.scrollTo({ left: wrapped * el.clientWidth, behavior: "smooth" });
    },
    [slides.length]
  );

  // Pause auto-advance, then resume after inactivity window
  const pauseAndScheduleResume = useCallback(() => {
    setIsPaused(true);
    setProgress(0);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      cycleStartRef.current = Date.now();
      setIsPaused(false);
    }, RESUME_AFTER_MS);
  }, []);

  // Auto-advance loop + progress tick
  useEffect(() => {
    if (isPaused) return;
    cycleStartRef.current = Date.now();
    setProgress(0);

    advanceTimerRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % slides.length;
      scrollToIndex(next);
    }, AUTO_ADVANCE_MS);

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - cycleStartRef.current;
      const pct = Math.min(100, (elapsed / AUTO_ADVANCE_MS) * 100);
      setProgress(pct);
    }, 50);

    return () => {
      if (advanceTimerRef.current) clearInterval(advanceTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused, scrollToIndex, slides.length]);

  // Pause on user interaction with the scroller (touch / wheel / pointer)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const handler = () => pauseAndScheduleResume();
    el.addEventListener("touchstart", handler, { passive: true });
    el.addEventListener("pointerdown", handler, { passive: true });
    el.addEventListener("wheel", handler, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handler);
      el.removeEventListener("pointerdown", handler);
      el.removeEventListener("wheel", handler);
    };
  }, [pauseAndScheduleResume]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (advanceTimerRef.current) clearInterval(advanceTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  const handleManualNav = (i: number) => {
    pauseAndScheduleResume();
    scrollToIndex(i);
  };

  return (
    <div className="-mx-5 mb-3 relative">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((s) => (
          <div key={s.id} className="snap-center shrink-0 w-full px-5">
            <div className="[&>div]:!mb-0">{s.node}</div>
          </div>
        ))}
      </div>

      {/* Side arrow buttons — desktop/tablet primary, also tappable on mobile */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => handleManualNav(activeIdx - 1)}
        aria-label="Previous slide"
        className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border z-10"
        style={{
          background: "hsla(var(--background) / 0.7)",
          borderColor: "hsla(var(--glass-border))",
          backdropFilter: "blur(10px)",
        }}
      >
        <ChevronLeft size={18} className="text-foreground" />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => handleManualNav(activeIdx + 1)}
        aria-label="Next slide"
        className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border z-10"
        style={{
          background: "hsla(var(--background) / 0.7)",
          borderColor: "hsla(var(--glass-border))",
          backdropFilter: "blur(10px)",
        }}
      >
        <ChevronRight size={18} className="text-foreground" />
      </motion.button>

      {/* Dots + progress bar */}
      <div className="flex flex-col items-center gap-2 mt-3">
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((s, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => handleManualNav(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: active ? 18 : 6,
                  background: active
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.35)",
                }}
              />
            );
          })}
        </div>

        {/* Subtle progress bar — telegraphs the 5s auto-advance */}
        <div
          className="h-[2px] w-24 rounded-full overflow-hidden"
          style={{ background: "hsl(var(--muted-foreground) / 0.18)" }}
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${isPaused ? 0 : progress}%`,
              background: "hsl(var(--primary) / 0.85)",
              transition: isPaused ? "width 200ms ease-out" : "width 80ms linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
