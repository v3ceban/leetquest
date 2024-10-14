"use client";

import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getBoxToBoxArrow } from "perfect-arrows";
import worlds from '@/data/worlds/worlds.json';

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const ARROW_OPTIONS = {
  bow: 0.2,
  stretch: 0.5,
  stretchMin: 40,
  stretchMax: 420,
  padStart: 0,
  padEnd: 20,
  flip: false,
  straights: true,
}

function getArrow(x1, y1, x2, y2) {
  return getBoxToBoxArrow(
    x1,
    y1,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    x2,
    y2,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    ARROW_OPTIONS
  );
}

export default function Quest() {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleWorldClick = (world) => {
    setSelectedWorld(world);
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
          className={`absolute top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button className="absolute top-4 right-4 text-black" onClick={closeWindow}>
            Close
          </button>
          <div className="p-4">
            <h2 className="text-2xl font-bold">{worlds[selectedWorld].name}</h2>
            {/* TODO: World map */}
          </div>
        </div>
      )}

      <TransformWrapper>
        <TransformComponent>
          <div className="w-screen h-screen">
            {Object.entries(worlds).map(([id, { name, x, y }]) => (
              <div
                key={id}
                className="absolute text-white bg-gray-800 rounded flex justify-center cursor-pointer"
                style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
                onClick={() => handleWorldClick(id)}
              >
                {name}
              </div>
            ))}
            <svg stroke="#1F2937" fill="#1F2937" strokeWidth={3}>
              {Object.entries(worlds).flatMap(([id, { x, y, prereqs }]) =>
                prereqs.map(prereqId => {
                  const prereqWorld = worlds[prereqId];
                  if (!prereqWorld) {
                    return null;
                  }
                  const [sx, sy, cx, cy, ex, ey, ae] = getArrow(x, y, prereqWorld.x, prereqWorld.y);
                  const endAngleAsDegrees = ae * (180 / Math.PI);
                  return (
                    <g key={`${id}-${prereqId}`}>
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