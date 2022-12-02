import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useTestStripe = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const getTestData = async () => {
    const TEST_ENDPOINT = '/api/stripe';

    try {
      const testResponse = await axiosPrivate.get(TEST_ENDPOINT);
      return testResponse.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const { isLoading, data, refetch } = useQuery(['testStripeData'], getTestData, {
    staleTime: 30000,
    retry: false,
    onError: (err) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useTestStripe;
