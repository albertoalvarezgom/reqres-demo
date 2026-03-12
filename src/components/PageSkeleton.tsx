import { memo } from 'react';

export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
      <div className="animate-pulse space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-muted rounded w-48" />
          <div className="h-10 bg-muted rounded w-32" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded" />
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <div className="h-10 bg-muted rounded w-24" />
          <div className="h-10 bg-muted rounded w-10" />
          <div className="h-10 bg-muted rounded w-10" />
          <div className="h-10 bg-muted rounded w-24" />
        </div>
      </div>
    </div>
  );
});
