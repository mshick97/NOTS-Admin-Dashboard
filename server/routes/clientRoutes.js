const express = require('express');
const Router = express.Router();

// Import controllers
const { getAllCustomers, findUser, updateUser, createNewCustomer, deleteUser } = require('../controllers/customerController');

Router.get('/customers', getAllCustomers, (req, res) => {
  console.log('pre-return for customerController.getAllCustomers');
  return res.status(200).json(res.locals);
});

Router.post('/find-user', findUser, (req, res) => {
  console.log('pre-return customerController.findUser');
  return res.status(200).json(res.locals);
});

Router.post('/update-user', updateUser, (req, res) => {
  console.log('pre-return for customerController.updateUser');
  return res.status(200).json(res.locals);
});

Router.post('/create-user', createNewCustomer, (req, res) => {
  console.log('pre-return for customerController.createNewCustomer');
  return res.status(200).json(res.locals);
});

Router.delete('/delete-user', deleteUser, (req, res) => {
  console.log('pre-return for customerController.deleteUser');
  return res.status(200).json(res.locals);
});

module.exports = Router;