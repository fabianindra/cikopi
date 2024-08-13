import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoFindShift = async (shift_id: number) => {
    return await prisma.shift.findUnique({
      where: { id: shift_id },
    });
  };

  export const repoCheckIn = async (cashAmount: string, userId: number) => {
    return await prisma.shift.create({ 
      data: {
        cash_balance_opening: parseInt(cashAmount),
        user: { connect: { id: userId } },
      },
    });
  };

  export const repoCheckOut = async (cashAmount: string, userId: number, shiftId: number) => {
    const shift = await repoFindShift(shiftId);
    if (!shift) {
      throw new Error('Shift not found');
    }

    if (shift.user_id !== userId) {
      throw new Error('User not authorized for this shift');
    }

    await prisma.shift.update({ 
      where: { id: shiftId },
      data: {
        cash_balance_closing: parseInt(cashAmount),
      },
    });
  };