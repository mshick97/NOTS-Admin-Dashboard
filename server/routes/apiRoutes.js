const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
  console.log('passing through router');
})

module.exports = Router;