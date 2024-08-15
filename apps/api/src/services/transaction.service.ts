import { repoGetTransactionAdmin, repoGetTransactionByDate, repoGetTransactionDetails, repoSubTotal } from "@/repositories/transaction.repository";
import { SubTotalRequest } from "@/types";

export const serviceSubTotal = async (request: SubTotalRequest) => {
  const { products, transactionData } = request;

  try {
    await repoSubTotal({
      products,
      transactionData,
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
  