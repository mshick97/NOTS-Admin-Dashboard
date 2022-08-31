const Admin = require('../models/adminModel').Admin;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticationController = {};

authenticationController.verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  console.log(authHeader);
  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);

      req.user = decoded.username;
      return next();
    }
  );
}

authenticationController.handleRefreshToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;
  Admin.findOne({ refreshToken: refreshToken }, (err, searchRes) => {
    if (err) {
      return next({
        log: 'Error has occurred in the handleRefreshToken middleware in authenticationController',
        status: 500,
        message: { err: err }
      });
    }

    if (!searchRes) {
      return res.sendStatus(403);
    }

    if (searchRes) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error || searchRes.email !== decoded.username) return res.sendStatus(403);

          const accessToken = jwt.sign(
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
          );

          res.locals.accessToken = accessToken;
          return next();
        }
      )
    }
  });
}

module.exports = authenticationController;