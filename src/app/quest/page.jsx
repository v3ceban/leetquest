"use client";

import React, { useState, useEffect } from "react";
import { ArrowsWrapper, Arrow } from "@/components/Arrow";
import { World, WorldNode } from "@/components/World";

import worldsData from "@/data/worlds.json";
import arrayWorldData from "@/data/worlds/array.json";
// import hashingWorldData from '@/data/worlds/hashing.json';

const SHIFT_DURATION = 200;
const worldData = {
  Worlds: worldsData,
  Array: arrayWorldData,
  // "Hashing": hashingWorldData
};

export default function Quest() {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [worldShifted, setWorldShifted] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levelShifted, setLevelShifted] = useState(false);

  const switchWorld = (nextWorld) => {
    if (selectedLevel) {
      setLevelShifted(false);
      setTimeout(() => {
        setSelectedLevel(null);
        setWorldShifted(false);
        setTimeout(() => setSelectedWorld(nextWorld), SHIFT_DURATION);
      }, SHIFT_DURATION);
    } else {
      setWorldShifted(false);
      setTimeout(() => setSelectedWorld(nextWorld), SHIFT_DURATION);
    }
  };

  const handleWorldClick = (world) => {
    if (!selectedWorld) {
      setSelectedWorld(world);
    } else if (selectedWorld !== world) {
      switchWorld(world);
    }
  };

  const closeWorld = () => {
    switchWorld(null);
  };

  useEffect(() => {
    if (selectedWorld) {
      setWorldShifted(true);
    }
  }, [selectedWorld]);

  const handleLevelClick = (level) => {
    if (!selectedLevel) {
      setSelectedLevel(level);
    } else if (selectedLevel !== level) {
      setLevelShifted(false);
      setTimeout(() => setSelectedLevel(level), SHIFT_DURATION);
    }
  };

  const closeLevel = () => {
    setLevelShifted(false);
    setTimeout(() => setSelectedLevel(null), SHIFT_DURATION);
  };

  useEffect(() => {
    if (selectedLevel) {
      setLevelShifted(true);
    }
  }, [selectedLevel]);

  return (
    <main className="relative overflow-hidden max-h-[calc(100dvh-104px)]">
      {/* TODO: Breadcrumb */}

      {selectedWorld && (
        <div
          className={`absolute top-0 right-0 w-2/3 h-full bg-background text-foreground shadow-lg shadow-dark transform transition-transform ease-in-out z-40 ${worldShifted ? "translate-x-0" : "translate-x-[110%]"}`}
          style={{ transitionDuration: `${SHIFT_DURATION}ms` }}
        >
          {selectedLevel && (
            <div
              className={`absolute top-0 right-0 w-1/2 h-full bg-background text-foreground shadow-lg shadow-dark transform transition-transform ease-in-out z-20 ${levelShifted ? "translate-x-0" : "translate-x-[110%]"}`}
              style={{ transitionDuration: `${SHIFT_DURATION}ms` }}
            >
              <h2 className="p-4 text-2xl font-bold">{selectedLevel}</h2>
              <div
                className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 cursor-pointer"
                style={{
                  borderBottom: "30px solid transparent",
                  borderTop: "30px solid transparent",
                  borderRight: "30px solid #cdd6f4",
                  height: "80px",
                }}
                onClick={closeLevel}
              />
            </div>
          )}

          <World title={selectedWorld}>
            {worldData[selectedWorld] &&
              Object.entries(worldData[selectedWorld]).map(
                ([name, { x, y, level, color }]) => (
                  <WorldNode
                    key={name}
                    isAWorld={false}
                    name={name}
                    levelColor={color}
                    x={x}
                    y={y}
                    onClick={() => handleLevelClick(level)}
                  />
                ),
              )}
            <ArrowsWrapper>
              {worldData[selectedWorld] &&
                Object.entries(worldData[selectedWorld]).flatMap(
                  ([name, { x, y, prereqs = {} }]) =>
                    Object.entries(prereqs).map(
                      ([prereq, { flip_arrow: flipArrow }]) => {
                        const prereqWorld = worldData[selectedWorld][prereq];
                        if (!prereqWorld) {
                          return null;
                        }
                        return (
                          <Arrow
                            key={`${name}-${prereq}`}
                            x1={prereqWorld.x}
                            y1={prereqWorld.y}
                            x2={x}
                            y2={y}
                            isAWorld={false}
                            flipArrow={flipArrow || false}
                          />
                        );
                      },
                    ),
                )}
            </ArrowsWrapper>
          </World>
          <div
            className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 cursor-pointer"
            style={{
              borderBottom: "30px solid transparent",
              borderTop: "30px solid transparent",
              borderRight: "30px solid #cdd6f4",
              height: "80px",
            }}
            onClick={closeWorld}
          />
        </div>
      )}

      <World title={"Worlds"}>
        {Object.entries(worldData["Worlds"]).map(([name, { x, y }]) => (
          <WorldNode
            key={name}
            isAWorld={true}
            name={name}
            x={x}
            y={y}
            onClick={() => handleWorldClick(name)}
          />
        ))}
        <ArrowsWrapper>
          {Object.entries(worldData["Worlds"]).flatMap(
            ([name, { x, y, prereqs = {} }]) =>
              Object.entries(prereqs).map(
                ([prereq, { flip_arrow: flipArrow }]) => {
                  const prereqWorld = worldData["Worlds"][prereq];
                  if (!prereqWorld) {
                    return null;
                  }
                  return (
                    <Arrow
                      key={`${name}-${prereq}`}
                      x1={prereqWorld.x}
                      y1={prereqWorld.y}
                      x2={x}
                      y2={y}
                      isAWorld={true}
                      flipArrow={flipArrow || false}
                    />
                  );
                },
              ),
          )}
        </ArrowsWrapper>
      </World>
    </main>
  );
}
