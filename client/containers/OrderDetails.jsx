import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ORDERS_ROUTE } from '../constants';
import PurchaseDetails from '../components/PurchaseDetails';
import BillingDetails from '../components/BillingDetails';
import OrderSummary from '../components/OrderSummary';

const OrderDetails = () => {
  const location = useLocation();
  const orderData = location.state;

  const navigate = useNavigate();
  console.log(orderData);

  return (
    <div id="OrderDetails">
      <button onClick={() => navigate(ORDERS_ROUTE)}>Go back</button>

      <h2>
        Order Number: <span className="orderId">#{orderData.orderId}</span>
        <OrderSummary orderCreated={orderData.acceptedOn} subtotal={orderData.totals.subtotal.string} />
        <div>
          <p>Total: {orderData.totals.total.string}</p>
        </div>
        <BillingDetails name={orderData.customerInfo.fullName} address={orderData.billingAddress} email={orderData.customerInfo.email} />
        <PurchaseDetails />
      </h2>
    </div>
  );
};

export default OrderDetails;
