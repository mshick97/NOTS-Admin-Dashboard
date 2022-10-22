import React, { useEffect, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ordersReducer, { initialOrderState } from '../reducers/ordersReducer';
import {
  SET_IS_LOADING_TYPE,
  SET_ORDER_DATA_TYPE,
  SET_SALES_TYPE,
  SET_AVG_ORDER_VAL,
  SET_AVG_ORDER_SIZE,
  SET_ORDER_ID,
  ORDERS_ROUTE,
} from '../constants';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useErrorRedirect from '../hooks/useErrorRedirect';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import DataCard from '../components/DataCard';
import OrdersTable from '../components/OrdersTable';
import OrderDetails from '../components/OrderDetails';

const OrdersContainer = () => {
  document.title = 'NOTS Admin | Orders';

  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(ordersReducer, initialOrderState);

  const navigateToOrder = (orderId) => {
    console.log(orderId);
    dispatch({ type: SET_ORDER_ID, payload: orderId });
    return navigate(ORDERS_ROUTE + `/${orderId}`);
  };

  const averagingFunction = (orderData) => {
    let avgOrderVal = 0;
    let avrOrderSize = 0;

    let totalPaid = 0;
    let totalOrderedItems = 0;

    for (const customerPurchase in orderData) {
      console.log(orderData[customerPurchase]);
      totalPaid += orderData[customerPurchase].customerPaid.value;
      orderData[customerPurchase].purchasedItems.forEach((item) => {
        return (totalOrderedItems += item.count);
      });
    }

    // Takes total of all orders and divides this by number of orders
    avgOrderVal = Math.round((totalPaid / orderData.length) * 100) / 100;
    // Takes every item ordered in all orders and divides them by the amount of orders
    avrOrderSize = Math.round((totalOrderedItems / orderData.length) * 100) / 100;

    dispatch({ type: SET_AVG_ORDER_VAL, payload: avgOrderVal });
    dispatch({ type: SET_AVG_ORDER_SIZE, payload: avrOrderSize });
    return totalOrderedItems;
  };

  async function getOrderData() {
    const GET_ORDERS_URL = '/api/order_info';

    await axiosPrivate
      .get(GET_ORDERS_URL)
      .then((orders) => {
        dispatch({ type: SET_ORDER_DATA_TYPE, payload: orders.data });

        let grossTotal = 0;
        orders.data.forEach((order) => {
          grossTotal += order.netAmount.value;
        });

        averagingFunction(orders.data);
        dispatch({ type: SET_SALES_TYPE, payload: grossTotal });
        dispatch({ type: SET_IS_LOADING_TYPE });
      })
      .catch((err) => {
        console.log(err);
        redirect(err);
      });
  }

  useEffect(() => {
    getOrderData();
  }, []);

  if (state.isLoading) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id="loadingBox">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!state.isLoading) {
    return (
      <section id="ordersContainer">
        <h2 className="tableName">Orders</h2>
        <div className="dataCardContainer">
          <DataCard heading={'New Orders'} cardData={state.orderData.length} />
          <DataCard heading={'Total Sales'} cardData={'$' + state.sales} />
          <DataCard heading={'Avg. Order Value'} cardData={'$' + state.avgOrderVal} />
          <DataCard heading={'Avg. Order Size'} cardData={state.avgOrderSize} />
        </div>

        <Routes>
          <Route path="/" element={<OrdersTable orderData={state.orderData} getOrderData={getOrderData} navigateToOrder={navigateToOrder} />}>
            <Route path=":orderId" element={<OrderDetails orderData={state.orderData} />} />
          </Route>
        </Routes>
      </section>
    );
  }
};

export default OrdersContainer;
