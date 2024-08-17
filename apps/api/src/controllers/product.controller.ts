import { serviceAddProduct, serviceDeleteProduct, serviceEditProduct, serviceGetProducts } from '@/services/product.service';
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await serviceGetProducts({
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

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const imageFilename = req.file?.filename;
    const { product_name, price, stock, category, userId, partner, consignment_fee } = req.body;

    console.log(`Request received: ${product_name}`);

    const result = await serviceEditProduct(Number(productId), {
      product_name,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      category,
      image: imageFilename || undefined,
      userId: userId !== undefined ? Number(userId) : undefined,
      partner: partner || undefined,
      consignment_fee: consignment_fee !== undefined ? Number(consignment_fee) : undefined,
    });

    return res.status(result.status).send(result);
  } catch (error: any) {
    console.error('Error editing product:', error.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to edit product',
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;

    const result = await serviceDeleteProduct({ productId });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Product deleted successfully',
      result,
    });
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
