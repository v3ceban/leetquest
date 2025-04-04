"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  Brain,
  Globe,
  Clock,
  ChevronRight,
  Star,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockUser, mockUserProgress } from "@/lib/mock-data";

function StatsCard({ title, value, description, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function WorldProgressCard({ progress }) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>World Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progress.map((world) => (
            <div key={world.worldId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    World {world.worldId}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {world.completed}/{world.total} levels
                </span>
              </div>
              <Progress value={(world.completed / world.total) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityHeatmap({ dailyActivity }) {
  const getIntensityClass = (count) => {
    if (count === 0) return "bg-zinc-950 dark:bg-zinc-900";
    if (count <= 2) return "bg-emerald-950 dark:bg-emerald-900/20";
    if (count <= 4) return "bg-emerald-800 dark:bg-emerald-700/40";
    if (count <= 6) return "bg-emerald-600 dark:bg-emerald-500/60";
    return "bg-emerald-400 dark:bg-emerald-400";
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["", "Mon", "", "Wed", "", "Fri", ""];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  const weeks = [];
  let currentWeek = [];
  let currentDate = new Date(startDate);

  while (currentDate <= today) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    const dateStr = currentDate.toISOString().split("T")[0];
    currentWeek.push({
      date: dateStr,
      count: dailyActivity[dateStr] || 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Activity</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="bg-background">
              <p>Shows your daily coding activity</p>
              <p>Darker color = more problems solved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-full inline-flex flex-col gap-2">
            <div className="flex text-xs text-muted-foreground min-w-full">
              <div className="w-8 flex-shrink-0" />{" "}
              {/* Spacer for days column */}
              <div className="flex-1 grid grid-cols-12">
                {months.map((month, i) => (
                  <div key={i} className="text-center">
                    {month}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 min-w-full">
              <div className="w-8 flex-shrink-0 flex flex-col justify-between py-2 text-xs text-muted-foreground">
                {days.map((day, i) => (
                  <div key={i} className="h-[10px]">
                    {day}
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-[repeat(53,1fr)] gap-[2px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
                    {week.map((day, dayIndex) => (
                      <TooltipProvider key={dayIndex}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div
                              className={`h-[10px] w-[10px] rounded-sm ${getIntensityClass(day.count)}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-background">
                            <p>
                              {day.count} problems on {day.date}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivityCard({ activities }) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div className="flex items-center gap-4">
                {activity.type === "COMPLETE" ? (
                  <Trophy className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Star className="h-4 w-4 text-blue-500" />
                )}
                <div>
                  <p className="text-sm font-medium">{activity.levelName}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.worldName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {activity.date}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const {
    completedLevels,
    totalLevels,
    unlockedWorlds,
    totalWorlds,
    recentActivity,
    worldProgress,
  } = mockUserProgress;

  return (
    <main className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {mockUser.name}! Here's your progress overview.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={mockUser.picture}
            alt={mockUser.name}
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Completed Levels"
          value={completedLevels}
          description={`${Math.round((completedLevels / totalLevels) * 100)}% of total levels`}
          icon={Trophy}
        />
        <StatsCard
          title="Total Levels"
          value={totalLevels}
          description="Available challenges"
          icon={Target}
        />
        <StatsCard
          title="Unlocked Worlds"
          value={unlockedWorlds}
          description={`${totalWorlds - unlockedWorlds} worlds remaining`}
          icon={Brain}
        />
        <StatsCard
          title="Active Streak"
          value="5 days"
          description="Keep going!"
          icon={Clock}
        />
      </div>

      <div className="grid gap-4 mb-8">
        <ActivityHeatmap dailyActivity={mockUserProgress.dailyActivity} />
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <WorldProgressCard progress={worldProgress} />
        <RecentActivityCard activities={recentActivity} />
      </div>
    </main>
  );
}
