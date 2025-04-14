import propTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const RecentActivityCard = ({ className, activities }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>
          <h2>Recent Activity</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="flex flex-col justify-center items-center py-4 text-sm text-muted-foreground">
              No recent activity to display.
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center pb-2 border-b last:border-0"
              >
                <div className="flex gap-4 items-center">
                  {activity.type === "COMPLETE" ? (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Star className="w-4 h-4 text-blue-500" />
                  )}
                  <div className="flex flex-col">
                    <Link
                      href={`/quest/?world=${activity.worldId}&level=${activity.levelId}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {activity.levelName}
                    </Link>
                    <Link
                      href={`/quest/?world=${activity.worldId}`}
                      className="text-xs hover:underline text-muted-foreground"
                    >
                      {activity.worldName}
                    </Link>
                  </div>
                </div>
                <Link
                  href={`/quest/?world=${activity.worldId}&level=${activity.levelId}`}
                  className="flex gap-2 items-center hover:underline"
                >
                  <p className="text-xs text-muted-foreground">
                    {activity.date}
                  </p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

RecentActivityCard.propTypes = {
  activities: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      type: propTypes.oneOf(["COMPLETE", "SOLVE"]).isRequired,
      levelName: propTypes.string.isRequired,
      worldName: propTypes.string.isRequired,
      date: propTypes.string.isRequired,
    }),
  ).isRequired,
  className: propTypes.string,
};
