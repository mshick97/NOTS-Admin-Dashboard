const express = require('express');
const Router = express.Router();

const { adminLogin, addRefreshToken } = require('../controllers/adminController');

Router.post('/', adminLogin, addRefreshToken, (req, res) => {
  console.log('returning: adminController.adminLogin');
  return res.status(200).json(res.locals.isAdmin);
});

module.exports = Router;
