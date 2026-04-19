import { useRef, useState, useEffect } from "react";
import AiHeroCard from "./AiHeroCard";
import CompanionCard from "./CompanionCard";
import CollectionCard from "./CollectionCard";

const slides = [
  { id: "ai", node: <AiHeroCard /> },
  { id: "companion", node: <CompanionCard /> },
  { id: "collection", node: <CollectionCard /> },
];

const HeroCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / w);
      setActiveIdx(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="-mx-5 mb-3">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="snap-center shrink-0 w-full px-5"
          >
            <div className="[&>div]:!mb-0">
              {s.node}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {slides.map((s, i) => {
          const active = i === activeIdx;
          return (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
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
    </div>
  );
};

export default HeroCarousel;
