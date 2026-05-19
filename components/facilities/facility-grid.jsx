import { FacilityCard } from "@/components/facilities/facility-card";
import { Skeleton } from "@heroui/react";

export function FacilityGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FacilityGrid({ facilities }) {
  if (!facilities.length) {
    return (
      <p className="py-16 text-center text-muted">No facilities found. Try adjusting your filters.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {facilities.map((facility) => (
        <FacilityCard key={facility._id} facility={facility} />
      ))}
    </div>
  );
}
