import { addProduct, deleteProduct, editProduct, getProducts } from '@/controllers/product.controller';
import { Router } from 'express';
import { upload } from '@/middleware/uploader';

const productRouter = Router();

productRouter.get('/get-products', getProducts);
productRouter.post('/add-product', upload.single('image'), addProduct);
productRouter.post('/edit-product/:productId', upload.single('image'), editProduct);
productRouter.post('/delete-product', deleteProduct);

export default productRouter;
