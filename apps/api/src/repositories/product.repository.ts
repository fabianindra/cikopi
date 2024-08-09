import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GetProductParams {
  category: string;
  search?: string;
  page?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface SearchProductsParams {
  product_name: string;
  page?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

const buildProductWhereClause = ({
  category,
  search,
}: {
  category: string;
  search?: string;
}) => {
  const whereClause: any = {
    category: category,
  };
  if (search) {
    whereClause.product_name = {
      contains: search,
    };
  }
  return whereClause;
};

const countProducts = async (whereClause: any) => {
  return await prisma.product.count({
    where: whereClause,
  });
};

const findProducts = async (
  whereClause: any,
  page: number,
  pageSize: number,
  sortBy: string = 'createdAt',
  sortDirection: 'asc' | 'desc' = 'desc'
) => {
  return await prisma.product.findMany({
    where: whereClause,
    skip: page,
    take: pageSize,
    orderBy: {
      [sortBy]: sortDirection,
    },
  });
};

//Get Product
export const repoGetProductsByCategory = async ({
  category,
  search,
  page,
  sortBy = 'createdAt',
  sortDirection = 'desc',
}: GetProductParams) => {
  const pageN = page ? (parseInt(page) - 1) * 4 : 0;
  const whereClause = buildProductWhereClause({ category, search });

  const count = await countProducts(whereClause);
  const allProducts = await findProducts(whereClause, pageN, 4, sortBy, sortDirection);

  return {
    count,
    result: allProducts,
  };
};

//search by name
export const repoSearchProductsByName = async ({
  product_name,
  page,
  sortBy,
  sortDirection,
}: SearchProductsParams) => {
  const pageN = page ? (parseInt(page) - 1) * 4 : 0;
  
  const whereClause = {
    product_name: {
      contains: product_name,
    },
  };

  const count = await prisma.product.count({
    where: whereClause,
  });

  const products = await prisma.product.findMany({
    where: whereClause,
    skip: pageN,
    take: 4,
    orderBy: {
      [sortBy || 'createdAt']: sortDirection || 'desc',
    },
  });

  return {
    count,
    result: products,
  };
};

//Add Product
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
        product_name: product_name,
        price: price,
        stock: stock,
        category: category,
        image: image,
        user: { connect: { id: userId } },
        ...(consignmentId ? { consignment: { connect: { id: consignmentId } } } : {}),
      },
    });
  });
};
