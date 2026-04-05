import { Skeleton } from "@/components/ui/skeleton";

const CommunitySkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-28" />
          <div className="flex gap-2">
            <Skeleton className="w-9 h-9 rounded-xl" />
            <Skeleton className="w-9 h-9 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-4 w-48 mb-4" />
      </div>

      {/* Topic bar */}
      <div className="flex gap-2 px-5 mb-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-xl flex-shrink-0" />
        ))}
      </div>

      {/* Sort tabs */}
      <div className="flex gap-3 px-5 mb-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-lg" />
        ))}
      </div>

      {/* Post cards */}
      <div className="px-5 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: "hsl(var(--card))" }}>
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-2.5 w-14" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommunitySkeleton;
