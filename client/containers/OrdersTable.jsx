import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ordersReducer, { initialOrderState } from '../reducers/ordersReducer';
import { SET_ORDER_DATA_TYPE, SET_SALES_TYPE, SET_AVG_ORDER_VAL, SET_AVG_ORDER_SIZE, SET_ORDER_ID, ORDERS_ROUTE } from '../constants';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useGetOrderData from '../api/useGetOrderData';
import DataCard from '../components/DataCard';
import OrderEntry from '../components/OrderEntry';

const OrderTable = () => {
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useGetOrderData();
  const [state, dispatch] = useReducer(ordersReducer, initialOrderState);

  const navigateToOrder = (orderData) => {
    dispatch({ type: SET_ORDER_ID, payload: orderData.orderId });
    return navigate(ORDERS_ROUTE + `/${orderData.orderId}`, { state: orderData });
  };

  const averagingFunction = (orderData) => {
    dispatch({ type: SET_ORDER_DATA_TYPE, payload: orderData });

    let grossTotal = 0;
    orderData.forEach((order) => {
      grossTotal += order.netAmount.value;
    });

    let avgOrderVal = 0;
    let avrOrderSize = 0;

    let totalPaid = 0;
    let totalOrderedItems = 0;

    for (const customerPurchase in orderData) {
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
    dispatch({ type: SET_SALES_TYPE, payload: grossTotal });
    return totalOrderedItems;
  };

  useEffect(() => {
    if (!isLoading) {
      averagingFunction(data);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loadingProgressWrapper">
        <Box sx={{ display: 'flex' }} id="loadingBox">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <>
      <div className="dataCardContainer">
        <DataCard heading={'New Orders'} cardData={state.orderData.length} id="newOrders" />
        <DataCard heading={'Total Sales'} cardData={'$' + state.sales} id="totalSales" />
        <DataCard heading={'Avg. Order Value'} cardData={'$' + state.avgOrderVal} id="avgOrderValue" />
        <DataCard heading={'Avg. Order Size'} cardData={state.avgOrderSize} id="avgOrderSize" />
      </div>

      <div id="table" className="orderTable">
        <div id="tableHeadContainer">
          <h2>Recent Orders</h2>
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
            id="refreshButton"
            onClick={refetch}
          />
        </div>

        <div id="entryHeadersWrapper">
          <h5 className="tableHeading">Order Number</h5>
          <h5 className="tableHeading">Customer</h5>
          <h5 className="tableHeading">Status</h5>
          <h5 className="tableHeading">Date</h5>
          <h5 className="tableHeading">Items</h5>
          <h5 className="tableHeading">Total</h5>
        </div>
        {state.orderData.map((order) => {
          return <OrderEntry orderData={order} key={order.orderId} navigateToOrder={navigateToOrder} />;
        })}
      </div>
    </>
  );
};

export default OrderTable;
