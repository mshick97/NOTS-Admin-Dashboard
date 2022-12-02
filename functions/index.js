const path = require('path');
const firebaseFunctions = require('firebase-functions');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = 3000;

// Defining allowed origins and handling CORS
const allowedOrigins = [
  'https://nots-admin-dashboard.web.app',
  'https://nots-admin-dashboard.web.app/',
  'https://nots-admin-dashboard.firebaseapp.com',
  'https://nots-admin-dashboard.firebaseapp.com/',
  'https://admin.notshair.com',
  'https://admin.notshair.com/',
  'https://www.admin.notshair.com',
  'https://www.admin.notshair.com/',
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost:8080',
  'http://localhost:8080/',
];

const corsOptions = {
  origin: true,
  credentials: true,
};
const cors = require('cors')(corsOptions);

// Parsing each request that comes into server
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // url encoded form data
app.use(cookieParser());

// For handling React Router routes in production. NOTE: build folder must be inside functions directory before deploying
app.use('**/js/bundle.js', (req, res) => res.sendFile(path.join(__dirname, './build/js/bundle.js')));

// Serving static files
app.use('**/css', express.static(path.resolve(__dirname, './build')));

app.use(express.static(path.join(__dirname, './build')));

// For handling all client requests in admin application + Webflow POST requests
app.use('/api', require('./routes/apiRoutes'));

// Catch all for invalid endpoint requests
app.use('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'An internal server error has occurred',
    status: 500,
    message: { err: 'An internal server error has occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

process.env.NODE_ENV === 'production'
  ? (exports.server = firebaseFunctions.https.onRequest(app))
  : app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `Server is listening on port: ${PORT}`));
