const axios = require('axios');
require('dotenv').config();

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const NOTS_HAIR_SITE_ID = process.env.NOTS_HAIR_SITE_ID;
const WEBFLOW_API_URL = 'https://api.webflow.com'

const ordersController = {};

ordersController.getOrders = async (req, res, next) => {
  const WEBFLOW_ORDERS_URL = `${WEBFLOW_API_URL}/sites/${NOTS_HAIR_SITE_ID}/orders`;
  
  const orders = await axios.get(WEBFLOW_ORDERS_URL, {
    headers: { 'Authorization': `Bearer ${WEBFLOW_API_KEY}` }
  });

  const ordersData = [];

  orders.data.forEach((orderDetails) => {
    const {
      acceptedOn,
      comment,
      customerInfo,
      customerPaid,
      netAmount,
      orderComment,
      orderId,
      paypalDetails,
      purchasedItems,
      status,
      stripeDetails,
      totals
    } = orderDetails;

    const order = {
      acceptedOn: acceptedOn,
      comment: comment,
      customerInfo: customerInfo,
      customerPaid: customerPaid,
      netAmount: netAmount,
      orderComment: orderComment,
      orderId: orderId,
      paypalDetails: paypalDetails,
      purchasedItems: purchasedItems,
      status: status,
      stripeDetails: stripeDetails,
      totals: totals
    }

    ordersData.push(order);
  });

  res.locals.orderData = ordersData;

  return next();
}

module.exports = ordersController;