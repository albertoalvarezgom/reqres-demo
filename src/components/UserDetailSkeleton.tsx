import { memo } from 'react';
import { Card, CardContent } from './ui/card';

export const UserDetailSkeleton = memo(function UserDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="h-10 w-32 bg-muted rounded mb-6 animate-pulse" />

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 animate-pulse">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-muted" />
              <div className="h-7 bg-muted rounded w-40" />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="h-6 bg-muted rounded w-48 mb-6" />

                <div className="space-y-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b border-border pb-3"
                    >
                      <div className="h-4 bg-muted rounded w-24" />
                      <div className="h-4 bg-muted rounded w-32" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <div className="h-10 bg-muted rounded flex-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
