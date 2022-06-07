const express = require('express');
const Router = express.Router();

Router.get('/', (req, res, next) => {
  console.log('passing through testing router');
  return next();
})

module.exports = Router;