import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-12">
      {/* Greeting */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <Skeleton className="h-6 w-36 mb-1.5" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      {/* Emotion chips */}
      <div className="flex gap-4 mb-6 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-2.5 w-10" />
          </div>
        ))}
      </div>

      {/* AI Hero */}
      <Skeleton className="h-40 w-full rounded-3xl mb-2" />
      <Skeleton className="h-3 w-3/4 mb-7" />

      {/* Companions rail */}
      <Skeleton className="h-4 w-32 mb-3" />
      <div className="flex gap-4 mb-7 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="h-2.5 w-12" />
          </div>
        ))}
      </div>

      {/* Collection rail */}
      <Skeleton className="h-4 w-40 mb-3" />
      <div className="flex gap-3 mb-7 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col flex-shrink-0 w-36 gap-2">
            <Skeleton className="w-36 h-24 rounded-xl" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Sound rail */}
      <Skeleton className="h-4 w-28 mb-3" />
      <div className="flex gap-2.5 mb-7 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-32 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

export default HomeSkeleton;
