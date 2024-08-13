import { serviceCheckIn } from '@/services/shift.services';
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
