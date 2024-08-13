import { Request, Response } from 'express';
import { serviceAddCashier, serviceGetCashiers } from '@/services/cashier.services';
import { GetCashiersParams } from '@/types';

export const getCashiers = async (req: Request, res: Response) => {
  try {
    const sortDirection = req.query.sortDirection === 'asc' || req.query.sortDirection === 'desc'
      ? req.query.sortDirection
      : 'desc';

    const params: GetCashiersParams = {
      search: req.query.search as string,
      page: req.query.page as string,
      pageSize: req.query.pageSize as string,
      sortBy: req.query.sortBy as string,
      sortDirection,
    };

    const result = await serviceGetCashiers(params);
    return res.status(result.status).send(result);
  } catch (error) {
    console.error('Error in getCashiers controller:', error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    });
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
  
