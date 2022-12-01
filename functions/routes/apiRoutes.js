const express = require('express');
const Router = express.Router();

Router.use('/webflow', require('./webflowRoutes')); // The primary requests coming in from a customer purchase
Router.use('/auth', require('./authRoutes'));
Router.use('/refresh', require('../controllers/authenticationController').handleRefreshToken); // For refreshing the access token

// Every API below must include an access token to access
Router.use(require('../controllers/authenticationController').verifyAccessJWT);
Router.use('/stripe', require('./stripeRoutes'));
Router.use('/order_info', require('./ordersRoutes'));
Router.use('/users', require('./usersRoutes'));

module.exports = Router;
