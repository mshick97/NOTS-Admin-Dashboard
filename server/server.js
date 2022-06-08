const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// Database related imports and variables
const mongoose = require('mongoose');
const mongooseURI = 'mongodb+srv://mshick97:C5a915F886!@notscustomerdb.0jqdgpw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongooseURI, () => {
  console.log('Connected to the database');
})

// Parsing each request that comes into server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

// For routes
const webflowRouter = require(path.join(__dirname, './routes/webflowRoutes'));
const clientRouter = require(path.join(__dirname, './routes/clientRoutes'));

app.get('./client/styles/styles.css', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '/client/styles/styles.css'));
})

// The primary POST request coming in from a customer purchase
app.use('/purchase', webflowRouter, (req, res) => {
  return res.status(200).json(res.locals.newUser || res.locals.foundUser); // sending back the new or existing users info for fun
});

app.use('/client', clientRouter, (req, res) => {
  // Redirect to admin portal if the login is valid
  if (res.locals.isAdmin === true) {
    return res.status(200).json(true);
  }

  // Prompt to try again if the login is invalid
  if (res.locals.isAdmin === false) {
    return res.status(200).json(false); // sending false to the "validLogin variable on the client side"
  }

  if (res.locals.customers) {
    return res.status(200).json(res.locals.customers);
  }
});

// Redirect endpoint for successful login attempt, could possible achieve it in React
app.get('/admin-portal', (req, res) => {
  return res.status(200)
})

// Catch all for invalid endpoint requests
app.use('*', (req, res) => res.status(404).json('Invalid request, please wait and try again'));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Unknown internal server error',
    status: 500,
    message: { err: 'An error has occurred server-side' }
  }
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


// // For testing the server is running
// const testerRouter = require(path.join(__dirname, './routes/testerRoutes'));

// app.use('/test', testerRouter, (req, res) => {
//   console.log('before return')
//   return res.status(200).json('Successful test of routes, controller, and endpoint');
// });