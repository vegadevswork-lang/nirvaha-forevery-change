import { motion } from "framer-motion";

/* Water-shimmer skeleton — a flowing gradient instead of flat pulse */
const WaterShimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "hsl(var(--muted) / 0.2)" }}>
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.06) 50%, transparent 100%)",
      }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const CommunitySkeleton = () => (
  <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--background))" }}>
    <div className="flex-1 pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <WaterShimmer className="h-6 w-32" />
          <div className="flex gap-2">
            <WaterShimmer className="w-8 h-8 rounded-xl" />
            <WaterShimmer className="w-8 h-8 rounded-xl" />
          </div>
        </div>
        <WaterShimmer className="h-3 w-44 mb-4" />
      </div>

      {/* Sacred Paths bar */}
      <div className="flex gap-2 px-5 mb-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <WaterShimmer key={i} className="h-10 w-32 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* Sort tabs */}
      <div className="px-5 mb-5">
        <WaterShimmer className="h-10 w-full rounded-2xl" />
      </div>

      {/* Aura cards */}
      <div className="px-4 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-3xl p-5" style={{ background: "hsl(var(--card) / 0.3)", border: "1px solid hsl(var(--border) / 0.08)" }}>
            <div className="flex items-start gap-3">
              <WaterShimmer className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <WaterShimmer className="h-3 w-24" />
                <WaterShimmer className="h-4 w-full" />
                <WaterShimmer className="h-4 w-4/5" />
                <div className="flex gap-4 pt-1">
                  <WaterShimmer className="h-3 w-16" />
                  <WaterShimmer className="h-3 w-12" />
                  <WaterShimmer className="h-3 w-14" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommunitySkeleton;
