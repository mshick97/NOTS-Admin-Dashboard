const express = require('express');
const Router = express.Router();
const adminDashController = require('../controllers/adminDashController');

Router.get('/', adminDashController.getAllCustomers, (req, res, next) => {
  console.log('passing through testing router');
  return next();
})

module.exports = Router;