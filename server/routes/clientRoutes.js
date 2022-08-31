const express = require('express');
const Router = express.Router();

// Import controllers
const authenticationController = require('../controllers/authenticationController.js');
const customerController = require('../controllers/customerController');
const adminController = require('../controllers/adminController');

Router.get('/customers', customerController.getAllCustomers, (req, res) => {
  console.log('pre-return for customerController.getAllCustomers');
  return res.status(200).json(res.locals.customers);
});

Router.post('/admin-login', adminController.adminLogin, (req, res) => {
  console.log('pre-return for adminController.adminLogin');
  return res.status(200).json(res.locals.isAdmin);
});

Router.post('/find-user', customerController.findUser, (req, res) => {
  console.log('pre-return customerController.findUser');
  return res.status(200).json(res.locals.foundUser);
});

Router.post('/update-user', customerController.updateUser, (req, res) => {
  console.log('pre-return for customerController.updateUser');
  return res.status(200).json(res.locals.updatedUser);
});

Router.post('/create-user', customerController.createNewCustomer, (req, res) => {
  console.log('pre-return for customerController.createNewCustomer');
  return res.status(200).json(res.locals.createdUser);
});

Router.delete('/delete-user', customerController.deleteUser, (req, res) => {
  console.log('pre-return for customerController.deleteUser');
  return res.status(200).json(res.locals.didDelete);
});

module.exports = Router;