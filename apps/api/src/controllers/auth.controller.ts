import { Request, Response } from 'express';
import { serviceUserLogin } from "@/services/auth.services";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await serviceUserLogin(req.body);
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
