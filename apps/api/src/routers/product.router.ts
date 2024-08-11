import { addProduct, getAllProducts, getProductsByCategory, searchProductsByName } from '@/controllers/product.controller';
import { Router, Request, Response } from 'express';

const productRouter = Router();

productRouter.get('/get-all-products', getAllProducts);
productRouter.get('/get-product-by-category/:category', getProductsByCategory);
productRouter.get('/search-product', searchProductsByName);
productRouter.post('/add-product', addProduct);

export default productRouter;