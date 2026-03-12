import { memo } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';

export const UserFormSkeleton = memo(function UserFormSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              <div className="h-10 bg-muted rounded w-full animate-pulse" />
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <div className="h-10 bg-muted rounded flex-1 animate-pulse" />
            <div className="h-10 bg-muted rounded flex-1 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
