const express = require('express');
const Router = express.Router();
const webflowPurchaseController = require('../controllers/webflowPurchaseController');

Router.post('/', webflowPurchaseController.checkCustomerInfo, (req, res, next) => {
  console.log('passing through Webflow Router in routes folder');
  return next();
})

module.exports = Router;