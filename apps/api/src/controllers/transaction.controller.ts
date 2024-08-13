import { Request, Response } from 'express';
import { serviceGetTransactionByDate, serviceGetTransactionDetails, serviceSubTotal } from "@/services/transaction.service";

export const handleSubTotalTransaction = async (req: Request, res: Response) => {
  try {
    const result = await serviceSubTotal(req.body);
    return res.status(result.status).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    });
  }
};

export const handleGetTransactionByDate = async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
  
      if (!date) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'Date query parameter is required',
        });
      }
  
      const parsedDate = new Date(date as string);
  
      const result = await serviceGetTransactionByDate(parsedDate);
  
      return res.status(result.status).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };

  export const handleGetTransactionDetails = async (req: Request, res: Response) => {
    try {
      const transactionId = Number(req.query.transactionId);
  
      if (!transactionId) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'Transaction ID query parameter is required',
        });
      }
      const result = await serviceGetTransactionDetails(transactionId);
  
      return res.status(result.status).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };