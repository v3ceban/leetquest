const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "user",
      },
    ],
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
