import { addDiscount, getAllDiscounts, getDiscount } from '@/controllers/discount.controller';
import { Router } from 'express';

const discountRouter = Router();

discountRouter.post('/add-discount', addDiscount);
discountRouter.get('/get-discount', getDiscount);
discountRouter.get('/get-all-discount', getAllDiscounts);

export default discountRouter;
