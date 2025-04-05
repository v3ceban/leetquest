import { Trophy, Target, Brain, Clock } from "lucide-react";
import { mockUser, mockUserProgress } from "@/lib/mock-data";
import { StatsCard } from "@/components/dashboard/stats";
import { WorldProgressCard } from "@/components/dashboard/world-progress";
import { RecentActivityCard } from "@/components/dashboard/recent-activity";
import { ActivityHeatmap } from "@/components/dashboard/heat-map";

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
    <main className="container py-8 mx-auto space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {`Welcome back, ${mockUser.name}! Here's your progress overview.`}
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </section>
      <ActivityHeatmap dailyActivity={mockUserProgress.dailyActivity} />
      <div className="grid gap-4 md:grid-cols-7">
        <WorldProgressCard className="md:col-span-4" progress={worldProgress} />
        <RecentActivityCard
          className="md:col-span-3"
          activities={recentActivity}
        />
      </div>
    </main>
  );
}
