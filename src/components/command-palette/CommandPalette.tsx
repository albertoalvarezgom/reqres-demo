import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Command } from 'cmdk';
import { useQuery } from '@tanstack/react-query';
import { getUsersService } from '../../api/services';
import { Search, Plus, Home, User, Globe, Moon, Sun, Keyboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent } from '../ui/dialog';
import './command-palette.css';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState('');

  const { data: page1 } = useQuery({
    queryKey: ['users', 1],
    queryFn: () => getUsersService(1),
    enabled: open,
  });

  const { data: page2 } = useQuery({
    queryKey: ['users', 2],
    queryFn: () => getUsersService(2),
    enabled: open,
  });

  const allUsers = [...(page1?.data || []), ...(page2?.data || [])];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <Command className="rounded-lg border-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder={t('commandPalette.placeholder')}
              className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              {t('commandPalette.noResults')}
            </Command.Empty>

            <Command.Group heading={t('commandPalette.quickActions')} className="mb-2">
              <Command.Item
                onSelect={() => runCommand(() => navigate('/user/new'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Plus className="w-4 h-4 opacity-70" />
                <span className="text-sm">{t('commandPalette.createUser')}</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate('/'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Home className="w-4 h-4 opacity-70" />
                <span className="text-sm">{t('commandPalette.goHome')}</span>
              </Command.Item>
            </Command.Group>

            {allUsers.length > 0 && (
              <Command.Group heading={t('commandPalette.users')} className="mb-2">
                {allUsers.map((user) => (
                  <Command.Item
                    key={user.id}
                    value={`${user.first_name} ${user.last_name} ${user.email}`}
                    onSelect={() => runCommand(() => navigate(`/user/${user.id}`))}
                    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
                  >
                    <User className="w-4 h-4 opacity-70" />
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {user.first_name} {user.last_name}
                      </span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading={t('commandPalette.theme')} className="mb-2">
              <Command.Item
                onSelect={() => runCommand(() => setTheme('light'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Sun className="w-4 h-4 opacity-70" />
                <span className="text-sm">{t('commandPalette.lightMode')}</span>
                {theme === 'light' && <span className="ml-auto text-primary font-semibold">✓</span>}
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => setTheme('dark'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Moon className="w-4 h-4 opacity-70" />
                <span className="text-sm">{t('commandPalette.darkMode')}</span>
                {theme === 'dark' && <span className="ml-auto text-primary font-semibold">✓</span>}
              </Command.Item>
            </Command.Group>

            <Command.Group heading={t('commandPalette.language')} className="mb-2">
              <Command.Item
                onSelect={() => runCommand(() => i18n.changeLanguage('es'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Globe className="w-4 h-4 opacity-70" />
                <span className="text-sm">Español</span>
                {i18n.language === 'es' && (
                  <span className="ml-auto text-primary font-semibold">✓</span>
                )}
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => i18n.changeLanguage('en'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Globe className="w-4 h-4 opacity-70" />
                <span className="text-sm">English</span>
                {i18n.language === 'en' && (
                  <span className="ml-auto text-primary font-semibold">✓</span>
                )}
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => i18n.changeLanguage('gl'))}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Globe className="w-4 h-4 opacity-70" />
                <span className="text-sm">Galego</span>
                {i18n.language === 'gl' && (
                  <span className="ml-auto text-primary font-semibold">✓</span>
                )}
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center gap-4 px-4 py-3 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              <span>{t('commandPalette.navigate')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                ↵
              </kbd>
              <span>{t('commandPalette.select')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                ESC
              </kbd>
              <span>{t('commandPalette.close')}</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
