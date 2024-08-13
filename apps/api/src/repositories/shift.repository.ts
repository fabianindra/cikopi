import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoFindShift = async (shift_id: number) => {
    return await prisma.shift.findUnique({
      where: { id: shift_id },
    });
  };

  export const repoCheckIn = async (cashAmount: string, userId: number) => {
    await prisma.shift.create({ 
      data: {
        cash_balance_opening: parseInt(cashAmount),
        user: { connect: { id: userId } },
      },
    });
  };