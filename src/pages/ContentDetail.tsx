import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, Pause, Bookmark, BookmarkCheck, Star, Clock, Download, Subtitles,
  FileText, ChevronDown, ChevronUp, Gauge, Share2, Heart, Film,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import { getAllContent, getRelatedContent, type ContentItem } from "@/data/collectionData";
import { useSavedContent } from "@/hooks/use-saved-content";
import { useGlobalPlayer } from "@/hooks/use-global-player";
import VideoPlayer from "@/components/player/VideoPlayer";

const typeColor: Record<string, string> = {
  series: "hsl(var(--healing-green))",
  film: "hsl(var(--gold))",
  meditation: "hsl(var(--primary))",
  podcast: "hsl(280 60% 65%)",
  talk: "hsl(200 70% 60%)",
  playlist: "hsl(var(--gold))",
  soundscape: "hsl(180 50% 55%)",
};

const sampleAudio: Record<string, string> = {
  meditation: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  soundscape: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  talk: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  podcast: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  film: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  series: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  playlist: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
};

const isVideoType = (type: string) => type === "film" || type === "series";

const ContentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSaved, toggleSave } = useSavedContent();
  const globalPlayer = useGlobalPlayer();
  const [liked, setLiked] = useState(false);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [activeTab, setActiveTab] = useState<"episodes" | "reviews" | "related">("episodes");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const allContent = getAllContent();
  const item = allContent.find((c) => c.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body">Content not found</p>
      </div>
    );
  }

  const saved = isSaved(item.id);
  const related = getRelatedContent(item);
  const episodes = item.episodes || [];
  const reviews = item.reviews || [];
  const displayedEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 4);
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const audioSrc = sampleAudio[item.type] || sampleAudio.meditation;

  const isCurrentTrack = globalPlayer.track?.id === item.id;

  const handlePlay = () => {
    if (isVideoType(item.type)) {
      setShowVideoPlayer(true);
      return;
    }
    if (isCurrentTrack) {
      globalPlayer.toggle();
    } else {
      globalPlayer.play({
        id: item.id,
        title: item.title,
        type: item.type,
        image: item.image,
        audioSrc,
      });
    }
  };

  const handleDownload = (epId: string) => {
    setDownloading(epId);
    setTimeout(() => setDownloading(null), 2000);
  };

  const playingThis = isCurrentTrack && globalPlayer.isPlaying;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Video Player Overlay */}
      <AnimatePresence>
        {showVideoPlayer && (
          <VideoPlayer
            title={item.title}
            posterImage={item.image}
            onClose={() => setShowVideoPlayer(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto relative z-10" style={{ paddingBottom: globalPlayer.track ? 180 : 112 }}>
        {/* Hero */}
        <div className="relative" style={{ height: 280 }}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsl(var(--background)) 5%, hsla(0 0% 0% / 0.4) 50%, hsla(0 0% 0% / 0.2))" }}
          />
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: "hsla(0 0% 0% / 0.4)", backdropFilter: "blur(8px)" }}
            >
              <ArrowLeft size={18} style={{ color: "hsl(0 0% 100%)" }} />
            </motion.button>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSave(item.id)}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "hsla(0 0% 0% / 0.4)", backdropFilter: "blur(8px)" }}
              >
                {saved ? (
                  <BookmarkCheck size={18} style={{ color: "hsl(var(--gold))" }} />
                ) : (
                  <Bookmark size={18} style={{ color: "hsl(0 0% 100%)" }} />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "hsla(0 0% 0% / 0.4)", backdropFilter: "blur(8px)" }}
              >
                <Share2 size={18} style={{ color: "hsl(0 0% 100%)" }} />
              </motion.button>
            </div>
          </div>

          {/* Big play button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "hsla(0 0% 100% / 0.9)", boxShadow: "0 8px 32px hsla(0 0% 0% / 0.3)" }}
          >
            {isVideoType(item.type) ? (
              <Film size={24} style={{ color: "hsl(0 0% 10%)" }} />
            ) : playingThis ? (
              <Pause size={24} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
            ) : (
              <Play size={24} fill="hsl(0 0% 10%)" style={{ color: "hsl(0 0% 10%)" }} />
            )}
          </motion.button>
        </div>

        {/* Content info */}
        <div className="px-5 -mt-12 relative z-10">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-body font-semibold uppercase"
              style={{ background: typeColor[item.type], color: "hsl(0 0% 100%)" }}
            >
              {item.type}
            </span>
            {isVideoType(item.type) && (
              <span className="flex items-center gap-1 text-[10px] font-body" style={{ color: "hsl(var(--primary))" }}>
                <Film size={10} /> Video
              </span>
            )}
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
            {item.hasSubtitles && (
              <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
                <Subtitles size={10} /> CC
              </span>
            )}
            {item.hasTranscript && (
              <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
                <FileText size={10} /> Transcript
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl font-semibold text-foreground leading-tight mb-2">
            {item.title}
          </h1>

          {item.subtitle && (
            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
              {item.subtitle}
            </p>
          )}

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

          {/* Action Row */}
          <div className="flex gap-2 mb-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handlePlay}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              {isVideoType(item.type) ? (
                <>
                  <Film size={16} />
                  Watch Now
                </>
              ) : playingThis ? (
                <>
                  <Pause size={16} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Play Now
                </>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setLiked(!liked)}
              className="w-12 flex items-center justify-center rounded-2xl"
              style={{ background: "hsl(var(--muted))" }}
            >
              <Heart size={18} fill={liked ? "hsl(var(--primary))" : "none"} className="text-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleDownload(item.id)}
              className="w-12 flex items-center justify-center rounded-2xl"
              style={{ background: "hsl(var(--muted))" }}
            >
              <Download size={18} className={downloading === item.id ? "animate-bounce text-primary" : "text-foreground"} />
            </motion.button>
          </div>

          {/* Playback Speed (audio only) */}
          {!isVideoType(item.type) && (
            <div className="flex items-center gap-3 mb-5 px-1">
              <Gauge size={14} className="text-muted-foreground" />
              <span className="text-[10px] font-body text-muted-foreground">Speed</span>
              <div className="flex gap-1.5">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => globalPlayer.setPlaybackSpeed(s)}
                    className="px-2 py-1 rounded-lg text-[10px] font-body font-medium transition-colors"
                    style={{
                      background: globalPlayer.playbackSpeed === s ? "hsl(var(--primary))" : "hsl(var(--muted))",
                      color: globalPlayer.playbackSpeed === s ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 mb-4 p-1 rounded-2xl" style={{ background: "hsl(var(--muted))" }}>
            {(["episodes", "reviews", "related"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 rounded-xl text-xs font-body font-medium capitalize transition-colors"
                style={{
                  background: activeTab === tab ? "hsl(var(--background))" : "transparent",
                  color: activeTab === tab ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {tab} {tab === "episodes" && episodes.length > 0 ? `(${episodes.length})` : tab === "reviews" && reviews.length > 0 ? `(${reviews.length})` : ""}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "episodes" && (
              <motion.div key="episodes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {episodes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-body text-xs text-muted-foreground">This content plays as a single session</p>
                  </div>
                ) : (
                  <>
                    {displayedEpisodes.map((ep, i) => (
                      <motion.div
                        key={ep.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-2xl mb-2 cursor-pointer"
                        style={{ background: "hsl(var(--muted))" }}
                        onClick={handlePlay}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "hsla(var(--primary) / 0.15)" }}
                        >
                          {isVideoType(item.type) ? (
                            <Film size={12} className="text-primary" />
                          ) : (
                            <Play size={12} className="text-primary" fill="currentColor" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs font-medium text-foreground truncate">
                            {i + 1}. {ep.title}
                          </p>
                          <p className="font-body text-[10px] text-muted-foreground truncate">{ep.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[9px] font-body text-muted-foreground">{ep.duration}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleDownload(ep.id); }}>
                            <Download
                              size={14}
                              className={downloading === ep.id ? "animate-bounce text-primary" : "text-muted-foreground"}
                            />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {episodes.length > 4 && (
                      <button
                        onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                        className="flex items-center gap-1 mx-auto mt-2 text-[11px] font-body font-medium"
                        style={{ color: "hsl(var(--primary))" }}
                      >
                        {showAllEpisodes ? "Show Less" : `Show All ${episodes.length} Episodes`}
                        {showAllEpisodes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-body text-xs text-muted-foreground">No reviews yet — be the first!</p>
                  </div>
                ) : (
                  reviews.map((rev, i) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-3 rounded-2xl mb-2"
                      style={{ background: "hsl(var(--muted))" }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <img src={rev.avatar} alt={rev.user} className="w-7 h-7 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-body text-[11px] font-medium text-foreground">{rev.user}</p>
                          <p className="font-body text-[9px] text-muted-foreground">{rev.date}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star
                              key={si}
                              size={10}
                              fill={si < rev.rating ? "hsl(var(--gold))" : "none"}
                              style={{ color: si < rev.rating ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">{rev.comment}</p>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "related" && (
              <motion.div key="related" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-3 gap-2">
                  {related.map((r, i) => (
                    <motion.button
                      key={r.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/collection/${r.id}`)}
                      className="rounded-2xl overflow-hidden text-left"
                    >
                      <div className="relative" style={{ height: 140 }}>
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.7) 0%, transparent 50%)" }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="font-body text-[9px] font-semibold leading-tight line-clamp-2" style={{ color: "hsl(0 0% 95%)" }}>
                            {r.title}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BottomNav active="Home" onSelect={() => {}} />
    </div>
  );
};

export default ContentDetail;
