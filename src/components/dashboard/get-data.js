"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const getDashboardData = async () => {
  const { user } = await auth();

  const calculateStreak = (userLevels) => {
    if (!userLevels.length) return 0;

    const dates = [
      ...new Set(
        userLevels
          .filter((ul) => ul.status === "COMPLETE")
          .map((ul) => ul.updated_at.toISOString().split("T")[0])
          .sort(),
      ),
    ];

    if (!dates.length) return 0;

    let currentStreak = 0;
    let maxStreak = 0;
    let prevDate = null;

    const today = new Date().toISOString().split("T")[0];

    for (const date of dates) {
      if (!prevDate) {
        currentStreak = 1;
      } else {
        const curr = new Date(date);
        const prev = new Date(prevDate);
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }

      maxStreak = Math.max(maxStreak, currentStreak);
      prevDate = date;
    }

    const lastDate = new Date(dates[dates.length - 1]);
    const diffToToday = Math.round(
      (new Date(today) - lastDate) / (1000 * 60 * 60 * 24),
    );

    if (diffToToday > 1) {
      currentStreak = 0;
    }

    return currentStreak;
  };

  const allWorlds = await prisma.world.findMany({
    include: {
      levels: true,
      prerequisites: true,
      requiredBy: true,
    },
  });

  const userWorlds = await prisma.user_World.findMany({
    where: {
      user_id: user.id,
    },
  });

  const userLevels = await prisma.user_Level.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      level: {
        include: {
          world: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  const totalWorlds = allWorlds.length;
  const unlockedWorlds = userWorlds.filter((w) => w.unlocked).length;
  const totalLevels = allWorlds.reduce(
    (sum, world) => sum + world.levels.length,
    0,
  );
  const completedLevels = userLevels.filter(
    (ul) => ul.status === "COMPLETE",
  ).length;

  const worldProgress = allWorlds
    .filter(
      (globalWorld) =>
        userWorlds.find((uw) => uw.world_id === globalWorld.id).unlocked,
    )
    .map((world) => {
      const worldLevelsCount = world.levels.length;
      const completedInWorld = userLevels.filter(
        (ul) => ul.level.world_id === world.id && ul.status === "COMPLETE",
      ).length;

      return {
        worldId: world.id,
        worldName: world.name,
        completed: completedInWorld,
        total: worldLevelsCount,
      };
    });

  const recentActivity = userLevels
    .filter((ul) => ul.status === "COMPLETE" || ul.unlocked)
    .slice(0, 10)
    .map((ul) => ({
      id: ul.level_id,
      type: ul.status === "COMPLETE" ? "COMPLETE" : "UNLOCK",
      levelName: ul.level.title,
      levelId: ul.level.name,
      worldId: ul.level.world_id,
      worldName: ul.level.world.name,
      date: ul.updated_at.toISOString().split("T")[0],
    }));

  const dailyActivity = {};
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const activityByDate = userLevels.reduce((acc, ul) => {
    const date = ul.updated_at.toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  let currentDate = new Date(startDate);
  while (currentDate <= new Date()) {
    const dateStr = currentDate.toISOString().split("T")[0];
    dailyActivity[dateStr] = activityByDate[dateStr] || 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const remaining = totalWorlds - unlockedWorlds;
  const streak = calculateStreak(userLevels);

  return {
    user,
    totalWorlds,
    unlockedWorlds,
    totalLevels,
    completedLevels,
    worldProgress,
    recentActivity,
    dailyActivity,
    streak,
    remaining,
  };
};
