import { PrismaClient } from '@prisma/client';
import { GetCashiersParams } from '@/types';

const prisma = new PrismaClient();

const buildCashierWhereClause = ({
  search,
}: {
  search?: string;
}) => {
  const whereClause: any = {
    role: 'cashier', 
    isDeleted: false,
  };
  
  if (search) {
    whereClause.username = {
      contains: search,
    };
  }
  
  return whereClause;
}; 

export const repoGetCashier = async ({
  search,
  page = '1',
  pageSize = '4',
  sortBy = 'createdAt',
  sortDirection = 'desc',
}: GetCashiersParams) => {
  const pageN = parseInt(page) - 1;
  const sizeN = parseInt(pageSize);
  const whereClause = buildCashierWhereClause({ search });

  const count = await prisma.user.count({ where: whereClause });
  const cashiers = await prisma.user.findMany({
    where: whereClause,
    skip: pageN * sizeN,
    take: sizeN,
    orderBy: {
      [sortBy]: sortDirection,
    },
  });

  return {
    count,
    result: cashiers,
  };
};


export const repoAddCashier = async ({
    username, password
  }: {
    username: string,
    password: string
  }) => {
      await prisma.user.create({
        data: {
          username: username,
          password: password,
          role: "cashier",
    }});
  };


  export const repoEditCashier = async ({
    userId,
    username,
    password,
  }: {
    userId: string;
    username: string;
    password: string;
  }) => {
  
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        username: username,
        password: password,
      },
    });
  };
  
  export const repoDeleteCashier = async ({
    userId
  }: {
    userId: string;
  }) => {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        isDeleted: true
      },
    });
  };
  