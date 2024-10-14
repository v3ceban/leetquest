"use client";

import { useState, useEffect } from "react";
import { ArrowsWrapper, Arrow } from '@/components/Arrow';
import { World, WorldNode } from '@/components/World';

import worldsData from '@/data/worlds.json';
import arrayWorldData from '@/data/worlds/array.json';
// import hashingWorldData from '@/data/worlds/hashing.json';

const worldData = {
  "Worlds": worldsData,
  "Array": arrayWorldData,
  // "Hashing": hashingWorldData
};

export default function Quest() {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleWorldClick = (world) => {
    if (selectedWorld === null) {
      setSelectedWorld(world);
    } else {
      if (selectedWorld === world) {
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        setSelectedWorld(world);
        setIsVisible(true);
      }, 300);
    }
  };

  const closeWindow = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedWorld(null), 300);
  };

  useEffect(() => {
    if (selectedWorld) {
      setIsVisible(true);
    }
  }, [selectedWorld]);

  return (
    <div className="relative">
      {/* TODO: Breadcrumb */}

      {selectedWorld && (
        <div
          className={`absolute top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isVisible ? 'translate-x-0' : 'translate-x-[110%]'}`}
        >
          <World title={selectedWorld}>
            {worldData[selectedWorld] && Object.entries(worldData[selectedWorld]).map(([name, { x, y, color }]) => (
              <WorldNode key={name} isAWorld={false} name={name} levelColor={color} x={x} y={y} onClick={() => {}} />
            ))}
            <ArrowsWrapper>
              {worldData[selectedWorld] && Object.entries(worldData[selectedWorld]).flatMap(([name, { x, y, prereqs = {} }]) =>
                Object.entries(prereqs).map(([prereq, { flip_arrow: flipArrow }]) => {
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
                })
              )}
            </ArrowsWrapper>
          </World>
          <div
            className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 cursor-pointer"
            style={{
              borderBottom: '30px solid transparent',
              borderTop: '30px solid transparent',
              borderRight: '30px solid #1F2937',
              height: '80px',
            }}
            onClick={closeWindow}
          />
        </div>
      )}

      <World title={"Worlds"}>
        {Object.entries(worldData["Worlds"]).map(([name, { x, y }]) => (
          <WorldNode key={name} isAWorld={true} name={name} x={x} y={y} onClick={() => handleWorldClick(name)} />
        ))}
        <ArrowsWrapper>
          {Object.entries(worldData["Worlds"]).flatMap(([name, { x, y, prereqs = {} }]) =>
            Object.entries(prereqs).map(([prereq, { flip_arrow: flipArrow }]) => {
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
            })
          )}
        </ArrowsWrapper>
      </World>
    </div>
  );
}