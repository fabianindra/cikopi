import { repoSubTotal } from "@/repositories/transaction.repository";
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
