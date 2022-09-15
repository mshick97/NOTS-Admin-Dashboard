const path = require('path');
const firebaseFunctions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DBConnect');
require('dotenv').config();
const PORT = 3000;


// Defining allowed origins and handling CORS
const allowedOrigins = [
  'https://nots-admin-dashboard.web.app',
  'https://nots-admin-dashboard.firebaseapp.com',
  'https://admin.notshair.com',
  'https://www.admin.notshair.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}


// Parsing each request that comes into server
connectDB();
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // url encoded form data
app.use(cookieParser());


// Serving static files
app.use(express.static(path.resolve(__dirname, './build')));
app.use('/css', express.static(path.resolve(__dirname, '../build')));

// For handling React Router routes in production
app.use('/login', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
app.use('/overview', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
app.use('/orders', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
app.use('/customers', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));


// JWT authentication middlewares
const { verifyAccessJWT, handleRefreshToken } = require('./controllers/authenticationController.js');

// The primary requests coming in from a customer purchase
app.use('/webflow', require('./routes/webflowRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/refresh', handleRefreshToken);

// Every API below must include an access token to access
app.use(verifyAccessJWT);
app.use('/overview_data', require('./routes/overviewRoutes'));
app.use('/order_info', require('./routes/ordersRoutes'));
app.use('/users', require('./routes/customersRoutes'));


// Catch all for invalid endpoint requests
app.use('*', (req, res) => res.status(404).json('Invalid request, please try again'));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'An internal server error has occurred',
    status: 500,
    message: { err: 'An internal server error has occurred' }
  }

  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});


process.env.NODE_ENV === 'development' ?
  app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `Server is listening on port: ${PORT}`)) :
  exports.server = firebaseFunctions.https.onRequest(app);
