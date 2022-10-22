import React from 'react';
import OrderEntry from './OrderEntry';

const OrderTable = (props) => {
  const { orderData, getOrderData } = props;

  const orderEntries = [];
  orderData.forEach((order) => {
    orderEntries.push(<OrderEntry orderData={order} />);
  });

  return (
    <div id="table" className="orderTable">
      <div id="tableHeadContainer">
        <h2>Recent Orders</h2>
        <img
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png'}
          id="refreshButton"
          onClick={() => getOrderData()}
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
      {orderEntries}
    </div>
  );
};

export default OrderTable;
