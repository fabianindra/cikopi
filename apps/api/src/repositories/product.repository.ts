import { PrismaClient } from '@prisma/client';
import { GetProductsParams } from '@/types';

const prisma = new PrismaClient();

const buildProductWhereClause = ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const whereClause: any = {};
  if (category) {
    whereClause.category = category;
  }
  if (search) {
    whereClause.product_name = {
      contains: search,
    };
  }
  return whereClause;
};

export const repoGetProducts = async ({
  category,
  search,
  page = '1',
  pageSize = '4',
  sortBy = 'createdAt',
  sortDirection = 'desc',
}: GetProductsParams) => {
  const pageN = parseInt(page) - 1;
  const sizeN = parseInt(pageSize);
  const whereClause = buildProductWhereClause({ category, search });

  const count = await prisma.product.count({ where: whereClause });
  const products = await prisma.product.findMany({
    where: whereClause,
    skip: pageN * sizeN,
    take: sizeN,
    orderBy: {
      [sortBy]: sortDirection,
    },
  });

  return {
    count,
    result: products,
  };
};

export const repoAddProduct = async ({
  product_name,
  price,
  stock,
  category,
  image,
  userId,
  partner,
  consignment_fee,
}: {
  product_name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  userId: number;
  partner?: string;
  consignment_fee?: number;
}) => {
  await prisma.$transaction(async (tx) => {
    let consignmentId: number | null = null;

    if (partner && consignment_fee !== undefined) {
      const consignment = await tx.consignment.create({
        data: {
          partner: partner,
          consignment_fee: consignment_fee,
        },
      });
      consignmentId = consignment.id;
    }

    await tx.product.create({
      data: {
        product_name,
        price,
        stock,
        category,
        image,
        user: { connect: { id: userId } },
        ...(consignmentId ? { consignment: { connect: { id: consignmentId } } } : {}),
      },
    });
  });
};
