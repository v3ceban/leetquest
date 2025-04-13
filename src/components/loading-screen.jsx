"use client";

import propTypes from "prop-types";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const LoadingScreen = ({ children }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        return Math.min(90, prev + increment);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <section className="grid place-items-center w-full h-full duration-300 animate-in fade-in slide-in-from-bottom-4 min-h-[calc(100dvh-104px-20px)]">
      <div className="flex flex-col justify-center items-center px-4 space-y-6 w-full max-w-md">
        <div className="flex gap-3 items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
          {children}
        </div>
        <div className="space-y-2 w-full">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {progress < 90 ? "Loading data..." : "Almost there..."}
          </p>
        </div>
      </div>
    </section>
  );
};

LoadingScreen.propTypes = {
  children: propTypes.node,
};
