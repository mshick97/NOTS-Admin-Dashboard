import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useErrorRedirect from '../hooks/useErrorRedirect.jsx';
import useAxiosPrivate from '../hooks/useAxiosPrivate.jsx';
import DataCard from '../components/DataCard.jsx';

const OrdersContainer = () => {
  document.title = 'NOTS Admin | Orders';

  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  // For specific order data computations
  const [sales, setSales] = useState(0);
  const [avgOrderVal, setAvgOrderVal] = useState(0);
  const [avgOrderSize, setAvgOrderSize] = useState(1);

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';

    await axiosPrivate
      .get(GET_ORDERS_URL)
      .then((orders) => {
        console.log(orders.data);
        setOrderData(orders.data);

        let grossTotal = 0;
        orders.data.forEach((order) => {
          console.log(order);
          grossTotal += order.netAmount.value;
        });

        setSales(grossTotal);
        setIsLoading(false);
      })
      .catch((err) => {
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
        <Box sx={{ display: 'flex' }} id="loadingBox">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!isLoading) {
    return (
      <section id="ordersContainer">
        <h2 className="tableName">Orders</h2>
        <div className="dataCardContainer">
          <DataCard heading={'New Orders'} cardData={orderData.length} />
          <DataCard heading={'Total Sales'} cardData={'$' + sales} />
          <DataCard heading={'Avg. Order Value'} cardData={'$' + avgOrderVal} />
          <DataCard heading={'Avg. Order Size'} cardData={avgOrderSize} />
        </div>
      </section>
    );
  }
};

export default OrdersContainer;
