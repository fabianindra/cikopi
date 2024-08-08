import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const repoFindUser = async (username: any) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  };

  export const repoAddUser = async (username: any, password: any) => {
    await prisma.user.create({ 
      data: {
        username: username,
        password: password,
        role: "cashier"
      },
    });
  };