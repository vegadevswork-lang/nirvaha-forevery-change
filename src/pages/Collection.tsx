import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Play, Star, Clock, Bookmark, BookmarkCheck, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import {
  heroSlides,
  continueWatching,
  aiRecommendations,
  contentRows,
  categories,
  getAllContent,
  type ContentItem,
} from "@/data/collectionData";
import { usePageLoading } from "@/hooks/use-page-loading";
import CollectionSkeleton from "@/components/skeletons/CollectionSkeleton";
import { useSavedContent } from "@/hooks/use-saved-content";
import NirvahaIntro from "@/components/collection/NirvahaIntro";

const typeColor: Record<string, string> = {
  series: "hsl(var(--healing-green))",
  film: "hsl(var(--gold))",
  meditation: "hsl(var(--primary))",
  podcast: "hsl(280 60% 65%)",
  talk: "hsl(200 70% 60%)",
  playlist: "hsl(var(--gold))",
  soundscape: "hsl(180 50% 55%)",
};

const Collection = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading(800);
  const showIntro = false;
  const [activeNav, setActiveNav] = useState("Home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { isSaved, toggleSave } = useSavedContent();

  // Auto-slide hero
  const nextSlide = useCallback(() => {
    setHeroIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (showIntro) {
    return <NirvahaIntro onComplete={() => setShowIntro(false)} />;
  }

  const hero = heroSlides[heroIndex];

  // Full search across all content
  const allContent = getAllContent();
  const searchResults = searchQuery
    ? allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredRows = contentRows
    .map((row) => ({
      ...row,
      items: row.items.filter((item) => {
        const matchesCategory =
          activeCategory === "All" ||
          (activeCategory === "Meditation" && (item.type === "meditation" || item.type === "soundscape")) ||
          (activeCategory === "Series" && item.type === "series") ||
          (activeCategory === "Talks" && item.type === "talk") ||
          (activeCategory === "Sound Therapy" && item.type === "soundscape") ||
          (activeCategory === "Podcasts" && item.type === "podcast") ||
          (activeCategory === "Films" && item.type === "film");
        return matchesCategory;
      }),
    }))
    .filter((row) => row.items.length > 0);

  if (isLoading) return <CollectionSkeleton />;

  const showSearchResults = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "8%", right: "-12%", background: "hsl(260 30% 25%)" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, bottom: "35%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      <div className="flex-1 overflow-y-auto pb-28 relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-30 px-5 pt-10 pb-3" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
              >
                <ArrowLeft size={18} className="text-foreground" />
              </motion.button>
              {!searchOpen && (
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-lg text-foreground font-semibold">
                  Collection
                </motion.h1>
              )}
            </div>
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                    style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
                  >
                    <Search size={14} className="text-muted-foreground flex-shrink-0" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search content, tags..."
                      className="bg-transparent text-sm text-foreground outline-none flex-1 font-body placeholder:text-muted-foreground"
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <motion.button
                      key="saved-btn"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate("/my-list")}
                      className="w-9 h-9 rounded-2xl flex items-center justify-center"
                      style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
                    >
                      <Bookmark size={18} className="text-foreground" />
                    </motion.button>
                    <motion.button
                      key="search-btn"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchOpen(true)}
                      className="w-9 h-9 rounded-2xl flex items-center justify-center"
                      style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
                    >
                      <Search size={18} className="text-foreground" />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Search Results View */}
        {showSearchResults ? (
          <div className="px-5 mt-2">
            <p className="font-body text-xs text-muted-foreground mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <Search size={32} className="text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="font-display text-base text-muted-foreground">No results found</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Try different keywords or tags</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((item, i) => (
                  <SearchResultCard
                    key={item.id}
                    item={item}
                    index={i}
                    isSaved={isSaved(item.id)}
                    onToggleSave={() => toggleSave(item.id)}
                    onSelect={() => navigate(`/collection/${item.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Hero Carousel */}
            <div className="relative mx-5 rounded-3xl overflow-hidden mb-2" style={{ height: 220 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hero.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img src={hero.image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.85) 0%, hsla(0 0% 0% / 0.2) 50%, transparent)" }}
                  />
                  {/* Save button on hero */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); toggleSave(hero.id); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center z-10"
                    style={{ background: "hsla(0 0% 0% / 0.4)", backdropFilter: "blur(8px)" }}
                  >
                    {isSaved(hero.id) ? (
                      <BookmarkCheck size={16} style={{ color: "hsl(var(--gold))" }} />
                    ) : (
                      <Bookmark size={16} style={{ color: "hsl(0 0% 100%)" }} />
                    )}
                  </motion.button>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-body font-semibold uppercase tracking-wider"
                        style={{ background: "hsl(var(--gold))", color: "hsl(0 0% 5%)" }}
                      >
                        Featured
                      </span>
                      <span className="text-[10px] font-body" style={{ color: "hsla(0 0% 100% / 0.7)" }}>
                        {hero.type} · {hero.duration}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold leading-tight mb-1" style={{ color: "hsl(0 0% 95%)" }}>
                      {hero.title}
                    </h2>
                    <p className="font-body text-[10px] leading-relaxed mb-3 line-clamp-2" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
                      {hero.subtitle}
                    </p>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/collection/${hero.id}`)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-medium text-xs"
                        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                      >
                        <Play size={14} fill="currentColor" />
                        Play
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/my-list")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-medium text-xs"
                        style={{ background: "hsla(0 0% 100% / 0.15)", color: "hsl(0 0% 95%)", backdropFilter: "blur(8px)" }}
                      >
                        <Bookmark size={14} />
                        My List
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center gap-1.5 mb-5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: heroIndex === i ? 20 : 6,
                    height: 6,
                    background: heroIndex === i ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    opacity: heroIndex === i ? 1 : 0.4,
                  }}
                />
              ))}
            </div>

            {/* Category pills */}
            <div className="flex gap-2 px-5 mb-5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-4 py-2 rounded-xl font-body text-xs font-medium transition-colors"
                  style={{
                    background: activeCategory === cat ? "hsl(var(--primary))" : "hsla(var(--glass-bg))",
                    color: activeCategory === cat ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                    border: `1px solid ${activeCategory === cat ? "transparent" : "hsla(var(--glass-border))"}`,
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Continue Watching */}
            {continueWatching.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between px-5 mb-3">
                  <h3 className="font-display text-sm font-semibold text-foreground">Continue Watching</h3>
                </div>
                <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar">
                  {continueWatching.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex-shrink-0 rounded-2xl overflow-hidden text-left relative"
                      style={{ width: 160 }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(`/collection/${item.id}`)}
                        className="w-full"
                      >
                        <div className="relative" style={{ height: 100 }}>
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
                          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.7) 0%, transparent 50%)" }} />
                          <div className="absolute bottom-0 left-0 right-0 p-2">
                            <p className="font-display text-[10px] font-semibold leading-tight line-clamp-1" style={{ color: "hsl(0 0% 95%)" }}>
                              {item.title}
                            </p>
                            <p className="text-[8px] font-body mt-0.5" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
                              {item.duration}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "hsla(0 0% 100% / 0.9)" }}>
                            <Play size={10} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
                          </div>
                        </div>
                      </motion.button>
                      {/* Bookmark button */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleSave(item.id)}
                        className="absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center z-10"
                        style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(4px)" }}
                      >
                        {isSaved(item.id) ? (
                          <BookmarkCheck size={12} style={{ color: "hsl(var(--gold))" }} />
                        ) : (
                          <Bookmark size={12} style={{ color: "hsl(0 0% 100%)" }} />
                        )}
                      </motion.button>
                      {item.progress != null && (
                        <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${item.progress}%`, background: "hsl(var(--primary))" }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            <div className="mb-6">
              <div className="flex items-center gap-2 px-5 mb-3">
                <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
                <h3 className="font-display text-sm font-semibold text-foreground">Nirvaha AI Picks for You</h3>
              </div>
              <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar">
                {aiRecommendations.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex-shrink-0 rounded-2xl overflow-hidden text-left relative"
                    style={{ width: 150 }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/collection/${item.id}`)}
                      className="w-full"
                    >
                      <div className="relative" style={{ height: 200 }}>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
                        <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.8) 0%, transparent 50%)" }} />
                        <div className="absolute top-2 left-2 right-10">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[8px] font-body"
                            style={{ background: "hsla(var(--gold) / 0.2)", color: "hsl(var(--gold))", backdropFilter: "blur(4px)" }}
                          >
                            <Sparkles size={8} />
                            AI Pick
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <p className="font-display text-[11px] font-semibold leading-tight line-clamp-2 mb-0.5" style={{ color: "hsl(0 0% 95%)" }}>
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-[8px] font-body line-clamp-1" style={{ color: "hsla(0 0% 100% / 0.5)" }}>
                              {item.subtitle}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {item.rating && (
                              <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsl(var(--gold))" }}>
                                <Star size={8} fill="currentColor" /> {item.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                    {/* Bookmark */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleSave(item.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center z-10"
                      style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(4px)" }}
                    >
                      {isSaved(item.id) ? (
                        <BookmarkCheck size={13} style={{ color: "hsl(var(--gold))" }} />
                      ) : (
                        <Bookmark size={13} style={{ color: "hsl(0 0% 100%)" }} />
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content Rows */}
            {filteredRows.map((row, ri) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * ri }}
                className="mb-6"
              >
                <div className="flex items-center justify-between px-5 mb-3">
                  <h3 className="font-display text-sm font-semibold text-foreground">{row.title}</h3>
                  <button
                    onClick={() => setActiveCategory(row.title.includes("Meditation") ? "Meditation" : row.title.includes("Talk") ? "Talks" : row.title.includes("Sound") ? "Sound Therapy" : "All")}
                    className="font-body text-[10px] font-medium"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    See All
                  </button>
                </div>
                <div
                  ref={(el) => { scrollRefs.current[row.title] = el; }}
                  className="flex gap-3 px-5 overflow-x-auto no-scrollbar"
                  style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}
                >
                  {row.items.map((item, i) => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      index={i}
                      isSaved={isSaved(item.id)}
                      onToggleSave={() => toggleSave(item.id)}
                      onSelect={() => navigate(`/collection/${item.id}`)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredRows.length === 0 && (
              <div className="text-center py-16 px-5">
                <p className="font-display text-base text-muted-foreground">No content found</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Try a different category or search term</p>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

/* Search Result Card — grid layout */
const SearchResultCard = ({
  item,
  index,
  isSaved,
  onToggleSave,
  onSelect,
}: {
  item: ContentItem;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
  onSelect: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.04 * index }}
    className="rounded-2xl overflow-hidden relative"
  >
    <motion.button whileTap={{ scale: 0.97 }} onClick={onSelect} className="w-full text-left">
      <div className="relative" style={{ height: 160 }}>
        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
        <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.8) 0%, transparent 50%)" }} />
        <div className="absolute top-2 left-2">
          <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-semibold uppercase" style={{ background: typeColor[item.type], color: "hsl(0 0% 100%)" }}>
            {item.type === "soundscape" ? "Sound" : item.type}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="font-display text-[11px] font-semibold leading-tight line-clamp-2" style={{ color: "hsl(0 0% 95%)" }}>
            {item.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {item.rating && (
              <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsl(var(--gold))" }}>
                <Star size={8} fill="currentColor" /> {item.rating}
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
                <Clock size={8} /> {item.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
    {/* Bookmark */}
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={onToggleSave}
      className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center z-10"
      style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(4px)" }}
    >
      {isSaved ? (
        <BookmarkCheck size={13} style={{ color: "hsl(var(--gold))" }} />
      ) : (
        <Bookmark size={13} style={{ color: "hsl(0 0% 100%)" }} />
      )}
    </motion.button>
  </motion.div>
);

/* Content Row Card with bookmark */
const ContentCard = ({
  item,
  index,
  isSaved,
  onToggleSave,
  onSelect,
}: {
  item: ContentItem;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
  onSelect: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.05 * index }}
    className="flex-shrink-0 rounded-2xl overflow-hidden text-left relative group"
    style={{ width: 140, scrollSnapAlign: "start" }}
  >
    <motion.button whileTap={{ scale: 0.97 }} onClick={onSelect} className="w-full">
      <div className="relative" style={{ height: 190 }}>
        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
        <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.7) 0%, transparent 50%)" }} />
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isNew && (
            <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-bold uppercase" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>New</span>
          )}
          {item.isTrending && (
            <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-bold uppercase" style={{ background: "hsl(var(--gold))", color: "hsl(0 0% 5%)" }}>Hot</span>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-semibold uppercase" style={{ background: typeColor[item.type] || "hsl(var(--muted))", color: "hsl(0 0% 100%)" }}>
            {item.type === "soundscape" ? "Sound" : item.type}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ background: "hsla(0 0% 0% / 0.3)" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsla(0 0% 100% / 0.9)" }}>
            <Play size={16} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="font-display text-[11px] font-semibold leading-tight line-clamp-2" style={{ color: "hsl(0 0% 95%)" }}>
            {item.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {item.rating && (
              <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsl(var(--gold))" }}>
                <Star size={8} fill="currentColor" /> {item.rating}
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
                <Clock size={8} /> {item.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
    {/* Bookmark overlay */}
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={onToggleSave}
      className="absolute bottom-[52px] right-2 w-7 h-7 rounded-lg flex items-center justify-center z-10"
      style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(4px)" }}
    >
      {isSaved ? (
        <BookmarkCheck size={13} style={{ color: "hsl(var(--gold))" }} />
      ) : (
        <Bookmark size={13} style={{ color: "hsl(0 0% 100% / 0.7)" }} />
      )}
    </motion.button>
  </motion.div>
);

export default Collection;
