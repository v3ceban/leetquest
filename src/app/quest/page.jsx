"use client";

import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getBoxToBoxArrow } from "perfect-arrows";

import worldsData from '@/data/worlds.json';
import arrayWorldData from '@/data/worlds/array.json';
// import hashingWorldData from '@/data/worlds/hashing.json';

const worldData = {
  "Array": arrayWorldData,
  // "Hashing": hashingWorldData
};

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const ARROW_OPTIONS = {
  bow: 0.2,
  stretch: 0.5,
  stretchMin: 40,
  stretchMax: 420,
  padStart: 0,
  padEnd: 20,
  straights: true,
};

function getArrow(x1, y1, x2, y2, flipArrow) {
  const options = {
    ...ARROW_OPTIONS,
    flip: flipArrow,
  };
  return getBoxToBoxArrow(
    x1,
    y1,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    x2,
    y2,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    options
  );
}

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
            <TransformWrapper>
              <TransformComponent>
                <div className="relative w-screen h-screen">
                  {worldData[selectedWorld] && Object.entries(worldData[selectedWorld]).map(([name, { x, y }]) => (
                    <div
                      key={name}
                      className="absolute text-white bg-gray-800 rounded flex justify-center cursor-pointer"
                      style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
                    >
                      {name}
                    </div>
                  ))}
                  <svg
                    className="w-full h-full"
                    stroke="#1F2937"
                    fill="#1F2937"
                    strokeWidth={3}
                  >
                    {worldData[selectedWorld] && Object.entries(worldData[selectedWorld]).flatMap(([name, { x, y, prereqs }]) =>
                      Object.entries(prereqs).map(([prereq, { flip_arrow: flipArrow }]) => {
                        const prereqWorld = worldData[selectedWorld][prereq];
                        if (!prereqWorld) {
                          return null;
                        }
                        const [sx, sy, cx, cy, ex, ey, ae] = getArrow(x, y, prereqWorld.x, prereqWorld.y, flipArrow);
                        const endAngleAsDegrees = ae * (180 / Math.PI);
                        return (
                          <g key={`${name}-${prereq}`}>
                            <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
                            <polygon
                              points="0,-6 12,0, 0,6"
                              transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
                            />
                          </g>
                        );
                      })
                    )}
                  </svg>
                </div>
              </TransformComponent>
            </TransformWrapper>
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

      <TransformWrapper>
        <TransformComponent>
          <div className="w-screen h-screen">
            {Object.entries(worldsData).map(([name, { x, y }]) => (
              <div
                key={name}
                className="absolute text-white bg-gray-800 rounded flex justify-center cursor-pointer"
                style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
                onClick={() => handleWorldClick(name)}
              >
                {name}
              </div>
            ))}
            <svg
              className="w-screen h-screen"
              stroke="#1F2937"
              fill="#1F2937"
              strokeWidth={3}
            >
              {Object.entries(worldsData).flatMap(([name, { x, y, prereqs }]) =>
                Object.entries(prereqs).map(([prereq, { flip_arrow: flipArrow }]) => {
                  const prereqWorld = worldsData[prereq];
                  if (!prereqWorld) {
                    return null;
                  }
                  const [sx, sy, cx, cy, ex, ey, ae] = getArrow(x, y, prereqWorld.x, prereqWorld.y, flipArrow);
                  const endAngleAsDegrees = ae * (180 / Math.PI);
                  return (
                    <g key={`${name}-${prereq}`}>
                      <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
                      <polygon
                        points="0,-6 12,0, 0,6"
                        transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
                      />
                    </g>
                  );
                })
              )}
            </svg>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}