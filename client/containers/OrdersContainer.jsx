import React, { useState, useEffect } from 'react'
import useErrorRedirect from "../hooks/useErrorRedirect.jsx";
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';

const OrdersContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const [orders, setOrders] = useState([]);

  async function getOrderData() {
    const GET_ORDERS_URL = '/orders';

    await axiosPrivate.get(GET_ORDERS_URL)
      .then(orders => {
        console.log(orders.data)
        setOrders(orders.data);
      })
      .catch(err => {
        console.log(err);
        redirect(err);
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