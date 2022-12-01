const express = require('express');
const Router = express.Router();

const { getTotalRevenue } = require('../controllers/stripeController');

Router.get('/', getTotalRevenue, (req, res) => {
  console.log('returning: stripeController.getTotalRevenue');
  return res.status(200).json(res.locals); // sending back the new or existing users info for fun
});

module.exports = Router;
