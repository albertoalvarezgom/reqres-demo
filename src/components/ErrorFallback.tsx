import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = memo(function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-destructive">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t('errorBoundary.title')}</h1>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                {t('errorBoundary.subtitle')}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm font-medium mb-2">{t('errorBoundary.errorMessage')}:</p>
            <p className="text-sm text-muted-foreground font-mono">
              {error.message || t('errorBoundary.unknownError')}
            </p>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showDetails ? t('errorBoundary.hideDetails') : t('errorBoundary.showDetails')}
          </button>

          {showDetails && (
            <div className="bg-muted/50 p-4 rounded-lg border border-border max-h-64 overflow-auto">
              <p className="text-xs font-medium mb-2">{t('errorBoundary.stackTrace')}:</p>
              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                {error.stack || t('errorBoundary.noStackTrace')}
              </pre>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">{t('errorBoundary.suggestions')}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={resetErrorBoundary} className="flex-1" size="lg">
                <RefreshCw className="w-4 h-4" />
                {t('errorBoundary.tryAgain')}
              </Button>
              <Button onClick={handleGoHome} variant="outline" className="flex-1" size="lg">
                <Home className="w-4 h-4" />
                {t('errorBoundary.goHome')}
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {t('errorBoundary.persistsMessage')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
