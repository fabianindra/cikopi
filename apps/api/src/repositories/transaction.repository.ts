import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoSubTotal = async ({
  products,
  transactionData,
}: {
  products: {
    product_id: number;
    quantity: number;
  }[];
  transactionData: {
    sub_total: number;
    tax: number;
    services: number;
    grand_total: number;
    payment_type: string;
    change: number;
    shift_id: number;
    discount_id?: number;
  };
}) => {
  const transactionUnits = await Promise.all(
    products.map(async ({ product_id, quantity }) => {
      const product = await prisma.product.findUnique({
        where: { id: product_id },
        select: { price: true },
      });

      if (!product) {
        throw new Error(`Product with ID ${product_id} not found`);
      }

      const price = product.price;
      const final_price = price * quantity;

      return {
        price: price,
        quantity: quantity.toString(),
        final_price: final_price,
        product: {
          connect: { id: product_id },
        },
      };
    })
  );

  await prisma.transaction.create({
    data: {
      sub_total: transactionData.sub_total,
      tax: transactionData.tax,
      services: transactionData.services,
      grand_total: transactionData.grand_total,
      payment_type: transactionData.payment_type,
      change: transactionData.change,
      transaction_date: new Date(),
      shift: {
        connect: { id: transactionData.shift_id },
      },
      discount: transactionData.discount_id
        ? {
            connect: { id: transactionData.discount_id },
          }
        : undefined,
      transaction_unit: {
        create: transactionUnits,
      },
    },
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
  
  export const repoGetTransactionDetails = async (transactionId: number) => {
    return await prisma.transactionUnit.findMany({
      where: {
        transaction_id: transactionId
      },
    });
  };