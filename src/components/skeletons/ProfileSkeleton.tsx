import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col pb-24">
    <div className="flex-1 px-4 pt-12">
      {/* Profile header */}
      <div className="flex flex-col items-center mb-6">
        <Skeleton className="w-20 h-20 rounded-full mb-3" />
        <Skeleton className="h-5 w-32 mb-1.5" />
        <Skeleton className="h-3 w-44" />
      </div>

      {/* Journey card */}
      <Skeleton className="h-28 w-full rounded-2xl mb-4" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>

      {/* Settings */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
