import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';
import { AxiosError } from 'axios';

const useGetOrderData = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';
    const orders = await axiosPrivate.get(GET_ORDERS_URL);
    return orders.data;
  }

  const { isLoading, data, refetch } = useQuery(['orderData'], getOrderData, {
    staleTime: 30000,
    retry: false,
    onError: (err: AxiosError | any) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useGetOrderData;
