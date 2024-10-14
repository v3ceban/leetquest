"use client";

import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import worlds from '@/data/worlds/worlds.json';

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
                className="absolute text-white bg-gray-800 rounded w-[10ch] flex justify-center cursor-pointer"
                style={{ left: x, top: y }}
                onClick={() => handleWorldClick(id)}
              >
                {name}
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}