import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const RateLimitError = memo(function RateLimitError() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-6 h-6" />
            {t('errors.rateLimitTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t('errors.rateLimitMessage')}</p>
          <Button asChild variant="outline" className="w-full">
            <a
              href="https://reqres.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              {t('errors.rateLimitAction')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});
