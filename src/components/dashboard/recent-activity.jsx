import propTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const RecentActivityCard = ({ className, activities }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
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
                <div>
                  <p className="text-sm font-medium">{activity.levelName}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.worldName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground">
                  {activity.date}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
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
