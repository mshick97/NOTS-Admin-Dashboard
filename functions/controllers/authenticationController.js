const Admin = require('../models/adminModel').Admin;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticationController = {};

authenticationController.verifyAccessJWT = (req, res, next) => {
  const token = req.headers['authorization']; // storing token in header object with key of authorization
  if (!token) return res.sendStatus(401); // returns if there is no token passed in

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // if the token doesn't match up with the secret, could have been tampered with

      req.user = decoded.username;
      return next();
    }
  );
}

authenticationController.handleRefreshToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies['jwt']) return res.status(401).end(); // if no cookie with a key of jwt is passed in

  const refreshToken = cookies.jwt;
  Admin.find({ refreshToken: refreshToken }, (err, tokenRes) => {
    if (err) {
      return next({
        log: 'Error has occurred in the handleRefreshToken middleware in authenticationController',
        status: 500,
        message: { err: err }
      });
    }

    if (!tokenRes) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
      return res.status(403).end();
    }

    if (tokenRes) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error || tokenRes.email !== decoded.username) return res.sendStatus(403);

          const accessToken = jwt.sign(
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
          );

          return res.json({ accessToken });
        }
      )
    }
  });
}

module.exports = authenticationController;