import { handleSubTotalTransaction } from '@/controllers/transaction.controller';
import { Router, Request, Response } from 'express';

const transactionRouter = Router();

transactionRouter.post('/payment', handleSubTotalTransaction);

export default transactionRouter;