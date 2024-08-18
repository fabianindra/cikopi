import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoAddDiscount = async (startDate: Date, endDate: Date, value: number) => {
    await prisma.discount.create({ 
      data: {
        start_date: startDate,
        end_date: endDate,
        discount_amount: value
      },
    });
  };

  export const repoGetDiscount = async (date: Date) => {
    try {
      const discount = await prisma.discount.findFirst({ 
        where: {
          start_date: {
            lte: date,
          },
          end_date: {
            gte: date,
          }
        },
      });
      return discount;
    } catch (error) {
      console.error('Error retrieving discount:', error);
      throw error;
    }
  };