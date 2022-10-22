import React, { useState } from 'react';

const OrderEntry = (props) => {
  const { orderData } = props;

  const convertDateToString = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const unfulfilledStyle = {
    color: 'rgb(234, 167, 0)',
    fontWeight: 500,
  };
  const fulfilledStyle = {
    color: 'rgb(0, 164, 87)',
    fontWeight: 500,
  };

  return (
    <div id="entryContainer">
      <div id="entryWrapper">
        <div className="entryBox">
          <p className="dataEntry">{orderData.orderId}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{orderData.customerInfo.fullName}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry" style={orderData.status === 'unfulfilled' ? unfulfilledStyle : fulfilledStyle}>
            • {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
          </p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{convertDateToString(orderData.acceptedOn)}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{orderData.purchasedItems.reduce((acc, item) => (acc += item.count), 0)}</p>
        </div>
        <div className="entryBox">
          <p className="dataEntry">{orderData.customerPaid.string}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
