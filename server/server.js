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

// For routes
const apiRouter = require('./routes/apiRoutes');

// For testing the server is running
app.get('/api', apiRouter, (req, res) => {
  return res.status(200).json('Successful test of server');
})


// The primary POST request coming in from a customer purchase
app.post('/purchase', (req, res) => {
  console.log(req.body);
  return res.status(200).json('You did it');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});