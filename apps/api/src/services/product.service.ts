import { repoAddProduct, repoGetProductsByCategory, repoSearchProductsByName } from "@/repositories/product.repository";

interface AddProductRequest {
  product_name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  userId: number;
  partner?: string;
  consignment_fee?: number;
}

interface ServiceGetProductsRequest {
  params: {
    category: string;
  };
  query: {
    search?: string;
    page?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
  };
}

interface SearchProductsRequest {
  product_name: string;
  page?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}


export const serviceGetProductsByCategory = async (req: ServiceGetProductsRequest) => {
  const { category } = req.params;
  const { search, page, sortBy, sortDirection } = req.query;

  try {
    const data = await repoGetProductsByCategory({
      category,
      search,
      page,
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
      message: 'Server error',
      error: (error as Error).message,
    };
  }
};

export const serviceSearchProductsByName = async ({
  product_name,
  page,
  sortBy,
  sortDirection,
}: SearchProductsRequest) => {
  try {
    const data = await repoSearchProductsByName({
      product_name,
      page,
      sortBy,
      sortDirection,
    });

    return {
      status: 200,
      success: true,
      message: 'Search products success',
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
