import useSWR from 'swr';
import { ListProps } from '../../../types/list';
import api from '../../../api/config';

export default function useListFetch() {
  const fetcher = async () => {
    const response = await api.get('/lists');
    return response.data;
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
