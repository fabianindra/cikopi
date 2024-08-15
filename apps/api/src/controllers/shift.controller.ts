import { serviceCheckIn, serviceCheckOut, serviceGetShiftReport } from '@/services/shift.services';
import { Request, Response } from 'express';

export const checkIn = async (req: Request, res: Response) => {
  try {
    const result = await serviceCheckIn(req.body);
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

export const checkOut = async (req: Request, res: Response) => {
    try {
      const result = await serviceCheckOut(req.body);
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

  export const getShiftReport = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'Start and end date query parameters are required',
        });
      }
  
      const parsedStartDate = new Date(startDate as string);
      const parsedEndDate = new Date(endDate as string);
  
      const result = await serviceGetShiftReport(parsedStartDate, parsedEndDate);
  
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