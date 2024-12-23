"use client";

import React from "react";
import { QuestArrows } from "@/components/arrow";
import { World, WorldNode } from "@/components/quest/world";
import { QuestContext } from "@/components/quest/context";
import CloseTag from "./close-tag";

export const Levels = () => {
  const {
    worldData,
    shiftDuration,
    selectedWorld,
    worldShifted,
    selectedLevel,
    levelShifted,
  } = React.useContext(QuestContext);

  return (
    selectedWorld && (
      <section
        className={`absolute top-0 right-0 w-2/3 h-full bg-[--overlay] text-foreground shadow-lg shadow-dark transform transition-transform ease-in-out z-40 ${worldShifted ? "translate-x-0" : "translate-x-[110%]"}`}
        style={{ transitionDuration: `${shiftDuration}ms` }}
      >
        {selectedLevel && (
          <section
            className={`absolute top-0 right-0 w-1/2 h-full bg-[--surface-1] text-foreground shadow-lg shadow-dark transform transition-transform ease-in-out z-20 ${levelShifted ? "translate-x-0" : "translate-x-[110%]"}`}
            style={{ transitionDuration: `${shiftDuration}ms` }}
          >
            <h2 className="p-4 text-2xl">{selectedLevel}</h2>
            <CloseTag type="level" />
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
                />
              ),
            )}
          {worldData[selectedWorld] && (
            <QuestArrows data={worldData[selectedWorld]} />
          )}
        </World>
        <CloseTag type="world" />
      </section>
    )
  );
};
