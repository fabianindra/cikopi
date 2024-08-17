import { addCashier, deleteCashier, editCashier, getCashiers } from '@/controllers/cashier.controller';
import { Router, Request, Response } from 'express';

const cashierRouter = Router();

cashierRouter.post('/get-cashiers', getCashiers);
cashierRouter.post('/add-cashiers', addCashier);
cashierRouter.post('/edit-cashier', editCashier);
cashierRouter.post('/delete-cashier', deleteCashier);

export default cashierRouter;