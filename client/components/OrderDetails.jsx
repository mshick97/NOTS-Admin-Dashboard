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
    <>
      <button className="goBackButton" onClick={() => navigate(ORDERS_ROUTE)}></button>
      <div id="orderDetails">
        <div className="table orderTable">
          <h2>
            Order Number: <span className="orderId">#{orderData.orderId}</span>
          </h2>
          <div id="tableHeadContainer">
            <h3>Purchase Details</h3>
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

        <div>
          <OrderSummary orderCreated={orderData.acceptedOn} subtotal={orderData.totals.subtotal.string} total={orderData.totals.total.string} />
          <BillingDetails name={orderData.customerInfo.fullName} address={orderData.billingAddress} email={orderData.customerInfo.email} />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
