import { repoAddCashier, repoDeleteCashier, repoEditCashier, repoGetCashier } from '@/repositories/cashier.repository'; 
import { GetCashiersParams } from '@/types';
import bcrypt from 'bcrypt';

export const serviceGetCashiers = async (params: GetCashiersParams) => {
  try {
    const result = await repoGetCashier(params);
    return {
      status: 200,
      success: true,
      message: 'Cashiers retrieved successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error fetching cashiers:', error);
    return {
      status: 500,
      success: false,
      message: 'Failed to retrieve cashiers',
      error: (error as Error).message,
    };
  }
};

export const serviceAddCashier = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await repoAddCashier({
      username,
      password: hashedPassword,
    });
  };

  export const serviceEditCashier = async ({
    userId,
    username,
    password,
  }: {
    userId: string;
    username: string;
    password: string;
  }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await repoEditCashier({
      userId,
      username,
      password: hashedPassword,
    });
  };

  export const serviceDeleteCashier = async ({
    userId,
  }: {
    userId: string;
  }) => {
    await repoDeleteCashier({
      userId
    });
  };

