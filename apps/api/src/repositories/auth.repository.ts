import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoFindUser = async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  };

  export const repoFindUserById = async (userId: number) => {
    return await prisma.user.findUnique({
      where: { id: userId },
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