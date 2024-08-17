import { serviceAddProduct, serviceGetProducts } from '@/services/product.service';
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await serviceGetProducts({
      params: req.params,
      query: req.query,
    });
    return res.status(result.status).send(result);
  } catch (error) {
    console.error('Error fetching products:', error);
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
    const imageFilename = req.file?.filename || '';
    const { product_name, price, stock, category, userId, partner, consignment_fee } = req.body;

    const result = await serviceAddProduct({
      product_name,
      price: Number(price),
      stock: Number(stock),
      category,
      image: imageFilename,
      userId: Number(userId),
      partner: partner || undefined,
      consignment_fee: consignment_fee ? Number(consignment_fee) : undefined,
    });

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to add product',
      error: (error as Error).message,
    });
  }
};