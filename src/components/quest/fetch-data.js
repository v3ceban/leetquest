"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function isWorldUnlockedForUser(world, user) {
  if (!world.prerequisites || world.prerequisites.length === 0) {
    return true;
  }
  const prereqWorldIds = world.prerequisites.map((w) => w.id);
  const prereqWorlds = await prisma.world.findMany({
    where: { id: { in: prereqWorldIds } },
    include: {
      levels: {
        where: { type: { not: "BONUS" } },
        select: { id: true },
      },
    },
  });
  for (const prereqWorld of prereqWorlds) {
    if (prereqWorld.levels.length === 0) {
      return false;
    }
    const completedCount = await prisma.user_Level.count({
      where: {
        user_id: user.id,
        level_id: { in: prereqWorld.levels.map((l) => l.id) },
        status: "COMPLETE",
      },
    });
    if (completedCount < prereqWorld.levels.length) {
      return false;
    }
  }
  return true;
}

export async function fetchWorldsData() {
  const session = await auth();

  const user = session?.user;

  if (!user) {
    const worldsData = await prisma.world.findMany({
      select: {
        id: true,
        name: true,
        x_position: true,
        y_position: true,
        requiredBy: true,
        flip_arrow: true,
        levels: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            color: true,
            name: true,
            x_position: true,
            y_position: true,
            requiredBy: true,
            flip_arrow: true,
            leetcode_url: true,
          },
        },
      },
    });

    return worldsData.map((world) => ({
      ...world,
      levels: world.levels.map((level) => ({
        ...level,
        user_levels: [],
        unlocked: false,
        status: "INCOMPLETE",
      })),
      user_world: [],
      totalLevels: world.levels.length,
      levelsCompleted: 0,
      isWorldUnlocked: false,
    }));
  }

  const worldsData = await prisma.world.findMany({
    select: {
      id: true,
      name: true,
      x_position: true,
      y_position: true,
      requiredBy: true,
      prerequisites: true,
      flip_arrow: true,
      levels: {
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          color: true,
          name: true,
          x_position: true,
          y_position: true,
          requiredBy: true,
          prerequisites: true,
          flip_arrow: true,
          leetcode_url: true,
          world_id: true,
          user_levels: {
            where: {
              user_id: user.id,
            },
            select: {
              level_id: true,
              user_id: true,
              status: true,
              unlocked: true,
            },
          },
        },
      },
      user_world: {
        where: {
          user_id: user.id,
        },
        select: {
          world_id: true,
          unlocked: true,
          user: {
            select: {
              levels: {
                where: {
                  status: "COMPLETE",
                },
                select: {
                  level: {
                    select: {
                      world_id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const existingWorldIds = new Set();
  const existingUserWorldIds = new Set();
  const existingLevelIds = new Set();
  const existingUserLevelIds = new Set();
  worldsData.map((world) => {
    existingWorldIds.add(world.id);
    world.user_world.map((uw) => {
      existingUserWorldIds.add(uw.world_id);
    });
    world.levels.map((level) => {
      existingLevelIds.add(level.id);
      level.user_levels.map((ul) => {
        existingUserLevelIds.add(ul.level_id);
      });
    });
  });

  if (existingWorldIds.size !== existingUserWorldIds.size) {
    const missingIds = [...existingWorldIds].filter(
      (id) => !existingUserWorldIds.has(id),
    );
    for (const id of missingIds) {
      const world = worldsData.find((w) => w.id === id);
      const unlocked = await isWorldUnlockedForUser(world, user);
      const missingUserWorlds = await prisma.user_World.create({
        data: {
          user_id: user.id,
          world_id: id,
          unlocked,
        },
        select: {
          world_id: true,
          unlocked: true,
          user: {
            select: {
              levels: {
                where: {
                  status: "COMPLETE",
                },
                select: {
                  level: {
                    select: {
                      world_id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      worldsData.map((world) => {
        if (world.id === missingUserWorlds.world_id) {
          world.user_world.push(missingUserWorlds);
        }
      });
    }
  }

  if (existingLevelIds.size !== existingUserLevelIds.size) {
    const missingIds = [...existingLevelIds].filter(
      (id) => !existingUserLevelIds.has(id),
    );
    const missingUserLevels = await prisma.user_Level.createManyAndReturn({
      data: missingIds.map((id) => {
        const world = worldsData.find((w) =>
          w.levels.some((level) => level.id === id),
        );
        const level = world.levels.find((level) => level.id === id);
        return {
          user_id: user.id,
          level_id: id,
          unlocked: level.prerequisites.length === 0,
        };
      }),
      select: {
        level_id: true,
        user_id: true,
        status: true,
        unlocked: true,
      },
    });
    worldsData.map((world) => {
      world.levels.map((level) => {
        if (missingUserLevels.some((ul) => ul.level_id === level.id)) {
          level.user_levels.push(
            missingUserLevels.find((ul) => ul.level_id === level.id),
          );
        }
      });
    });
  }

  return worldsData.map((world) => ({
    ...world,
    totalLevels: world.levels.length,
    levelsCompleted: world.user_world[0]?.user?.levels.filter(
      (level) => level.level.world_id === world.id,
    ).length,
    isWorldUnlocked: world.user_world[0]?.unlocked ?? false,
  }));
}

export async function fetchSelectedWorldData(
  worldsData,
  selectedWorld,
  selectedWorldId,
) {
  const worldId = selectedWorldId
    ? selectedWorldId
    : worldsData.find(({ name }) => name === selectedWorld).id;
  const { user } = await auth();

  const selectedWorldData = await prisma.level.findMany({
    where: {
      world_id: worldId,
    },
    select: {
      id: true,
      prerequisites: true,
    },
  });

  const results = await prisma.user_Level.findMany({
    where: {
      user_id: user.id,
      level_id: {
        in: selectedWorldData.map((level) => level.id),
      },
    },
    select: {
      user_id: true,
      status: true,
      unlocked: true,
      level: {
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          color: true,
          name: true,
          x_position: true,
          y_position: true,
          requiredBy: true,
          prerequisites: true,
          flip_arrow: true,
          leetcode_url: true,
          world_id: true,
        },
      },
    },
  });

  return results.map((level) => ({
    ...level.level,
    user_id: level.user_id,
    status: level.status,
    unlocked: level.unlocked,
    isWorldUnlocked: true,
  }));
}

export const setLevelComplete = async (levelData) => {
  const { user } = await auth();

  const { id, requiredBy, world_id } = levelData;
  const requiredByIds = requiredBy.map((level) => level.id);

  await Promise.all([
    prisma.user_Level.update({
      where: {
        user_id_level_id: {
          user_id: user.id,
          level_id: id,
        },
      },
      data: {
        status: "COMPLETE",
      },
    }),
    requiredByIds.length > 0 &&
      prisma.user_Level.updateMany({
        where: {
          user_id: user.id,
          level_id: {
            in: requiredByIds,
          },
        },
        data: {
          unlocked: true,
        },
      }),
  ]);

  const worldLevels = await prisma.level.findMany({
    where: {
      world_id: world_id,
      type: {
        not: "BONUS",
      },
      // requiredBy: {
      //   some: {}, // This ensures we only get levels that have requiredBy relationships
      // },
    },
    include: {
      user_levels: {
        where: {
          user_id: user.id,
        },
      },
    },
  });

  const allRequiredLevelsComplete = worldLevels.every((level) =>
    level.user_levels.some((ul) => ul.status === "COMPLETE"),
  );

  if (allRequiredLevelsComplete) {
    const [worldsToUnlock] = await Promise.all([
      prisma.world.findMany({
        where: {
          prerequisites: {
            some: {
              id: world_id,
            },
          },
        },
        include: {
          levels: {
            include: {
              prerequisites: true,
            },
          },
        },
      }),
      prisma.user_World.update({
        where: {
          user_id_world_id: {
            user_id: user.id,
            world_id: world_id,
          },
        },
        data: {
          unlocked: true,
        },
      }),
    ]);

    const levelIdsToUnlock = [];
    const worldIdsToUnlock = worldsToUnlock.map((world) => {
      world.levels.map(
        (level) =>
          level.prerequisites.length === 0 && levelIdsToUnlock.push(level.id),
      );
      return world.id;
    });

    await Promise.all([
      prisma.user_World.updateMany({
        where: {
          user_id: user.id,
          world_id: {
            in: worldIdsToUnlock,
          },
        },
        data: {
          unlocked: true,
        },
      }),
      prisma.user_Level.updateMany({
        where: {
          user_id: user.id,
          level_id: {
            in: levelIdsToUnlock,
          },
        },
        data: {
          unlocked: true,
        },
      }),
    ]);
  }

  const updatedWorldsData = await fetchWorldsData();
  const updatedLevelsData = await fetchSelectedWorldData(
    updatedWorldsData,
    undefined,
    world_id,
  );

  return {
    worldsData: updatedWorldsData,
    selectedWorldData: updatedLevelsData,
  };
};
