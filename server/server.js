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

// The primary POST request coming in from a customer purchase
app.use('/purchase', webflowRouter);

app.use('/client', clientRouter);

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



// Don't need for development testing
// app.get('./client/styles/styles.css', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '/client/styles/styles.css'));
// })


// // For testing the server is running
// const testerRouter = require(path.join(__dirname, './routes/testerRoutes'));

// app.use('/test', testerRouter, (req, res) => {
//   console.log('before return')
//   return res.status(200).json('Successful test of routes, controller, and endpoint');
// });