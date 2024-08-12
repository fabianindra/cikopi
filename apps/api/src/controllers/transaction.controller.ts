import { Request, Response } from 'express';
import { serviceSubTotal } from "@/services/transaction.service";

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
