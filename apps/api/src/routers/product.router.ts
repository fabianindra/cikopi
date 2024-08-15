import { addProduct, getProducts } from '@/controllers/product.controller';
import { Router } from 'express';
import { upload } from '@/middleware/uploader';

const productRouter = Router();

productRouter.get('/get-products', getProducts);
productRouter.post('/add-product', upload.single('image'), addProduct);

export default productRouter;
