import { checkIn, checkOut, getShiftReport } from '@/controllers/shift.controller';
import { Router, Request, Response } from 'express';

const shiftRouter = Router();

shiftRouter.post('/checkin', checkIn);
shiftRouter.post('/checkout', checkOut);
shiftRouter.get('/get-report', getShiftReport);

export default shiftRouter;