import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';

const OrdersContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  async function getOrderData() {
    const GET_ORDERS_URL = '/orders';

    await axiosPrivate.get(GET_ORDERS_URL)
      .then(orders => {
        console.log(orders.data)
        setOrders(orders.data);
      })
      .catch(err => {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
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