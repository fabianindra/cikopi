import { serviceAddProduct, serviceGetProductsByCategory, serviceSearchProductsByName } from '@/services/product.service';
import { Request, Response } from 'express';

interface GetProductsByCategoryParams {
  category: string;
}

interface GetProductsByCategoryQuery {
  search?: string;
  page?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface SearchProductsQuery {
  product_name: string;
  page?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export const getProductsByCategory = async (
  req: Request<GetProductsByCategoryParams, any, any, GetProductsByCategoryQuery>, 
  res: Response
) => {
  try {
    const result = await serviceGetProductsByCategory(req);
    return res.status(result.status).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    });
  }
};

export const searchProductsByName = async (
  req: Request<any, any, any, SearchProductsQuery>, 
  res: Response
) => {
  try {
    const { product_name, page, sortBy, sortDirection } = req.query;

    const result = await serviceSearchProductsByName({
      product_name: product_name as string,
      page,
      sortBy,
      sortDirection,
    });

    return res.status(result.status).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Server error',
      error: (error as Error).message,
    });
  }
};


export const addProduct = async (req: Request, res: Response) => {
    try {
      const result = await serviceAddProduct(req.body);
      return res.status(result.status).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };