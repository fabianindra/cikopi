import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRouter from './routers/auth.router';
import productRouter from './routers/product.router';
import transactionRouter from './routers/transaction.router';
import shiftRouter from './routers/shift.router';

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET || 'defaultSecret';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/api/images',
  express.static(path.join(__dirname, '../public/images')),
);

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/shift', shiftRouter);

const PORT = process.env.PORT || 6570;

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'REST API running',
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port: ${PORT}`);
});
