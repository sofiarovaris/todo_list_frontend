import useSWR from 'swr';
import { ListProps } from '../../../types/list';
import api from '../../../api/config';

export default function useListFetch() {
  const fetcher = async () => {
    try {
      const response = await api.get('/lists');

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
