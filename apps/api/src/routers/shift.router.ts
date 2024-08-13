import { checkIn } from '@/controllers/shift.controller';
import { Router, Request, Response } from 'express';

const shiftRouter = Router();

shiftRouter.post('/checkin', checkIn);

export default shiftRouter;