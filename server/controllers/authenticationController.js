const bcrypt = require('bcrypt');

const authenticationController = {};

authenticationController.setCookie = (req, res, next) => {
  // res.cookie('id', req.body.password, { httpOnly: true, secure: true }); // example
  return next();
}


authenticationController.verifyCookie = (req, res, next) => {

}

module.exports = authenticationController;