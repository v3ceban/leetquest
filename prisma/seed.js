import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  console.clear();
  console.log("Seeding, please wait...");

  const users = await prisma.user.findMany({
    include: {
      levels: {
        include: {
          level: {
            include: {
              world: true,
            },
          },
        },
      },
    },
  });

  let totalNumToDo = 0;

  const userWorldLevelMap = new Map();

  users.forEach((user) => {
    const worldMap = new Map();

    const worldIdToWorld = new Map();
    user.levels.forEach((userLevel) => {
      const world = userLevel.level.world;
      worldIdToWorld.set(world.id, world);
    });

    const sortedWorlds = Array.from(worldIdToWorld.values()).sort(
      (a, b) => a.order - b.order,
    );

    sortedWorlds.forEach((world) => {
      const levelsInWorld = user.levels
        .filter((userLevel) => userLevel.level.world.id === world.id)
        .map((userLevel) => userLevel.level)
        .sort((a, b) => a.order - b.order);

      worldMap.set(world.id, levelsInWorld);
      totalNumToDo++;
    });

    userWorldLevelMap.set(user.id, worldMap);
  });

  let totalDone = 0;

  console.clear();
  console.log(
    "Progress: ",
    totalDone,
    "/",
    totalNumToDo,
    ` (${((totalDone / totalNumToDo) * 100).toFixed(2)}%)`,
  );

  for (const [userId, worldMap] of userWorldLevelMap.entries()) {
    for (const [worldId, levels] of worldMap.entries()) {
      if (worldId === "cma4h2xg10000fgvv8jccpvwl") {
        await prisma.user_World.update({
          where: {
            user_id_world_id: {
              user_id: userId,
              world_id: worldId,
            },
          },
          data: {
            unlocked: true,
          },
        });
        for (const level of levels) {
          await prisma.user_Level.update({
            where: {
              user_id_level_id: {
                user_id: userId,
                level_id: level.id,
              },
            },
            data: {
              unlocked: true,
              status: "COMPLETE",
              updated_at: new Date(
                Date.now() -
                  Math.floor(Math.random() * 30 + 1) * 24 * 60 * 60 * 1000,
              ),
            },
          });
        }
      } else if (worldId === "cm6rgticq0000u6nc07vlr5md") {
        await prisma.user_World.update({
          where: {
            user_id_world_id: {
              user_id: userId,
              world_id: worldId,
            },
          },
          data: {
            unlocked: true,
          },
        });
        for (const level of levels) {
          const LAST_LEVEL_ORDER = 27;
          const [ul, lastUl] = await Promise.all([
            prisma.user_Level.findFirst({
              where: {
                user_id: userId,
                level_id: level.id,
                level: {
                  order: {
                    lt: LAST_LEVEL_ORDER,
                  },
                },
              },
            }),
            prisma.user_Level.findFirst({
              where: {
                user_id: userId,
                level_id: level.id,
                level: {
                  order: LAST_LEVEL_ORDER,
                },
              },
            }),
            prisma.user_Level.updateMany({
              where: {
                user_id: userId,
                level_id: level.id,
              },
              data: {
                unlocked: false,
                status: "INCOMPLETE",
              },
            }),
          ]);
          if (lastUl) {
            await prisma.user_Level.update({
              where: {
                user_id_level_id: {
                  user_id: userId,
                  level_id: lastUl.level_id,
                },
              },
              data: {
                unlocked: true,
                status: "INCOMPLETE",
              },
            });
          }
          if (ul) {
            await prisma.user_Level.update({
              where: {
                user_id_level_id: {
                  user_id: userId,
                  level_id: ul.level_id,
                },
              },
              data: {
                unlocked: true,
                status: "COMPLETE",
                updated_at: new Date(
                  Date.now() -
                    Math.floor(Math.random() * 30 + 1) * 24 * 60 * 60 * 1000,
                ),
              },
            });
          }
        }
      } else {
        await prisma.user_World.update({
          where: {
            user_id_world_id: {
              user_id: userId,
              world_id: worldId,
            },
          },
          data: {
            unlocked: false,
          },
        });
        for (const level of levels) {
          await prisma.user_Level.update({
            where: {
              user_id_level_id: {
                user_id: userId,
                level_id: level.id,
              },
            },
            data: {
              unlocked: false,
              status: "INCOMPLETE",
            },
          });
        }
      }
      totalDone++;
      console.clear();
      console.log(
        "Progress: ",
        totalDone,
        "/",
        totalNumToDo,
        ` (${((totalDone / totalNumToDo) * 100).toFixed(2)}%)`,
      );
    }
  }
  console.clear();
  console.log("Done!");
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
