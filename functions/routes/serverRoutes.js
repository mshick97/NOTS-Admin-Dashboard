const express = require('express');
const Router = express.Router();

Router.use('/auth', require('./routes/authRoutes'));
Router.use('/refresh', require('./controllers/authenticationController.js').handleRefreshToken); // For refreshing the access token

// Every API below must include an access token to access
Router.use(require('./controllers/authenticationController.js').verifyAccessJWT);
Router.use('/overview_data', require('./routes/overviewRoutes'));
Router.use('/order_info', require('./routes/ordersRoutes'));
Router.use('/users', require('./routes/customersRoutes'));

module.exports = Router;