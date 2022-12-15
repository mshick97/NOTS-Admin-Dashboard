import React from 'react';
import { CustomerOrder } from '../types/orderType';

interface OrderEntryProps {
  orderData: CustomerOrder;
  navigateToOrder: (order: CustomerOrder) => void;
}

const OrderEntry = (props: OrderEntryProps) => {
  const { orderData, navigateToOrder } = props;

  const convertDateToString = (dateString: string): string => {
    const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, dateFormatOptions);
  };

  const unfulfilledStyle = {
    color: 'rgb(234, 167, 0)',
    fontWeight: 500,
    border: '2px solid rgb(234, 167, 0)',
    borderRadius: '5px',
    width: '125px',
    paddingLeft: '10px',
  };
  const fulfilledStyle = {
    color: 'rgb(0, 164, 87)',
    fontWeight: 500,
    border: '2px solid rgb(0, 164, 87)',
    borderRadius: '5px',
    width: '125px',
    paddingLeft: '10px',
  };

  return (
    <div
      className="entryContainer"
      onClick={() => {
        navigateToOrder(orderData);
      }}>
      <div className="entryWrapper">
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
