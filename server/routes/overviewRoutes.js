const express = require('express');
const Router = express.Router();

const { getTotalRevenue } = require('../controllers/overviewController');

Router.post('/', getTotalRevenue, (req, res) => {
  console.log('returning: webflowPurchaseController.checkCustomerInfo');
  return res.status(200).json(res.locals.overviewData); // sending back the new or existing users info for fun
});

module.exports = Router;