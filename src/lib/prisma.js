import { PrismaClient } from "@prisma/client";

const singlePrismaInstance = () => {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }

  return globalThis.prismaGlobal;
};

export const prisma = singlePrismaInstance();
