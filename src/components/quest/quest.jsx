"use client";

import React from "react";
import { World } from "@/components/quest/world";
import { QuestContext } from "@/components/quest/context";
import ProblemPreview from "./problem-preview";
import { cn } from "@/lib/utils";

export const Quest = () => {
  const {
    worldsData,
    selectedWorldData,
    selectedWorld,
    worldShifted,
    selectedLevelName,
    levelShifted,
  } = React.useContext(QuestContext);

  const [activePanel, setActivePanel] = React.useState(null);

  const worldFocused = activePanel === "world";
  const levelFocused = activePanel === "level";
  const descriptionFocused = activePanel === "description";

  return (
    <section
      onMouseEnter={() => setActivePanel("world")}
      onMouseLeave={() => setActivePanel(null)}
    >
      {selectedWorld && (
        <section
          className={cn(
            "absolute duration-300 top-0 w-10/12 right-0 h-full bg-[--overlay] text-foreground shadow-window transform transition-all ease-in-out z-40",
            worldShifted ? "translate-x-0" : "translate-x-[110%]",
            (worldFocused ||
              (!worldFocused && !levelFocused && !descriptionFocused)) &&
              "w-3/5",
          )}
          onMouseEnter={() => setActivePanel("level")}
          onMouseLeave={() => setActivePanel("world")}
        >
          {selectedLevelName && (
            <section
              className={cn(
                "absolute duration-300 top-0 w-0 right-0 h-full bg-[--surface-1] text-foreground shadow-window transform transition-all ease-in-out z-20",
                levelShifted ? "translate-x-0" : "translate-x-[110%]",
                levelFocused && "w-3/5",
                descriptionFocused && "w-4/5",
              )}
              onMouseEnter={() => setActivePanel("description")}
              onMouseLeave={() => setActivePanel("level")}
            >
              <ProblemPreview />
            </section>
          )}
          <World worldData={selectedWorldData} isAWorld={true} />
        </section>
      )}
      <span className="absolute right-4 z-40 py-2 pl-4 bg-[var(--surface-1)]">
        Manual
      </span>
      <World worldData={worldsData} isAWorld={false} />
    </section>
  );
};
