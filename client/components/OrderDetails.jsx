import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ORDERS_ROUTE } from '../constants';
import PurchasedItemDetails from './PurchasedItemDetails';
import BillingDetails from './BillingDetails';
import OrderSummary from './OrderSummary';

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // State for this page is transferred using React Router lib instead of prop drilling / context API
  const orderData = location.state;

  return (
    <div id="OrderDetails">
      <button onClick={() => navigate(ORDERS_ROUTE)}>Go back</button>

      <h2>
        Order Number: <span className="orderId">#{orderData.orderId}</span>
      </h2>
      <OrderSummary orderCreated={orderData.acceptedOn} subtotal={orderData.totals.subtotal.string} />
      <div>
        <p>Total: {orderData.totals.total.string}</p>
      </div>
      <BillingDetails name={orderData.customerInfo.fullName} address={orderData.billingAddress} email={orderData.customerInfo.email} />

      <div id="table">
        <div id="tableHeadContainer">
          <h2>Purchase Details</h2>
        </div>
        <div id="purchasedItemsHeader">
          <h5></h5>
          <h5 className="tableHeading">Item</h5>
          <h5 className="tableHeading">SKU</h5>
          <h5 className="tableHeading">Quantity</h5>
          <h5 className="tableHeading">Price</h5>
        </div>
        {orderData.purchasedItems.map((item) => {
          return <PurchasedItemDetails key={item.productId} item={item} />;
        })}

        <div id="purchasesTotal">
          <p>Subtotal $ {orderData.purchasedItems.reduce((total, currItem) => (total += currItem.rowTotal.value), 0)}</p>
          <p>Total {orderData.netAmount.string}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
