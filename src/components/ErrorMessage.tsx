import { memo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorMessage = memo(function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
  retryLabel = 'Try Again',
}: ErrorMessageProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-destructive/10 p-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-destructive">{title}</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="mt-3">
                <RefreshCw className="w-4 h-4" />
                {retryLabel}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
