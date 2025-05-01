import { PrismaClient } from "@prisma/client";

/**
 * Returns a singleton instance of PrismaClient.
 * @returns {import('@prisma/client').PrismaClient}
 */
const singlePrismaInstance = () => {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }

  return globalThis.prismaGlobal;
};

export const prisma = singlePrismaInstance();
