"use client";

import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArrowsWrapper, Arrow } from '@/components/Arrow';
import { World, WorldNode } from '@/components/World';

import worldsData from '@/data/worlds.json';
import arrayWorldData from '@/data/worlds/array.json';
// import hashingWorldData from '@/data/worlds/hashing.json';

const worldData = {
  "Array": arrayWorldData,
  // "Hashing": hashingWorldData
};

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const LEVEL_RADIUS = 20;
const LEVEL_DIAMETER = LEVEL_RADIUS * 2;

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
          <div>
            <h2 className="text-2xl font-bold p-4">{selectedWorld}</h2>
            <World>
              {worldData[selectedWorld] && Object.entries(worldData[selectedWorld]).map(([name, { x, y }]) => (
                <WorldNode key={name} world={false} name={name} x={x} y={y} onClick={() => {}} />
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
                        box={false}
                        radius={LEVEL_RADIUS}
                        flipArrow={flipArrow || false}
                      />
                    );
                  })
                )}
              </ArrowsWrapper>
            </World>
          </div>
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

      <World>
        {Object.entries(worldsData).map(([name, { x, y }]) => (
          <WorldNode key={name} world={true} name={name} x={x} y={y} onClick={() => handleWorldClick(name)} />
        ))}
        <ArrowsWrapper>
          {Object.entries(worldsData).flatMap(([name, { x, y, prereqs = {} }]) =>
            Object.entries(prereqs).map(([prereq, { flip_arrow: flipArrow }]) => {
              const prereqWorld = worldsData[prereq];
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
                  box={true}
                  width={WORLD_WIDTH}
                  height={WORLD_HEIGHT}
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