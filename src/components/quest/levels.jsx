"use client";

import React from "react";
import { QuestArrows } from "@/components/arrow";
import { World, WorldNode } from "@/components/quest/world";
import { QuestContext } from "@/components/quest/context";
import ProblemPreview from "./problem-preview";

export const Levels = () => {
  const {
    worldData,
    shiftDuration,
    selectedWorld,
    worldShifted,
    selectedLevelName,
    levelShifted,
  } = React.useContext(QuestContext);

  return (
    selectedWorld && (
      <section
        className={`absolute top-0 right-0 w-2/3 h-full bg-[--overlay] text-foreground shadow-window transform transition-transform ease-in-out z-40 ${worldShifted ? "translate-x-0" : "translate-x-[110%]"}`}
        style={{ transitionDuration: `${shiftDuration}ms` }}
      >
        {selectedLevelName && (
          <section
            className={`absolute top-0 right-0 w-1/2 h-full bg-[--surface-1] text-foreground shadow-window transform transition-transform ease-in-out z-20 ${levelShifted ? "translate-x-0" : "translate-x-[110%]"}`}
            style={{ transitionDuration: `${shiftDuration}ms` }}
          >
            <ProblemPreview></ProblemPreview>
          </section>
        )}

        <World>
          {worldData[selectedWorld] &&
            Object.entries(worldData[selectedWorld]).map(
              ([name, { x, y, level, color }]) => (
                <WorldNode
                  key={name}
                  type="level"
                  name={name}
                  levelColor={color}
                  x={x}
                  y={y}
                  value={level}
                  isAPreview={false}
                />
              ),
            )}
          {worldData[selectedWorld] && (
            <QuestArrows data={worldData[selectedWorld]} />
          )}
        </World>
      </section>
    )
  );
};
