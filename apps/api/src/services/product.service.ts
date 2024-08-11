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
    consignment_fee
  } = request;

  try {
    const data = await repoAddProduct({
      product_name,
      price,
      stock,
      category,
      image,
      userId,
      partner,
      consignment_fee,
    });

    return {
      status: 201,
      success: true,
      message: 'Add product success',
      data,
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: `Failed to add product: ${error.message}`,
    };
  }
};
