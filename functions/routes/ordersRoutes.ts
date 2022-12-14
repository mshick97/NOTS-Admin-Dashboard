import { Router, Request, Response } from 'express';
import { getOrders } from '../controllers/ordersController';

const ordersRouter = Router();

ordersRouter.get('/', getOrders, (req: Request, res: Response) => {
  console.log('returning: ordersController.getOrders');
  return res.status(200).json(res.locals.orderData);
});

export default ordersRouter;
