"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchWorldsData() {
  // console.log("fetch-data.jsx:8 fetchWorldsData fetching worlds data...");
  // can optimize requiredBy so it's more memory efficient e.g. only fetching the id?
  const worldsData = await prisma.world.findMany({
    select: {
      id: true,
      name: true,
      x_position: true,
      y_position: true,
      requiredBy: true,
      flip_arrow: true,
    },
  });
  // console.log("fetch-data.jsx:10 fetchWorldsData", worldsData);
  return worldsData;
}

async function fetchSelectedWorldData(worldsData, selectedWorld) {
  // console.log("fetch-data.jsx:15 fetchSelectedWorldData fetching selected world data for", selectedWorld, "...");

  // if needed, can implement a more efficient way to find the world e.g. by querying the database again or using a map
  const worldId = worldsData.find(({ name }) => name === selectedWorld).id;

  const selectedWorldData = await prisma.level.findMany({
    where: {
      world_id: worldId,
    },
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
    },
  });
  // console.log("fetch-data.jsx:33 fetchSelectedWorldData", selectedWorldData);
  return selectedWorldData;
}

export { fetchWorldsData, fetchSelectedWorldData };

