import React from 'react';

const OrderSummary = (props) => {
  const { orderCreated, subtotal } = props;

  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const dateConversion = new Date(orderCreated).toLocaleDateString('en-us', dateOptions);

  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const timeConversion = new Date(orderCreated).toLocaleTimeString([], timeOptions);

  return (
    <div id="OrderSummary">
      <h3>Order Summary</h3>
      <p>Order Created: {dateConversion}</p>
      <p>Order Time: {timeConversion}</p>
      <p>Subtotal: {subtotal}</p>
    </div>
  );
};

export default OrderSummary;
