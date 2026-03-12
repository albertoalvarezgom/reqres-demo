import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Key, ExternalLink } from 'lucide-react';

export const ApiTokenError = memo(function ApiTokenError() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-2xl w-full border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-destructive">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t('apiTokenError.title')}</h1>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                {t('apiTokenError.subtitle')}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{t('apiTokenError.missing')}</p>
                <p className="text-sm text-muted-foreground">{t('apiTokenError.description')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">{t('apiTokenError.howToFix')}</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <div className="flex-1">
                  <p className="font-medium">{t('apiTokenError.step1.title')}</p>
                  <p className="text-muted-foreground mt-1">
                    {t('apiTokenError.step1.description')}
                  </p>
                  <code className="block mt-2 p-2 bg-muted rounded text-xs font-mono">.env</code>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <div className="flex-1">
                  <p className="font-medium">{t('apiTokenError.step2.title')}</p>
                  <p className="text-muted-foreground mt-1">
                    {t('apiTokenError.step2.description')}
                  </p>
                  <code className="block mt-2 p-2 bg-muted rounded text-xs font-mono">
                    VITE_API_TOKEN=your_api_token_here
                  </code>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <div className="flex-1">
                  <p className="font-medium">{t('apiTokenError.step3.title')}</p>
                  <p className="text-muted-foreground mt-1">
                    {t('apiTokenError.step3.description')}
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t border-border">
            <a
              href="https://reqres.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {t('apiTokenError.visitDocs')}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
