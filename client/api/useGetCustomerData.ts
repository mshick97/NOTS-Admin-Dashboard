import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';
import { AxiosError } from 'axios';

const useGetCustomerData = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function getCustomerData() {
    const GET_CUSTOMERS_URL = '/api/users';
    const customers = await axiosPrivate(GET_CUSTOMERS_URL);
    return customers.data.customers;
  }

  const { isLoading, data, refetch } = useQuery(['customerData'], getCustomerData, {
    staleTime: 30000,
    retry: false,
    onError: (err: AxiosError | any) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useGetCustomerData;
