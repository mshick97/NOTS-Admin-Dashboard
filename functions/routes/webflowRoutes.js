const express = require('express');
const Router = express.Router();

const { checkCustomerInfo } = require('../controllers/webflowPurchaseController');

Router.post('/', checkCustomerInfo, (req, res) => {
  console.log('returning: webflowPurchaseController.checkCustomerInfo');
  return res.status(200).json(res.locals.newUser || res.locals.foundUser); // sending back the new or existing users info for fun
});

module.exports = Router;