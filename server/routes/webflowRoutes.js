const express = require('express');
const Router = express.Router();

const { checkCustomerInfo } = require('../controllers/webflowPurchaseController');
const { getOrders } = require('../controllers/webflowOrdersController');

Router.get('/', getOrders, (req, res) => {
  console.log('returning: webflowOrdersController.getOrders');
  return res.status(200).json(res.locals.orderData);
});

Router.post('/', checkCustomerInfo, (req, res) => {
  console.log('returning: webflowPurchaseController.checkCustomerInfo');
  return res.status(200).json(res.locals.newUser || res.locals.foundUser); // sending back the new or existing users info for fun
});

module.exports = Router;