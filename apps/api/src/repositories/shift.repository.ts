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

  export const repoGetShiftReport = async (startDate: Date, endDate: Date) => {
    return await prisma.shift.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: true,
        transaction: {
          select: {
            grand_total: true,
          },
        },
      },
    });
  };


  export const repoCashCheck = async (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const shifts = await prisma.shift.findMany({
        where: {
            transaction: {
                some: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                    payment_type: "cash",
                },
            },
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
            transaction: {
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                    payment_type: "cash",
                },
            },
        },
    });

    const result = shifts.map(shift => {
        const totalPrice = shift.transaction.reduce((sum, unit) => {
            return sum + (unit.grand_total || 0);
        }, 0);

        const cash_balance_closing = shift.cash_balance_closing ?? 0;
        const cash_balance_opening = shift.cash_balance_opening ?? 0;
        const cash_balance_total = cash_balance_closing - cash_balance_opening;
        const cash_balance_check = cash_balance_total - totalPrice;

        return {
            shiftId: shift.id,
            user: shift.user.username,
            cash_balance_opening: cash_balance_opening,
            cash_balance_closing: cash_balance_closing,
            totalPrice: totalPrice,          
            cash_balance_check: cash_balance_check,
        };
    });

    return result;
};