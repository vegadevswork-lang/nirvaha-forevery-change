import { motion } from "framer-motion";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollectionCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative rounded-3xl overflow-hidden mb-6"
      style={{
        background: "linear-gradient(160deg, hsl(220 20% 12%), hsl(260 15% 18%))",
        boxShadow: "0 16px 48px hsla(260 30% 15% / 0.4), 0 4px 12px hsla(var(--primary) / 0.1)",
      }}
    >
      {/* Decorative film-strip element */}
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
        style={{ background: "hsl(var(--gold))" }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
        style={{ background: "hsl(var(--healing-green))" }}
      />

      {/* Animated glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(var(--gold) / 0.4) 0%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* Thumbnail previews strip */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {[
          "https://images.unsplash.com/photo-1545389336-cf090694435e?w=60&q=60",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=60&q=60",
          "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=60&q=60",
        ].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="w-10 h-10 rounded-xl overflow-hidden border"
            style={{ borderColor: "hsla(0 0% 100% / 0.15)" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-20">
            <div className="flex items-center gap-2 mb-1.5">
              <p
                className="font-body text-[10px] uppercase tracking-widest"
                style={{ color: "hsl(var(--gold))" }}
              >
                Nirvaha Collection
              </p>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={10} style={{ color: "hsl(var(--gold))" }} />
              </motion.div>
            </div>
            <h2
              className="font-display text-xl font-semibold leading-tight"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              OTT for Wellness
            </h2>
          </div>
        </div>

        <p
          className="font-body text-xs mb-5 leading-relaxed"
          style={{ color: "hsla(0 0% 95% / 0.6)" }}
        >
          Meditations, expert talks, spiritual stories & sound therapy — your
          daily dose of inner transformation.
        </p>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/collection", { state: { playIntro: true } })}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-body font-medium text-sm"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healing-green)))",
            color: "hsl(var(--primary-foreground))",
            boxShadow: "0 4px 20px hsla(var(--healing-green) / 0.3)",
          }}
        >
          <Play size={16} fill="currentColor" />
          Explore Collection
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
