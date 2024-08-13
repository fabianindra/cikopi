import { addCashier, getCashiers } from '@/controllers/cashier.controller';
import { Router, Request, Response } from 'express';

const cashierRouter = Router();

cashierRouter.post('/get-cashiers', getCashiers);
cashierRouter.post('/add-cashiers', addCashier);

export default cashierRouter;