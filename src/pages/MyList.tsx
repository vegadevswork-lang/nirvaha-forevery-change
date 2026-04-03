import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bookmark, Play, Star, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import { getAllContent, type ContentItem } from "@/data/collectionData";
import { useSavedContent } from "@/hooks/use-saved-content";

const typeColor: Record<string, string> = {
  series: "hsl(var(--healing-green))",
  film: "hsl(var(--gold))",
  meditation: "hsl(var(--primary))",
  podcast: "hsl(280 60% 65%)",
  talk: "hsl(200 70% 60%)",
  playlist: "hsl(var(--gold))",
  soundscape: "hsl(180 50% 55%)",
};

const MyList = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Home");
  const { savedIds, toggleSave } = useSavedContent();

  const allContent = getAllContent();
  const savedItems = allContent.filter((c) => savedIds.includes(c.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-28 relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-30 px-5 pt-10 pb-3" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
            >
              <ArrowLeft size={18} className="text-foreground" />
            </motion.button>
            <h1 className="font-display text-lg text-foreground font-semibold">My List</h1>
            <span className="ml-auto px-2.5 py-1 rounded-xl text-[10px] font-body font-medium text-muted-foreground" style={{ background: "hsl(var(--muted))" }}>
              {savedItems.length} saved
            </span>
          </div>
        </div>

        {savedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 px-8 text-center"
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
              style={{ background: "hsla(var(--primary) / 0.1)" }}
            >
              <Bookmark size={32} className="text-primary" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Your list is empty</h2>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-6">
              Bookmark content from the Collection to save it here for later
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/collection")}
              className="px-6 py-3 rounded-2xl font-body font-medium text-sm"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              Browse Collection
            </motion.button>
          </motion.div>
        ) : (
          <div className="px-5 mt-2 space-y-3">
            <AnimatePresence>
              {savedItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-3 p-3 rounded-2xl"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  {/* Thumbnail */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/collection/${item.id}`)}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: 100, height: 70 }}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "hsla(0 0% 0% / 0.3)" }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsla(0 0% 100% / 0.9)" }}>
                        <Play size={10} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
                      </div>
                    </div>
                    <span
                      className="absolute top-1 left-1 px-1 py-0.5 rounded text-[7px] font-body font-bold uppercase"
                      style={{ background: typeColor[item.type], color: "hsl(0 0% 100%)" }}
                    >
                      {item.type}
                    </span>
                  </motion.button>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="font-display text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.rating && (
                        <span className="flex items-center gap-0.5 text-[9px] font-body" style={{ color: "hsl(var(--gold))" }}>
                          <Star size={8} fill="currentColor" /> {item.rating}
                        </span>
                      )}
                      {item.duration && (
                        <span className="flex items-center gap-0.5 text-[9px] font-body text-muted-foreground">
                          <Clock size={8} /> {item.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Remove */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSave(item.id)}
                    className="self-center w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsla(0 70% 50% / 0.1)" }}
                  >
                    <Trash2 size={14} style={{ color: "hsl(0 70% 50%)" }} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <BottomNav active={activeNav} onSelect={setActiveNav} />
    </div>
  );
};

export default MyList;
