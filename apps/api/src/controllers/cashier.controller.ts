import { Request, Response } from 'express';
import { serviceAddCashier, serviceDeleteCashier, serviceEditCashier, serviceGetCashiers } from '@/services/cashier.services';
import { GetCashiersParams } from '@/types';

export const getCashiers = async (req: Request, res: Response) => {
  try {
    const params: GetCashiersParams = req.body;
    const cashiers = await serviceGetCashiers(params);
    return res.status(200).json({ data: cashiers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch cashiers' });
  }
};

export const addCashier = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      const result = await serviceAddCashier({ username, password });
  
      return res.status(201).send({
        status: 201,
        success: true,
        message: 'Cashier created successfully',
        result,
      });
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

  export const editCashier = async (req: Request, res: Response) => {
    try {
      const { userId, username, password } = req.body;
  
      const result = await serviceEditCashier({ userId, username, password });
  
      return res.status(201).send({
        status: 201,
        success: true,
        message: 'Cashier edited successfully',
        result,
      });
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

  export const deleteCashier = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
  
      const result = await serviceDeleteCashier({ userId });
  
      return res.status(201).send({
        status: 201,
        success: true,
        message: 'Cashier deleted successfully',
        result,
      });
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
  
