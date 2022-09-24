import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useErrorRedirect from "../hooks/useErrorRedirect.jsx";
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';

const OrdersContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';

    await axiosPrivate.get(GET_ORDERS_URL)
      .then(orders => {
        console.log(orders.data)
        setOrders(orders.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        redirect(err);
      });
  }

  useEffect(() => {
    getOrderData();
  }, []);

  
  if (isLoading) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id='loadingBox'>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  if (!isLoading) {
    return (
      <section id='OrdersContainer'>
        <h1>Orders</h1>
        
        {orders.map((order, i) => <p key={i}>{order.orderId}</p>)}
      </section>
    )
  }
 
}

export default OrdersContainer; 