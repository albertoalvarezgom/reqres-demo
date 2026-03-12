import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../hooks/useUsers.ts';
import { ApiError } from '../utils/errors.ts';
import { useDebounce } from '../hooks/useDebounce.ts';
import type { UserListResponse } from '../types/user.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { RateLimitError } from '@/components/RateLimitError.tsx';
import { ErrorMessage } from '@/components/ErrorMessage.tsx';
import { EmptyState } from '@/components/EmptyState.tsx';
import { UserCardSkeletonGrid } from '@/components/UserCardSkeleton.tsx';
import { RoleSelector } from '@/components/RoleSelector';
import type { UserRole } from '../types/roles';
import { roleStorage } from '../utils/roleStorage';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  Search,
  X,
  Shield,
  Code,
  Palette,
} from 'lucide-react';

const UserList = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    isError,
  }: {
    data: UserListResponse | undefined;
    isLoading: boolean;
    error: Error | null;
    isError: boolean;
  } = useUsers(currentPage) as any;

  const isRateLimited = error instanceof ApiError && error.isRateLimited;

  const filteredUsers = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (user: { first_name: string; last_name: string; email: string }) => {
          const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
          const email = user.email.toLowerCase();
          return fullName.includes(query) || email.includes(query);
        }
      );
    }

    // Apply role filter
    if (roleFilter) {
      filtered = filtered.filter((user: { id: number }) => {
        return roleStorage.getUserRole(user.id) === roleFilter;
      });
    }

    return filtered;
  }, [data?.data, debouncedSearchQuery, roleFilter]);

  const handleUserClick = useCallback(
    (userId: number) => {
      navigate(`/user/${userId}`);
    },
    [navigate]
  );

  const handleCreateUser = useCallback(() => {
    navigate('/user/new');
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t('userList.title')}
          </h1>
          <Button onClick={handleCreateUser} size="lg">
            <Plus className="w-5 h-5" />
            {t('userList.createUser')}
          </Button>
        </div>
        <UserCardSkeletonGrid count={6} />

        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            variant="outline"
            aria-label={t('userList.previousPage')}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            {t('userList.previous')}
          </Button>

          {Array.from({ length: data?.total_pages || 1 }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? 'default' : 'outline'}
              disabled={isLoading}
              aria-label={`${t('userList.page')} ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (data?.total_pages || 1) || isLoading}
            variant="outline"
            aria-label={t('userList.nextPage')}
          >
            {t('userList.next')}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  if (isRateLimited) {
    return <RateLimitError />;
  }

  if (isError && !isRateLimited) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <ErrorMessage
          title={t('userList.errorLoading')}
          message={error?.message || t('userList.errorLoading')}
          onRetry={() => window.location.reload()}
          retryLabel={t('common.retry')}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t('userList.title')}
          </h1>

          <Button onClick={handleCreateUser} size="lg" aria-label={t('userList.createUser')}>
            <Plus className="w-5 h-5" aria-hidden="true" />
            {t('userList.createUser')}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('userList.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              aria-label={t('userList.searchPlaceholder')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('common.cancel')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {t('userList.filterByRole')}:
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={roleFilter === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter(null)}
              >
                {t('userList.allRoles')}
              </Button>
              <Button
                variant={roleFilter === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('admin')}
                className={roleFilter === 'admin' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <Shield className="w-4 h-4 mr-1" />
                {t('roles.admin')}
              </Button>
              <Button
                variant={roleFilter === 'developer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('developer')}
                className={roleFilter === 'developer' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                <Code className="w-4 h-4 mr-1" />
                {t('roles.developer')}
              </Button>
              <Button
                variant={roleFilter === 'designer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('designer')}
                className={roleFilter === 'designer' ? 'bg-purple-500 hover:bg-purple-600' : ''}
              >
                <Palette className="w-4 h-4 mr-1" />
                {t('roles.designer')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(
          (user: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            avatar: string;
          }) => (
            <Card
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleUserClick(user.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t('userList.viewUser')} ${user.first_name} ${user.last_name}`}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-stretch">
                <div className="flex items-center gap-4 p-4 flex-1">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center px-3 border-l border-border/50">
                  <RoleSelector userId={user.id} compact />
                </div>
              </div>
            </Card>
          )
        )}
      </div>

      {filteredUsers.length === 0 && !isLoading && (
        <EmptyState
          icon={searchQuery ? Search : Users}
          title={searchQuery ? t('userList.noResults') : t('userList.noUsers')}
          description={
            searchQuery ? t('userList.noResultsDescription') : t('userList.noUsersDescription')
          }
          action={
            searchQuery
              ? {
                  label: t('userList.clearSearch'),
                  onClick: () => setSearchQuery(''),
                }
              : {
                  label: t('userList.createUser'),
                  onClick: handleCreateUser,
                }
          }
        />
      )}

      {filteredUsers.length > 0 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('userList.previous')}
          </Button>

          {Array.from({ length: data?.total_pages || 1 }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? 'default' : 'outline'}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (data?.total_pages || 1)}
            variant="outline"
          >
            {t('userList.next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
