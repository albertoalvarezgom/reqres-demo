import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Code, Palette } from 'lucide-react';
import type { UserRole } from '../types/roles';
import { roleStorage } from '../utils/roleStorage';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RoleSelectorProps {
  userId: number;
  compact?: boolean;
}

export const RoleSelector = memo(function RoleSelector({
  userId,
  compact = false,
}: RoleSelectorProps) {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  useEffect(() => {
    setSelectedRole(roleStorage.getUserRole(userId));
  }, [userId]);

  const handleRoleClick = (role: UserRole) => {
    const newRole = selectedRole === role ? null : role;
    setSelectedRole(newRole);
    roleStorage.setUserRole(userId, newRole);
  };

  const roles = [
    {
      type: 'admin' as const,
      icon: Shield,
      label: t('roles.admin'),
      color: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30',
      activeColor: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
    },
    {
      type: 'developer' as const,
      icon: Code,
      label: t('roles.developer'),
      color: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30',
      activeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    },
    {
      type: 'designer' as const,
      icon: Palette,
      label: t('roles.designer'),
      color: 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30',
      activeColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    },
  ];

  if (compact) {
    return (
      <TooltipProvider>
        <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
          {roles.map(({ type, icon: Icon, label, color, activeColor }) => (
            <Tooltip key={type} delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleRoleClick(type)}
                  className={cn(
                    'p-1.5 rounded-md transition-all duration-200',
                    selectedRole === type ? activeColor : color
                  )}
                  aria-label={`${label} ${selectedRole === type ? t('roles.assigned') : t('roles.assign')}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-sm">
                  {label}
                  {selectedRole === type && <span className="ml-1 text-xs opacity-70">✓</span>}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{t('roles.selectRole')}</label>
      <div className="flex gap-2">
        {roles.map(({ type, icon: Icon, label, color, activeColor }) => (
          <button
            key={type}
            onClick={() => handleRoleClick(type)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200',
              selectedRole === type
                ? `${activeColor} border-current`
                : `${color} border-border hover:border-current`
            )}
            aria-label={`${label} ${selectedRole === type ? t('roles.assigned') : t('roles.assign')}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
      {selectedRole && (
        <p className="text-xs text-muted-foreground">
          {t('roles.currentRole')}:{' '}
          <span className="font-semibold">{t(`roles.${selectedRole}`)}</span>
        </p>
      )}
    </div>
  );
});
