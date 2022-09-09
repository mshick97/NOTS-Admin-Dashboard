const express = require('express');
const Router = express.Router();

const { getOrders } = require('../controllers/webflowOrdersController');

Router.get('/', getOrders, (req, res) => {
  console.log('returning: webflowOrdersController.getOrders');
  return res.status(200).json(res.locals.orderData);
});

module.exports = Router;