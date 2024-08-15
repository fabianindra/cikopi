import { repoAddProduct, repoGetProducts } from "@/repositories/product.repository";
import { AddProductRequest, ServiceGetProductsRequest } from "@/types";

export const serviceGetProducts = async (req: ServiceGetProductsRequest) => {
  const { category } = req.params || {};
  const { search, page, pageSize, sortBy, sortDirection } = req.query || {};

  try {
    const data = await repoGetProducts({
      category,
      search,
      page,
      pageSize,
      sortBy,
      sortDirection,
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

  // Basic validation
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
      price: Number(price), // Ensure it's a number
      stock: Number(stock),  // Ensure it's a number
      category,
      image,
      userId: Number(userId), // Ensure it's a number
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
