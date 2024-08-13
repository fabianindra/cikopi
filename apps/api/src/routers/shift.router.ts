import { checkIn, checkOut } from '@/controllers/shift.controller';
import { Router, Request, Response } from 'express';

const shiftRouter = Router();

shiftRouter.post('/checkin', checkIn);
shiftRouter.post('/checkout', checkOut);

export default shiftRouter;