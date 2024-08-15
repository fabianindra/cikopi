import { sign } from 'jsonwebtoken';
import { repoCashCheck, repoCheckIn, repoCheckOut, repoFindShift, repoGetShiftReport } from "@/repositories/shift.repository";
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


  export const serviceGetShiftReport = async (startDate: Date, endDate: Date) => {
    try {
      const shifts = await repoGetShiftReport(startDate, endDate);
  
      const report = shifts.map(shift => ({
        user: shift.user.username,
        cash_balance_opening: shift.cash_balance_opening,
        cash_balance_closing: shift.cash_balance_closing,
        date: shift.createdAt,
        total_transactions: shift.transaction.reduce((total, txn) => total + txn.grand_total, 0),
      }));
  
      return {
        status: 200,
        success: true,
        data: report,
        message: 'Shift report successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve shift report: ${error.message}`,
      };
    }
  };

  export const serviceCashCheck = async (date: Date) => {
    try {
      const transactions = await repoCashCheck(date);
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Cash check successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve cash check: ${error.message}`,
      };
    }
  };
  