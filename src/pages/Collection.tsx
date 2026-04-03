import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Play, Star, Clock, Bookmark, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import { heroContent, contentRows, categories, type ContentItem } from "@/data/collectionData";

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
  const [activeNav, setActiveNav] = useState("Home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
        const matchesSearch =
          !searchQuery ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      }),
    }))
    .filter((row) => row.items.length > 0);

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
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-lg text-foreground font-semibold"
                >
                  Collection
                </motion.h1>
              )}
            </div>

            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "70%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                  style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
                >
                  <Search size={14} className="text-muted-foreground flex-shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search content..."
                    className="bg-transparent text-sm text-foreground outline-none flex-1 font-body placeholder:text-muted-foreground"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-2xl flex items-center justify-center"
                  style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
                >
                  <Search size={18} className="text-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-5 rounded-3xl overflow-hidden mb-5"
          style={{ height: 220 }}
        >
          <img
            src={heroContent.image}
            alt={heroContent.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.85) 0%, hsla(0 0% 0% / 0.2) 50%, transparent)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-body font-semibold uppercase tracking-wider"
                style={{ background: "hsl(var(--gold))", color: "hsl(0 0% 5%)" }}
              >
                Featured
              </span>
              <span className="text-[10px] font-body" style={{ color: "hsla(0 0% 100% / 0.7)" }}>
                {heroContent.type} · {heroContent.duration}
              </span>
            </div>
            <h2 className="font-display text-xl font-semibold leading-tight mb-1" style={{ color: "hsl(0 0% 95%)" }}>
              {heroContent.title}
            </h2>
            <p className="font-body text-[10px] leading-relaxed mb-3 line-clamp-2" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
              {heroContent.subtitle}
            </p>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-medium text-xs"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
              >
                <Play size={14} fill="currentColor" />
                Play
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body font-medium text-xs"
                style={{ background: "hsla(0 0% 100% / 0.15)", color: "hsl(0 0% 95%)", backdropFilter: "blur(8px)" }}
              >
                <Bookmark size={14} />
                My List
              </motion.button>
            </div>
          </div>
        </motion.div>

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
              <button className="font-body text-[10px] font-medium" style={{ color: "hsl(var(--primary))" }}>
                See All
              </button>
            </div>
            <div
              ref={(el) => { scrollRefs.current[row.title] = el; }}
              className="flex gap-3 px-5 overflow-x-auto no-scrollbar"
            >
              {row.items.map((item, i) => (
                <ContentCard key={item.id} item={item} index={i} onSelect={setSelectedItem} />
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
      </div>

      {/* Detail Sheet */}
      <AnimatePresence>
        {selectedItem && (
          <ContentDetailSheet item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

const ContentCard = ({
  item,
  index,
  onSelect,
}: {
  item: ContentItem;
  index: number;
  onSelect: (item: ContentItem) => void;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.05 * index }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onSelect(item)}
    className="flex-shrink-0 rounded-2xl overflow-hidden text-left relative group"
    style={{ width: 140 }}
  >
    <div className="relative" style={{ height: 190 }}>
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover rounded-2xl"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.7) 0%, transparent 50%)" }}
      />
      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-1">
        {item.isNew && (
          <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-bold uppercase" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            New
          </span>
        )}
        {item.isTrending && (
          <span className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-bold uppercase" style={{ background: "hsl(var(--gold))", color: "hsl(0 0% 5%)" }}>
            Hot
          </span>
        )}
      </div>
      {/* Type badge */}
      <div className="absolute top-2 right-2">
        <span
          className="px-1.5 py-0.5 rounded-md text-[8px] font-body font-semibold uppercase"
          style={{ background: typeColor[item.type] || "hsl(var(--muted))", color: "hsl(0 0% 100%)" }}
        >
          {item.type === "soundscape" ? "Sound" : item.type}
        </span>
      </div>
      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ background: "hsla(0 0% 0% / 0.3)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsla(0 0% 100% / 0.9)" }}>
          <Play size={16} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
        </div>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="font-display text-[11px] font-semibold leading-tight line-clamp-2" style={{ color: "hsl(0 0% 95%)" }}>
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {item.rating && (
            <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsl(var(--gold))" }}>
              <Star size={8} fill="currentColor" />
              {item.rating}
            </span>
          )}
          {item.duration && (
            <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsla(0 0% 100% / 0.6)" }}>
              <Clock size={8} />
              {item.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.button>
);

const ContentDetailSheet = ({
  item,
  onClose,
}: {
  item: ContentItem;
  onClose: () => void;
}) => (
  <>
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50"
      style={{ background: "hsla(0 0% 0% / 0.6)", backdropFilter: "blur(4px)" }}
    />
    {/* Sheet */}
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
      style={{ background: "hsl(var(--card))", maxHeight: "85vh" }}
    >
      {/* Hero image */}
      <div className="relative" style={{ height: 220 }}>
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 60%)" }} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "hsla(0 0% 0% / 0.5)", backdropFilter: "blur(8px)" }}
        >
          <X size={16} style={{ color: "hsl(0 0% 100%)" }} />
        </button>
      </div>

      <div className="px-5 pb-8 -mt-8 relative z-10">
        {/* Type & duration */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-body font-semibold uppercase"
            style={{ background: typeColor[item.type], color: "hsl(0 0% 100%)" }}
          >
            {item.type}
          </span>
          {item.duration && (
            <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
              <Clock size={10} /> {item.duration}
            </span>
          )}
          {item.rating && (
            <span className="flex items-center gap-1 text-[10px] font-body" style={{ color: "hsl(var(--gold))" }}>
              <Star size={10} fill="currentColor" /> {item.rating}
            </span>
          )}
        </div>

        <h2 className="font-display text-xl font-semibold text-foreground leading-tight mb-2">
          {item.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[10px] font-body text-muted-foreground"
              style={{ background: "hsl(var(--muted))" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <Play size={16} fill="currentColor" />
            Play Now
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl font-body font-medium text-xs"
            style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
          >
            <Bookmark size={14} />
            Save
          </motion.button>
        </div>
      </div>
    </motion.div>
  </>
);

export default Collection;
