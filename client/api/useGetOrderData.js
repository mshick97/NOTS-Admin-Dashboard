import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useGetOrderData = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';

    try {
      const orders = await axiosPrivate.get(GET_ORDERS_URL);
      return orders.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  const { isLoading, data, refetch } = useQuery(['orderData'], getOrderData, {
    staleTime: 30000,
    retry: false,
    onError: (err) => {
      return redirect(err);
    },
  });

  return { isLoading, data, refetch };
};

export default useGetOrderData;
