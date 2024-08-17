import { repoAddProduct, repoDeleteProduct, repoEditProduct, repoGetProducts } from "@/repositories/product.repository";
import { AddProductRequest, EditProductRequest, ServiceGetProductsRequest } from "@/types";

export const serviceGetProducts = async (req: ServiceGetProductsRequest) => {
  const { search, page, pageSize, sortBy, sortDirection, category } = req.query || {};

  try {
    const data = await repoGetProducts({
      search,
      page,
      pageSize,
      sortBy,
      sortDirection,
      category
    });

    return {
      status: 200,
      success: true,
      message: 'Get products success',
      data: data.result,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};


export const serviceAddProduct = async (request: AddProductRequest) => {
  const {
    product_name,
    price,
    stock,
    category,
    image,
    userId,
    partner,
    consignment_fee,
  } = request;

  if (!product_name || !price || !stock || !category || !image || !userId) {
    return {
      status: 400,
      success: false,
      message: 'Missing required fields',
    };
  }

  try {
    const data = await repoAddProduct({
      product_name,
      price: Number(price),
      stock: Number(stock), 
      category,
      image,
      userId: Number(userId),
      partner: partner || undefined,
      consignment_fee: consignment_fee ? Number(consignment_fee) : undefined,
    });

    return {
      status: 201,
      success: true,
      message: 'Product added successfully',
      data,
    };
  } catch (error: any) {
    console.error('Error adding product:', error.message, error.stack);
    return {
      status: 500,
      success: false,
      message: `Failed to add product: ${error.message}`,
    };
  }
};

export const serviceEditProduct = async (productId: number, request: EditProductRequest) => {
  if (!productId) {
    return {
      status: 400,
      success: false,
      message: 'Product ID is required',
    };
  }

  const {
    product_name,
    price,
    stock,
    category,
    image,
    userId,
    partner,
    consignment_fee,
  } = request;

  try {
    const data = await repoEditProduct(productId, {
      product_name,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      category,
      image,
      userId: userId !== undefined ? Number(userId) : undefined,
      partner,
      consignment_fee: consignment_fee !== undefined ? Number(consignment_fee) : undefined,
    });

    return {
      status: 200,
      success: true,
      message: 'Product updated successfully',
      data,
    };
  } catch (error: any) {
    console.error('Error updating product:', error.message);
    return {
      status: 500,
      success: false,
      message: `Failed to update product: ${error.message}`,
    };
  }
};

export const serviceDeleteProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  await repoDeleteProduct({
    productId
  });
};



