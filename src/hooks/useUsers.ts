import { useQuery } from '@tanstack/react-query';
import { getUsersService } from '../api/services';
import type { UserListResponse } from '../types/user';

export function useUsers(page: number) {
  return useQuery<UserListResponse>({
    queryKey: ['users', page],
    queryFn: () => getUsersService(page),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}
