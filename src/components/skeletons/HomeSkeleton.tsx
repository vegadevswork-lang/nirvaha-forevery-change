import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <Skeleton className="h-6 w-32 mb-1.5" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="w-10 h-10 rounded-2xl" />
      </div>

      {/* Emotion chips */}
      <div className="flex gap-2 mb-5 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* AI Hero card */}
      <Skeleton className="h-40 w-full rounded-3xl mb-4" />

      {/* Companion card */}
      <Skeleton className="h-28 w-full rounded-2xl mb-4" />

      {/* Collection card */}
      <Skeleton className="h-32 w-full rounded-2xl mb-4" />

      {/* Community card */}
      <Skeleton className="h-28 w-full rounded-2xl mb-4" />

      {/* Wisdom selfie */}
      <Skeleton className="h-24 w-full rounded-2xl mb-4" />

      {/* Journal */}
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  </div>
);

export default HomeSkeleton;
