import propTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const WorldProgressCard = ({ className, progress, total }) => {
  const toUnlock = total - progress.length;
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>
          <h2>World Progress</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress.map((world) => {
          const { worldId, worldName, completed, total } = world;
          return (
            <Link
              href={`/quest?world=${worldId}`}
              key={worldId}
              className="block space-y-2 hover:underline"
            >
              <section className="flex justify-between items-center">
                <h3 className="flex gap-2 items-center">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{worldName}</span>
                </h3>
                <span className="text-sm text-muted-foreground">
                  {completed}/{total} levels
                </span>
              </section>
              <Progress value={(completed / total) * 100} />
            </Link>
          );
        })}
        {toUnlock > 0 && (
          <p className="flex gap-x-1 items-center text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            {toUnlock} worlds not unlocked
          </p>
        )}
      </CardContent>
    </Card>
  );
};

WorldProgressCard.propTypes = {
  className: propTypes.string,
  progress: propTypes.arrayOf(
    propTypes.shape({
      worldId: propTypes.number.isRequired,
      completed: propTypes.number.isRequired,
      total: propTypes.number.isRequired,
    }),
  ).isRequired,
  total: propTypes.number.isRequired,
};
