import React from 'react';

interface OrderSummaryProps {
  orderCreated: string;
  subtotal: string;
  total: string;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { orderCreated, subtotal, total } = props;

  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const dateConversion = new Date(orderCreated).toLocaleDateString('en-us', dateOptions);

  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  const timeConversion = new Date(orderCreated).toLocaleTimeString([], timeOptions);

  return (
    <div id="OrderSummary">
      <h3>Order Summary</h3>
      <p>Order Created: {dateConversion}</p>
      <p>Order Time: {timeConversion}</p>
      <p>Subtotal: {subtotal}</p>
      <p>Total: {total}</p>
    </div>
  );
};

export default OrderSummary;
