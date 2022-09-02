const express = require('express');
const Router = express.Router();

// Import controllers
const { getAllCustomers, findUser, updateUser, createNewCustomer, deleteUser } = require('../controllers/customerController');

Router.get('/', getAllCustomers, (req, res) => {
  console.log('returning: customerController.getAllCustomers');
  return res.status(200).json(res.locals);
});

Router.delete('/', deleteUser, (req, res) => {
  console.log('returning: customerController.deleteUser');
  return res.status(200).json(res.locals);
});

Router.post('/find_user', findUser, (req, res) => {
  console.log('returning: customerController.findUser');
  return res.status(200).json(res.locals);
});

Router.post('/update_user', updateUser, (req, res) => {
  console.log('returning: customerController.updateUser');
  return res.status(200).json(res.locals);
});

Router.post('/create_user', createNewCustomer, (req, res) => {
  console.log('returning: customerController.createNewCustomer');
  return res.status(200).json(res.locals);
});

module.exports = Router;