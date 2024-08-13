import { sign } from 'jsonwebtoken';
import { repoCheckIn, repoCheckOut, repoFindShift } from "@/repositories/shift.repository";
import { repoFindUser, repoFindUserById } from '../repositories/auth.repository';

const createToken = (payload: object, expiresIn: string): string => {
    const secret = process.env.JWT_SECRET!;
    return sign(payload, secret, { expiresIn });
  };
  
  export const serviceCheckIn = async (request: any) => {
    const { cashAmount, userId }: { cashAmount: string, userId: number } = request;
    try {
      const shift = await repoCheckIn(cashAmount, userId);

      const user = await repoFindUserById(userId);
      if (!user) {
        return {
          status: 404,
          success: false,
          message: 'User not found',
        };
      }

      const jwtPayload = { shiftId: shift.id };
      const token = createToken(jwtPayload, '1h');
  
      return {
        status: 201,
        success: true,
        message: 'Check In Success',
        token: token,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Server error',
        error: (error as Error).message,
      };
    }
  };

  export const serviceCheckOut = async (request: any) => {
    const { cashAmount, userId, shiftId }: { cashAmount: string, userId: number, shiftId: number } = request;
    try {
      const checkOut = await repoCheckOut(cashAmount, userId, shiftId);
      return {
        status: 201,
        success: true,
        message: 'Check Out Success',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Server error',
        error: (error as Error).message,
      };
    }
  };