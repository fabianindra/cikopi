import { repoGetTransactionByProductByDate } from "@/repositories/consignment.repository";
import { repoGetTransactionAdmin, repoGetTransactionByDate, repoGetTransactionByDateById, repoGetTransactionDetails, repoSubTotal } from "@/repositories/transaction.repository";
import { SubTotalRequest } from "@/types";
import { verify } from 'jsonwebtoken';

export const serviceSubTotal = async (request: SubTotalRequest) => {
  const { products, shift_id, payment_type, payment } = request;

  try {
    await repoSubTotal({
      products,
      shift_id,
      payment_type,
      payment,
    });

    return {
      status: 201,
      success: true,
      message: 'Transaction successfully recorded',
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: 500,
      success: false,
      message: `Failed to record transaction: ${error.message}`,
    };
  }
};

export const serviceGetTransactionByDate = async (date: Date) => {
    try {
      const transactions = await repoGetTransactionByDate(date);
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Transactions successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve transactions: ${error.message}`,
      };
    }
  };


  export const serviceGetTransactionByDateById = async (date: Date, token: string) => {
    try {
      let userId: number | undefined;
  
      try {
        const secret = process.env.JWT_SECRET;
        if (secret) {
          const decodedToken = verify(token, secret) as { userid: number };
          console.log('Decoded Token:', decodedToken);
          userId = Number(decodedToken.userid);
        }
      } catch (err) {
        console.error('Token verification error:', err);
        return {
          status: 401,
          success: false,
          message: 'Invalid or expired token',
        };
      }
  
      if (userId === undefined) {
        return {
          status: 401,
          success: false,
          message: 'User ID not found in token',
        };
      }
  
      const transactions = await repoGetTransactionByDateById(date, userId);
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Transactions successfully retrieved',
      };
    } catch (error: any) {
      console.error('Service error:', error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve transactions: ${error.message}`,
      };
    }
  };

  export const serviceGetTransactionDetails = async (transactionId : number) => {
    try {
      const transactions = await repoGetTransactionDetails (transactionId)
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Transactions details successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve transactions details: ${error.message}`,
      };
    }
  };

  export const serviceGetTransactionAdmin = async (startDate: Date, endDate: Date, category?: string, sortBy: string = 'transaction_date', sortDirection: 'asc' | 'desc' = 'asc') => {
    try {
      const transactions = await repoGetTransactionAdmin(startDate, endDate, category, sortBy, sortDirection);
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Transactions successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve transactions: ${error.message}`,
      };
    }
  };
  
  export const serviceGetTransactionByProductByDate = async (date: Date) => {
    try {
      const transactions = await repoGetTransactionByProductByDate(date);
  
      return {
        status: 200,
        success: true,
        data: transactions,
        message: 'Transactions successfully retrieved',
      };
    } catch (error: any) {
      console.error(error);
      return {
        status: 500,
        success: false,
        message: `Failed to retrieve transactions: ${error.message}`,
      };
    }
  };