import { Skeleton } from "@/components/ui/skeleton";

const CollectionSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <div className="flex-1 pb-28">
      {/* Top bar */}
      <div className="px-5 pt-10 pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-2xl" />
          <Skeleton className="h-5 w-24" />
          <div className="ml-auto">
            <Skeleton className="w-9 h-9 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-5 mb-5">
        <Skeleton className="h-[220px] w-full rounded-3xl" />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 mb-5 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-xl flex-shrink-0" />
        ))}
      </div>

      {/* Content rows */}
      {Array.from({ length: 3 }).map((_, ri) => (
        <div key={ri} className="mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex gap-3 px-5 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 rounded-2xl" style={{ width: 140, height: 190 }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CollectionSkeleton;
