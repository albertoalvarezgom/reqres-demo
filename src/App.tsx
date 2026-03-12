import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslation } from 'react-i18next';
import { Toaster } from './components/ui/sonner';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CommandPalette } from './components/command-palette/CommandPalette.tsx';
import { PageSkeleton } from './components/PageSkeleton';
import { SkipToContent } from './components/SkipToContent';
import { DevModeIndicator } from './components/DevModeIndicator';
import { ApiTokenError } from './components/ApiTokenError';
import { validateApiToken } from './utils/validateEnv';
import { isDevMode } from './utils/devMode';
import { Command } from 'lucide-react';
import './App.css';

const UserList = lazy(() => import('./pages/UserList.tsx'));
const UserDetail = lazy(() => import('./pages/UserDetail.tsx'));
const UserForm = lazy(() => import('./pages/UserForm.tsx'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const { t } = useTranslation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const tokenValidation = validateApiToken();
  const skipTokenCheck = isDevMode();
  const showTokenError = !skipTokenCheck && !tokenValidation.isValid;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" storageKey="theme">
          <Router>
            <SkipToContent />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 transition-colors">
              <header className="bg-white dark:bg-gray-950 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <button
                    onClick={() => setCommandPaletteOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors"
                    aria-label={t('commandPalette.label')}
                  >
                    <Command className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{t('commandPalette.quickActions')}</span>
                    <kbd
                      className="hidden sm:inline px-2 py-0.5 text-xs bg-muted border border-border rounded"
                      aria-hidden="true"
                    >
                      ⌘K
                    </kbd>
                  </button>
                  <div className="flex items-center gap-3">
                    <DevModeIndicator />
                    <div className="flex gap-2">
                      <ThemeToggle />
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
              </header>
              <main id="main-content" role="main">
                {showTokenError ? (
                  <div className="container mx-auto px-4 py-8 md:py-16">
                    <ApiTokenError />
                  </div>
                ) : (
                  <Suspense fallback={<PageSkeleton />}>
                    <Routes>
                      <Route path="/" element={<UserList />} />
                      <Route path="/user/new" element={<UserForm />} />
                      <Route path="/user/:id" element={<UserDetail />} />
                      <Route path="/user/:id/edit" element={<UserForm />} />
                    </Routes>
                  </Suspense>
                )}
              </main>
              <Toaster />
            </div>
            <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
