const express = require('express');
const Router = express.Router();
const adminDashController = require('../controllers/adminDashController');

Router.get('/customers', adminDashController.getAllCustomers, (req, res, next) => {
  console.log('passing through adminDashboard router for getting customers');
  return next();
});

Router.post('/admin-login', adminDashController.adminLogin, (req, res, next) => {
  console.log('passing through adminDasboard router for login');
  return next();
});

module.exports = Router;