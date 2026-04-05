import { Skeleton } from "@/components/ui/skeleton";

const CompanionSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28 px-5 pt-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Skeleton className="w-9 h-9 rounded-2xl" />
        <div>
          <Skeleton className="h-5 w-36 mb-1" />
          <Skeleton className="h-3 w-52" />
        </div>
      </div>

      {/* Search */}
      <Skeleton className="h-10 w-full rounded-2xl mb-5" />

      {/* Domain pills */}
      <div className="flex gap-2 mb-5 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* For You section */}
      <Skeleton className="h-4 w-24 mb-3" />
      <div className="flex gap-3 overflow-hidden mb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="flex-shrink-0 h-48 rounded-2xl" style={{ width: 160 }} />
        ))}
      </div>

      {/* Mentor cards */}
      <Skeleton className="h-4 w-28 mb-3" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

export default CompanionSkeleton;
