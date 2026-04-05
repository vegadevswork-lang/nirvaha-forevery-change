import { Skeleton } from "@/components/ui/skeleton";

const WellnessSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-12">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-7 w-24 mb-2" />
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Mood chart */}
      <Skeleton className="h-48 w-full rounded-2xl mb-5" />

      {/* Weekly insight */}
      <Skeleton className="h-32 w-full rounded-2xl mb-5" />

      {/* Actions */}
      <div className="space-y-3 mb-5">
        <Skeleton className="h-4 w-40 mb-2" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-2xl" />
        ))}
      </div>

      {/* Streaks */}
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  </div>
);

export default WellnessSkeleton;
