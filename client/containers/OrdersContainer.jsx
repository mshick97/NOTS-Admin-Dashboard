import React, { useState } from 'react'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';

const OrdersContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);

  async function getOrderData() {
    const GET_ORDERS_URL = '/webflow';

    await axiosPrivate.get(GET_ORDERS_URL)
      .then(orders => {
        console.log(orders.data)
        setOrders(orders.data);
      });
  }

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <section id='OrdersContainer'>
      <h1>Orders</h1>
      {orders.map((order, i) => <p key={i}>{order.orderId}</p>)}
    </section>
  )
}

export default OrdersContainer; 