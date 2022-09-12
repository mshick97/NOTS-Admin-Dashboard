const express = require('express');
const Router = express.Router();

const { getOrders } = require('../controllers/ordersController');

Router.get('/', getOrders, (req, res) => {
  console.log('returning: ordersController.getOrders');
  return res.status(200).json(res.locals.orderData);
});

module.exports = Router;