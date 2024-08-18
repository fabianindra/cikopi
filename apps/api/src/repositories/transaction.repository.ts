import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoSubTotal = async ({
  products,
  shift_id,
  payment_type,
  payment,
}: {
  products: {
    product_id: number;
    quantity: number;
  }[];
  shift_id: number;
  payment_type: string;
  payment: number;
}) => {
  const currentTime = new Date();

  await prisma.$transaction(async (prisma) => {
    let sub_total = 0;

    const transactionUnits = await Promise.all(
      products.map(async ({ product_id, quantity }) => {
        const product = await prisma.product.findUnique({
          where: { id: product_id },
          select: { price: true, stock: true, isDeleted: true },
        });

        if (!product) {
          throw new Error(`Product with ID ${product_id} not found`);
        }

        if (product.isDeleted) {
          throw new Error(`Product with ID ${product_id} is deleted and cannot be used in the transaction`);
        }

        if (product.stock < quantity) {
          throw new Error(`Insufficient stock for Product ID ${product_id}`);
        }

        await prisma.product.update({
          where: { id: product_id },
          data: { stock: product.stock - quantity },
        });

        const final_price = product.price * quantity;
        sub_total += final_price;

        return {
          price: product.price,
          quantity: quantity.toString(),
          final_price: final_price,
          product: {
            connect: { id: product_id },
          },
        };
      })
    );

    const discount = await prisma.discount.findFirst({
      where: {
        start_date: { lte: currentTime },
        end_date: { gte: currentTime },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: { id: true, discount_amount: true },
    });

    let discountAmount = 0;
    let discount_id = null;
    if (discount) {
      discountAmount = Math.round((sub_total * discount.discount_amount) / 100);
      discount_id = discount.id;
    }

    const taxRate = 0.1;
    const serviceRate = 0.05;

    const tax = Math.round((sub_total-discountAmount) * taxRate);
    const services = Math.round((sub_total-discountAmount) * serviceRate);

    const grand_total = (sub_total - discountAmount) + tax + services;

    let change = 0;
    if (payment_type === 'cash') {
      change = payment - (grand_total-discountAmount);
      if (change < 0) {
        throw new Error('Payment is less than the grand total');
      }
    }

    await prisma.transaction.create({
      data: {
        sub_total: sub_total,
        tax: tax,
        services: services,
        grand_total: grand_total,
        payment_type: payment_type,
        change: change,
        transaction_date: new Date(),
        shift: {
          connect: { id: shift_id },
        },
        discount: discount_id
          ? {
              connect: { id: discount_id },
            }
          : undefined,
        transaction_unit: {
          create: transactionUnits,
        },
      },
    });
  });
};


export const repoGetTransactionByDate = async (date: Date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
    return await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  };

  export const repoGetTransactionByDateById = async (date: Date, userId: number) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
    return await prisma.transaction.findMany({
      where: {
        shift: {
          user_id: userId,
        },
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  };
  
  
  export const repoGetTransactionDetails = async (transactionId: number) => {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        transaction_unit: {
          include: {
            product: {
              select: {
                product_name: true,
              },
            },
          },
        },
      },
    });
    if (!transaction) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }
    let discountAmount = 0;
    if (transaction.discount_id) {
      const discount = await prisma.discount.findUnique({
        where: {
          id: transaction.discount_id,
        },
        select: {
          discount_amount: true,
        },
      });
      if (discount) {
        discountAmount = Math.round(transaction.sub_total * (discount.discount_amount / 100));
      }
    }
    return {
      ...transaction,
      discount_amount: discountAmount,
    };
  };
  
  

  export const repoGetTransactionAdmin = async (startDate: Date, endDate: Date, category?: string, sortBy: string = 'transaction_date', sortDirection: 'asc' | 'desc' = 'asc') => {
    return await prisma.transaction.findMany({
      where: {
        transaction_date: {
          gte: startDate,
          lte: endDate,
        },
        ...(category && {
          transaction_unit: {
            some: {
              product: {
                category,
              },
            },
          },
        }),
      },
      include: {
        transaction_unit: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortDirection,
      },
    });
  };
  
  