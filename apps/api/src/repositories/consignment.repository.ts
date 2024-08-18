import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoGetTransactionByProductByDate = async (date: Date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const products = await prisma.product.findMany({
        include: {
            TransactionUnit: {
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            },
            consignment: true,
        },
    });

    const result = products.map(product => {
        const totalQuantity = product.TransactionUnit.reduce((sum, unit) => {
            return sum + parseInt(unit.quantity, 10);
        }, 0);

        const totalFinalPrice = product.TransactionUnit.reduce((sum, unit) => {
            return sum + unit.final_price;
        }, 0);

        const totalTransactions = product.TransactionUnit.length;

        const consignmentFee = product.consignment ? 
            (product.consignment.consignment_fee / 100) * totalFinalPrice : 
            0;

        return {
            product_name: product.product_name,
            total_quantity: totalQuantity,
            total_transaction: totalTransactions,
            total_amount: totalFinalPrice,
            consignment_fee: consignmentFee,
            partner: product.consignment?.partner || 'N/A',
        };
    });

    return result;
};

