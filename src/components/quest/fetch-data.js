"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  return worldsData.map((world) => ({
    ...world,
    totalLevels: world.levels.length,
    levelsCompleted: world.user_world[0]?.user?.levels.filter(
      (level) => level.level.world_id === world.id,
    ).length,
    isWorldUnlocked: world.user_world[0].unlocked ?? false,
  }));
}

export async function fetchSelectedWorldData(
  worldsData,
  selectedWorld,
  selectedWorldId,
) {
  // if needed, can implement a more efficient way to find the world e.g. by querying the database again or using a map
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

  const levelIds = selectedWorldData.map((level) => level.id);

  const userLevelsCount = await prisma.user_Level.count({
    where: {
      user_id: user.id,
      level_id: {
        in: levelIds,
      },
    },
  });

  if (userLevelsCount === 0) {
    await prisma.user_Level.createMany({
      data: selectedWorldData.map((level) => ({
        user_id: user.id,
        level_id: level.id,
        status: "INCOMPLETE",
        unlocked: level.prerequisites.length === 0,
      })),
    });
  }

  const results = await prisma.user_Level.findMany({
    where: {
      user_id: user.id,
      level_id: {
        in: levelIds,
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

  // Mark the current level as complete
  await prisma.user_Level.update({
    where: {
      user_id_level_id: {
        user_id: user.id,
        level_id: id,
      },
    },
    data: {
      status: "COMPLETE",
    },
  });

  // Unlock levels that require this level
  const requiredByIds = requiredBy.map((level) => level.id);
  if (requiredByIds.length > 0) {
    await prisma.user_Level.updateMany({
      where: {
        user_id: user.id,
        level_id: {
          in: requiredByIds,
        },
      },
      data: {
        unlocked: true,
      },
    });
  }

  // Check if all required levels in the world are complete
  const worldLevels = await prisma.level.findMany({
    where: {
      world_id: world_id,
      type: {
        not: "BONUS",
      },
      /*
      requiredBy: {
        some: {}, // This ensures we only get levels that have requiredBy relationships
      },
      */
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
    // Mark the current world as complete
    await prisma.user_World.upsert({
      where: {
        user_id_world_id: {
          user_id: user.id,
          world_id: world_id,
        },
      },
      update: {
        unlocked: true,
      },
      create: {
        user_id: user.id,
        world_id: world_id,
        unlocked: true,
      },
    });

    // Find and unlock worlds that require this world
    const worldsToUnlock = await prisma.world.findMany({
      where: {
        prerequisites: {
          some: {
            id: world_id,
          },
        },
      },
    });

    for (const worldToUnlock of worldsToUnlock) {
      await prisma.user_World.upsert({
        where: {
          user_id_world_id: {
            user_id: user.id,
            world_id: worldToUnlock.id,
          },
        },
        update: {
          unlocked: true,
        },
        create: {
          user_id: user.id,
          world_id: worldToUnlock.id,
          unlocked: true,
        },
      });
    }
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
