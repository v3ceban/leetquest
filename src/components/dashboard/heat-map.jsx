import propTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const ActivityHeatmap = ({ className, dailyActivity }) => {
  const getIntensityClass = (count) => {
    if (count === 0) return "bg-zinc-950 dark:bg-zinc-900";
    if (count <= 2) return "bg-teal-950 dark:bg-teal-900/20";
    if (count <= 4) return "bg-teal-800 dark:bg-teal-700/40";
    if (count <= 6) return "bg-teal-600 dark:bg-teal-500/60";
    return "bg-teal-400 dark:bg-teal-400";
  };

  const getMonthLabels = () => {
    const labels = [];
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setFullYear(today.getFullYear() - 1);

    // Generate 12 month labels starting from last year same month
    for (let i = 0; i < 12; i++) {
      labels.push(currentDate.toLocaleString("en-US", { month: "short" }));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return labels;
  };

  const months = getMonthLabels();
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

  // Pad the remaining week with future dates
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      const dateStr = currentDate.toISOString().split("T")[0];
      currentWeek.push({
        date: dateStr,
        count: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);
  }

  return (
    <Card className={cn(className, "grid col-span-full gap-4")}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-2xl font-semibold">
          <h2>Activity</h2>
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="bg-background">
              <p>Shows your daily coding activity</p>
              <p>Darker color = more problems solved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <section className="inline-flex flex-col gap-2 min-w-full">
          <div className="flex min-w-full text-xs text-muted-foreground">
            <div className="flex-shrink-0 w-8" />
            <div className="grid flex-1 grid-cols-12">
              {months.map((month, i) => (
                <div key={i} className="text-center">
                  {month}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 min-w-full">
            <div className="flex flex-col flex-shrink-0 justify-between w-8 text-xs/none text-muted-foreground">
              {days.map((day, i) => (
                <div key={i} className="h-[10px]">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-[repeat(53,1fr)] gap-[2px]">
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
        </section>
      </CardContent>
    </Card>
  );
};

ActivityHeatmap.propTypes = {
  className: propTypes.string,
  dailyActivity: propTypes.objectOf(propTypes.number).isRequired,
};
