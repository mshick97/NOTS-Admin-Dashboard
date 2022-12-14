import { Router, Request, Response } from 'express';
import { getAllCustomers, findUser, createNewCustomer, deleteUser } from '../controllers/customerController';

const usersRouter = Router();

usersRouter.get('/', getAllCustomers, (req: Request, res: Response) => {
  console.log('returning: customerController.getAllCustomers');
  return res.status(200).json(res.locals);
});

usersRouter.delete('/:id', deleteUser, (req: Request, res: Response) => {
  console.log('returning: customerController.deleteUser');
  return res.status(200).json(res.locals);
});

usersRouter.post('/find_user', findUser, (req: Request, res: Response) => {
  console.log('returning: customerController.findUser');
  return res.status(200).json(res.locals);
});

usersRouter.post('/create_user', createNewCustomer, (req: Request, res: Response) => {
  console.log('returning: customerController.createNewCustomer');
  return res.status(200).json(res.locals);
});

export default usersRouter;
