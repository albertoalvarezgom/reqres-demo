import { memo } from 'react';
import { Card } from './ui/card';

export const UserCardSkeleton = memo(function UserCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div className="w-20 h-20 rounded-full bg-muted flex-shrink-0 animate-shimmer" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-5 bg-muted rounded w-3/4 animate-shimmer" />
          <div className="h-4 bg-muted rounded w-full animate-shimmer" />
        </div>
      </div>
    </Card>
  );
});

export const UserCardSkeletonGrid = memo(function UserCardSkeletonGrid({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
});
