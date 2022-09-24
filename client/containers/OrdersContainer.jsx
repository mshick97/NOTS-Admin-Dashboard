import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useErrorRedirect from "../hooks/useErrorRedirect.jsx";
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import DataCard from '../components/DataCard.jsx';

const OrdersContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';

    await axiosPrivate.get(GET_ORDERS_URL)
      .then(orders => {
        console.log(orders.data)
        setOrderData(orders.data);
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
        <DataCard heading={'New Orders'} cardData={orderData.length} />

        {orderData.map((order, i) => {
          <DataCard/>
        })}

      </section>
    )
  }
 
}

export default OrdersContainer; 