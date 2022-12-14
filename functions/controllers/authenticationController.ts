import { Request, Response, NextFunction } from 'express';
import usersDB from '../config/usersPGInstance';
import jwt, { JwtPayload } from 'jsonwebtoken';
require('dotenv').config();

// interface AuthInfoRequest extends Request {
//   user: string;
// }

const authenticationController = {
  verifyAccessJWT: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']; // storing token in header object with key of authorization
    if (!token) return res.status(401).json(false); // returns if there is no token passed in

    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET has undefined value in authenticationController');

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
      if (!decoded || !decoded?.username) {
        return next({
          log: 'Decoded value is falsey in authenticationController',
        });
      }

      // req.user = decoded.username;
      return next();
    } catch (err) {
      if (err) return res.status(403).json(false); // if the token doesn't match up with the secret, could have been tampered with
    }
  },

  handleRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (!cookies['__session']) return res.sendStatus(401); // if no cookie with a key of jwt is passed in
    const refreshToken = cookies.__session;

    const findTokenQuery = 'SELECT * FROM "users"."admins" WHERE "refresh_token" = $1;';
    try {
      const tokenQuery = await usersDB.query(findTokenQuery, [refreshToken]);

      if (!tokenQuery?.rows) {
        return next({
          log: 'Rows property does not exist on tokenQuery object in authenticationController',
        });
      }

      if (tokenQuery.rows.length === 0) {
        res.clearCookie('__session', { httpOnly: true, sameSite: 'none', secure: true });
        return res.status(403).json(false);
      }

      if (!process.env.REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET has undefined value in authenticationController');

      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
        if (tokenQuery.rows[0].email !== decoded.username) {
          res.clearCookie('__session', { httpOnly: true, sameSite: 'none', secure: true });
          return res.status(403).json(false);
        }

        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET has undefined value in authenticationController');

        const accessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

        return res.json({ accessToken: accessToken });
      } catch (err) {
        if (err) {
          res.clearCookie('__session', { httpOnly: true, sameSite: 'none', secure: true });
          return res.status(403).json(false);
        }
      }
    } catch (err) {
      return next({
        log: 'Error occurred in the handleRefreshToken: ' + err,
        status: 400,
        message: 'An error occurred when checking login',
      });
    }
  },
};

export default authenticationController;
export const verifyAccessJWT = authenticationController.verifyAccessJWT;
export const handleRefreshToken = authenticationController.handleRefreshToken;
