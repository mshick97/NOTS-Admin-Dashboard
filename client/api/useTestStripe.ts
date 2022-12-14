import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';
import { AxiosError } from 'axios';

const useTestStripe = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const getTestData = async () => {
    const TEST_ENDPOINT = '/api/stripe';
    const testResponse = await axiosPrivate.get(TEST_ENDPOINT);
    return testResponse.data;
  };

  const { isLoading, data, refetch } = useQuery(['testStripeData'], getTestData, {
    staleTime: 30000,
    retry: false,
    onError: (err: AxiosError | any) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useTestStripe;
