import { Router, Request, Response } from 'express';
import { userLogin } from '@/controllers/auth.controller';

const authRouter = Router();

authRouter.post('/user-login', userLogin);

export default authRouter;