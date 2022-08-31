const express = require('express');
const Router = express.Router();

// Import controllers
const { verifyJWT, handleRefreshToken } = require('../controllers/authenticationController.js');
const { getAllCustomers, findUser, updateUser, createNewCustomer, deleteUser } = require('../controllers/customerController');
const { adminLogin } = require('../controllers/adminController');

Router.get('/customers', handleRefreshToken, getAllCustomers, (req, res) => {
  console.log('pre-return for customerController.getAllCustomers');
  return res.status(200).json(res.locals);
});

Router.post('/admin-login', adminLogin, (req, res) => {
  console.log('pre-return for adminController.adminLogin');
  return res.status(200).json(res.locals.isAdmin);
});

Router.post('/find-user', handleRefreshToken, findUser, (req, res) => {
  console.log('pre-return customerController.findUser');
  return res.status(200).json(res.locals);
});

Router.post('/update-user', handleRefreshToken, updateUser, (req, res) => {
  console.log('pre-return for customerController.updateUser');
  return res.status(200).json(res.locals);
});

Router.post('/create-user', handleRefreshToken, createNewCustomer, (req, res) => {
  console.log('pre-return for customerController.createNewCustomer');
  return res.status(200).json(res.locals);
});

Router.delete('/delete-user', handleRefreshToken, deleteUser, (req, res) => {
  console.log('pre-return for customerController.deleteUser');
  return res.status(200).json(res.locals);
});

module.exports = Router;