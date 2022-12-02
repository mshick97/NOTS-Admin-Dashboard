import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useGetCustomerData = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function getCustomerData() {
    const GET_CUSTOMERS_URL = '/api/users';

    try {
      const customers = await axiosPrivate(GET_CUSTOMERS_URL);
      return customers.data.customers;
    } catch (err) {
      throw new Error(err);
    }
  }

  const { isLoading, data, refetch } = useQuery(['customerData'], getCustomerData, {
    staleTime: 30000,
    retry: false,
    onError: (err) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useGetCustomerData;
