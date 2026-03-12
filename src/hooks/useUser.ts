import { useQuery } from '@tanstack/react-query';
import { getUserService } from '../api/services';

export function useUser(id: number | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserService(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
