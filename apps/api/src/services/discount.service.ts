import { repoAddDiscount, repoGetDiscount } from "@/repositories/discount.repository";

export const serviceAddDiscount = async ({
    startDate,
    endDate,
    discountAmount
  }: {
    startDate: string;
    endDate: string;
    discountAmount: string;
  }) => {
  
    try {
      const start_date = new Date(startDate);
      const end_date = new Date(endDate);
      const value = parseFloat(discountAmount);
  
      await repoAddDiscount(start_date, end_date, value);
    } catch (error) {
      console.error('Error adding discount:', error);
      throw error;
    }
  };
  
  export const serviceGetDiscount = async (dateString: string) => {
    try {
      const date = new Date(dateString);
      const discount = await repoGetDiscount(date);
      return discount;
    } catch (error) {
      console.error('Error retrieving discount:', error);
      throw error;
    }
  };