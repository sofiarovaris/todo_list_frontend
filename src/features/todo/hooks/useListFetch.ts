import useSWR from 'swr';
import { ListProps } from '../../../types/list';
import api from '../../../api/config';
import useAuth from '../../../hooks/useAuth';

export default function useListFetch() {
  const { user } = useAuth();

  console.log('user', user);

  const fetcher = async () => {
    try {
      const response = await api.get(`/lists/${user?.id}`);

      const sortedLists = response.data.sort(
        (a: ListProps, b: ListProps) => a.id - b.id
      );
      return sortedLists;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const { data, error, mutate } = useSWR('/lists', fetcher);

  const isLoading = !data && !error;

  if (error) {
    console.error('Error fetching data:', error);
  }

  return {
    lists: (data as ListProps[]) || [],
    isError: !!error,
    isLoading,
    mutate,
  };
}
