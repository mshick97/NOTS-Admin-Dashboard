const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('firebase-admin');
const Admin = require('../models/adminModel').Admin;
require('dotenv').config();

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
      res.locals.isAdmin = false
      return res.status(200).json(res.locals.isAdmin);
    }

    if (searchRes) {
      const hashedPassword = searchRes.password;

      await bcrypt.compare(password + process.env.BCRYPT_SECRET, hashedPassword, async function (error, result) {
        if (error) {
          return next({
            log: err,
            message: 'Invalid email or password'
          });
        }

        if (result) {
          // Creating access token for short session access to APIs and storing the refresh token to refresh access tokens
          const accessToken = jwt.sign(
            { username: searchRes.email },
            process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: '600s' }
            { expiresIn: '5s' }
          );

          const refreshToken = jwt.sign(
            { username: searchRes.email },
            process.env.REFRESH_TOKEN_SECRET,
            // { expiresIn: '1d' }
            { expiresIn: '15s' }
          );

          searchRes.refreshToken = refreshToken; // modifying the search result of the refreshToken property when an admin is found and their password is valid
          await searchRes.save(); // native method from mongoose allows you to save a document after modifying instead of having to re-query

          res.locals.isAdmin = {
            validLogin: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            adminName: { firstName: searchRes.firstName, lastName: searchRes.lastName }
          };

          // res.cookie('__session', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }); // setting max age to one day + sending back the refresh token as the cookie + not accessible by JS
          return next();
        }

        if (!result) {
          res.locals.isAdmin = false
          return res.status(200).json(res.locals.isAdmin);
        }
      });
    }
  });
}

module.exports = adminController;