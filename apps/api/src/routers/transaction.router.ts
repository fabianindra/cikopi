import { handleGetTransactionAdmin, handleGetTransactionByDate, handleGetTransactionDetails, handleSubTotalTransaction } from '@/controllers/transaction.controller';
import { Router, Request, Response } from 'express';

const transactionRouter = Router();

transactionRouter.post('/payment', handleSubTotalTransaction);
transactionRouter.get('/get-by-date', handleGetTransactionByDate);
transactionRouter.get('/get-details', handleGetTransactionDetails);
transactionRouter.get('/get-admin', handleGetTransactionAdmin);

export default transactionRouter;