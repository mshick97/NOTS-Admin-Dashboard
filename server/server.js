const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DBConnect');
const PORT = 3000;


// Parsing each request that comes into server
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // url encoded form data
app.use(cors());


// JWT authentication middlewares
const { verifyAccessJWT, handleRefreshToken } = require('./controllers/authenticationController.js');

// The primary requests coming in from a customer purchase
app.use('/purchase', require('./routes/webflowRoutes'));
app.use('/auth', require('./routes/adminRoutes'));
app.use('/refresh', handleRefreshToken);

// Every API below must include an access token to access
app.use(verifyAccessJWT);
app.use('/client', require('./routes/clientRoutes'));


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


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
