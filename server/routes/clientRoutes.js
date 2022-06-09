const express = require('express');
const Router = express.Router();
const adminDashController = require('../controllers/adminDashController');

Router.get('/customers', adminDashController.getAllCustomers, (req, res) => {
  console.log('passing through adminDashboard router for getting customers');
  return res.status(200).json(res.locals.customers);
});

Router.post('/admin-login', adminDashController.adminLogin, (req, res) => {
  console.log('passing through adminDasboard router for login');
  // Prompt to try again if the login is invalid
  if (res.locals.isAdmin === false) {
    return res.status(200).json(false); // sending false to the "validLogin variable on the client side"
  }

  // Redirect to admin portal if the login is valid
  if (res.locals.isAdmin.validLogin === true) {
    return res.status(200).json(res.locals.isAdmin);
  }
});

Router.delete('/delete-user', adminDashController.deleteUser, (req, res) => {
  console.log('passing through adminDasboard router for deleting a user');
  return res.status(200).json(res.locals.didDelete);
})

module.exports = Router;