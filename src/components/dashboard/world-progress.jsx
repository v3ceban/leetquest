import propTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export const WorldProgressCard = ({ className, progress }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>World Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progress.map((world) => (
            <div key={world.worldId} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Globe className="w-4 h-4 text-muted-foreground" />
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
};

WorldProgressCard.propTypes = {
  progress: propTypes.arrayOf(
    propTypes.shape({
      worldId: propTypes.number.isRequired,
      completed: propTypes.number.isRequired,
      total: propTypes.number.isRequired,
    }),
  ).isRequired,
  className: propTypes.string,
};
