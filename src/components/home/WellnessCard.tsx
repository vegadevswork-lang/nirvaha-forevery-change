import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WellnessCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onClick={() => navigate("/wellness")}
      className="relative rounded-3xl overflow-hidden mb-6 cursor-pointer group"
      style={{
        background: "linear-gradient(160deg, hsl(195 35% 18%), hsl(180 30% 24%))",
        boxShadow: "0 16px 48px hsla(195 35% 15% / 0.4), 0 4px 12px hsla(var(--healing-green) / 0.1)",
      }}
    >
      <div
        className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
        style={{ background: "hsl(180 60% 55%)" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15"
        style={{ background: "hsl(var(--healing-green))" }}
      />

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/70 font-medium">
            Wellness Insights
          </span>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "hsl(180 50% 50% / 0.2)" }}
          >
            <TrendingUp size={18} className="text-white/90" />
          </div>
        </div>

        <h2 className="font-display text-[22px] text-white font-semibold leading-tight mb-1">
          Your inner weather.
        </h2>
        <p className="font-body text-xs text-white/75 mb-5 max-w-[280px] leading-relaxed">
          Track patterns, see your streak, and notice what shifts.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/wellness");
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/95 transition-colors shadow-md"
            style={{ color: "hsl(195 40% 18%)" }}
          >
            <span className="font-body text-sm font-semibold">View Insights</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/15">
            <Flame size={13} className="text-white/90" />
            <span className="font-body text-xs text-white/90 font-medium">7-day streak</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessCard;
