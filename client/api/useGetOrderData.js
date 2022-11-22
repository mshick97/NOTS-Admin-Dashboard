import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useGetOrderData = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';
    const orders = await axiosPrivate.get(GET_ORDERS_URL);
    return orders.data;
  }

  const { isLoading, data, isError, error } = useQuery(['orderData'], getOrderData, {
    staleTime: 30000,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      redirect(error);
      console.log(error);
    }
  }, [isError]);

  return { isLoading, data };
};

export default useGetOrderData;
