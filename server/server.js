const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;

// Database connection
const mongooseURI = 'mongodb+srv://mshick97:C5a915F886!@notscustomerdb.0jqdgpw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongooseURI, () => {
  console.log('Connected to MongoDB');
});

// Parsing each request that comes into server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// For routes
const webflowRouter = require('./routes/webflowRoutes');
const clientRouter = require('./routes/clientRoutes');

// The primary requests coming in from a customer purchase
app.use('/purchase', webflowRouter);

app.use('/client', clientRouter);

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

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
