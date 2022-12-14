import { Router } from 'express';
import authRouter from './authRoutes';
import ordersRouter from './ordersRoutes';
import stripeRouter from './stripeRoutes';
import usersRouter from './usersRoutes';
import webflowRouter from './webflowRoutes';
import { verifyAccessJWT, handleRefreshToken } from '../controllers/authenticationController';

const apiRouter = Router();

apiRouter.use('/webflow', webflowRouter); // The primary requests coming in from a customer purchase
apiRouter.use('/auth', authRouter);
apiRouter.use('/refresh', handleRefreshToken); // For refreshing the access token

// Every API below must include an access token to access
apiRouter.use(verifyAccessJWT);
apiRouter.use('/stripe', stripeRouter);
apiRouter.use('/order_info', ordersRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
