const express = require('express');
const Router = express.Router();

const { adminLogin } = require('../controllers/adminController');

Router.post('/', adminLogin, (req, res) => {
  console.log('pre-return for adminController.adminLogin');
  return res.status(200).json(res.locals.isAdmin);
});

module.exports = Router;