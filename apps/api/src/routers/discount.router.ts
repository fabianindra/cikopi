import { addDiscount, getDiscount } from '@/controllers/discount.controller';
import { Router } from 'express';

const discountRouter = Router();

discountRouter.post('/add-discount', addDiscount);
discountRouter.get('/get-discount', getDiscount);

export default discountRouter;
