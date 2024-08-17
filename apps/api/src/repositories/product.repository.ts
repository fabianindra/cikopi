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
  const whereClause: any = {
    isDeleted: false,
  };
  
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
    include: {
      consignment: true,
    },
  });

  const productsWithFees = products.map((product) => {
    const consignmentFee = product.consignment?.consignment_fee || 0;
    const partner = product.consignment?.partner || 'N/A';

    return {
      ...product,
      consignment_fee: consignmentFee,
      partner,
    };
  });

  return {
    count,
    result: productsWithFees,
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


export const repoEditProduct = async (
  productId: number,
  {
    product_name,
    price,
    stock,
    category,
    image,
    userId,
    partner,
    consignment_fee,
  }: {
    product_name?: string | null;
    price?: number | null;
    stock?: number | null;
    category?: string | null;
    image?: string | null;
    userId?: number | null;
    partner?: string | null;
    consignment_fee?: number | null;
  }
) => {
  return await prisma.$transaction(async (tx) => {
    const existingProduct = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      console.error(`Product with ID ${productId} not found.`);
      throw new Error(`Product with ID ${productId} not found.`);
    }

    let consignmentId: number | null = null;

    if (partner && consignment_fee !== undefined && consignment_fee !== null) {
      const consignment = await tx.consignment.create({
        data: {
          partner,
          consignment_fee,
        },
      });
      consignmentId = consignment.id;
    }

    const updateData: Record<string, any> = {};

    if (product_name !== undefined) updateData.product_name = product_name;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;
    if (image !== undefined && image !== '') updateData.image = image;
    if (userId !== undefined) updateData.user = { connect: { id: userId } };
    if (consignmentId !== null) updateData.consignment = { connect: { id: consignmentId } };

    console.log('Prepared Update Data:', updateData);

    if (Object.keys(updateData).length === 0) {
      console.warn('No fields to update.');
      throw new Error('No fields to update. Please provide at least one field to update.');
    }

    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: updateData,
    });

    console.log('Updated Product:', updatedProduct);
    return updatedProduct;
  });
};

export const repoDeleteProduct = async ({
  productId
}: {
  productId: string;
}) => {
  await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      isDeleted: true
    },
  });
};




