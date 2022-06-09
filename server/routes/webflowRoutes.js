const express = require('express');
const Router = express.Router();
const webflowPurchaseController = require('../controllers/webflowPurchaseController');

Router.post('/', webflowPurchaseController.checkCustomerInfo, (req, res) => {
  console.log('passing through Webflow Router in routes folder');
  return res.status(200).json(res.locals.newUser || res.locals.foundUser); // sending back the new or existing users info for fun
})

module.exports = Router;