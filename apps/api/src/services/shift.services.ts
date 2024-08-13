import { repoCheckIn } from "@/repositories/shift.repository";

export const serviceCheckIn = async (request: any) => {
    const { cashAmount, userId }: { cashAmount: string, userId: number } = request;
    try {
      const checkIn = await repoCheckIn(cashAmount, userId);
      return {
        status: 201,
        success: true,
        message: 'Check In Success',
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