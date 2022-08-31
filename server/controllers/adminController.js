const bcrypt = require('bcrypt');
const { secret } = require('../bcryptUtil/saltAndSecret');
const Admin = require('../models/adminModel').Admin;

const adminController = {};

adminController.adminLogin = (req, res, next) => {
  const { email, password } = req.body;

  Admin.findOne({ email: email }, async (err, searchRes) => {
    if (err) {
      return next({
        log: 'Error has occurred in the adminLogin middleware in adminController',
        status: 407,
        message: { err: err }
      });
    }

    if (!searchRes) {
      res.locals.isAdmin = false;
      return next();
    }

    if (searchRes) {
      const hashedPassword = searchRes.password;

      await bcrypt.compare(password + secret, hashedPassword, function (err, result) {
        if (err) {
          return next({
            log: err,
            message: 'Invalid email or password'
          });
        }

        if (result) {
          res.locals.isAdmin = {
            validLogin: true,
            adminName: { firstName: searchRes.firstName }
          };

          return next();
        }
      });
    }
  });
}

module.exports = adminController;