import { addProduct, getProducts } from '@/controllers/product.controller';
import { Router, Request, Response } from 'express';

const productRouter = Router();

productRouter.get('/get-products', getProducts);
productRouter.post('/add-product', addProduct);

export default productRouter;