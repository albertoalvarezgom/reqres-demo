import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2 } from 'lucide-react';
import { isDevMode } from '../utils/devMode';

export const DevModeIndicator = memo(function DevModeIndicator() {
  const { t } = useTranslation();

  if (!isDevMode()) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md border border-amber-300 dark:border-amber-700">
      <Code2 className="w-4 h-4" aria-hidden="true" />
      <span className="text-sm font-medium">{t('devMode.label')}</span>
    </div>
  );
});
