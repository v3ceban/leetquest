import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const WORLD_WIDTH = 70;
const WORLD_HEIGHT = 25;
const LEVEL_RADIUS = 20;
const LEVEL_DIAMETER = LEVEL_RADIUS * 2;
const LEVEL_COLOR_TO_BACKGROUND_COLOR = {
  blue: "bg-blue-700",
  green: "bg-green-600",
  red: "bg-red-600",
  default: "bg-gray-800",
};

function World({ children, title }) {
  return (
    <div>
      <h2 className="p-4 text-2xl font-bold">{title}</h2>
      <TransformWrapper>
        <TransformComponent>
          <div className="relative w-screen h-full">{children}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

function WorldNode({ isAWorld, name, levelColor, x, y, onClick }) {
  return isAWorld ? (
    <div
      key={name}
      className="flex absolute justify-center items-center text-white bg-gray-800 rounded cursor-pointer"
      style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      onClick={onClick}
    >
      {name}
    </div>
  ) : (
    <div
      key={name}
      className={`absolute text-white flex justify-center items-center cursor-pointer rounded-full ${LEVEL_COLOR_TO_BACKGROUND_COLOR[levelColor] || LEVEL_COLOR_TO_BACKGROUND_COLOR["default"]}`}
      style={{ left: x, top: y, width: LEVEL_DIAMETER, height: LEVEL_DIAMETER }}
    >
      {name}
    </div>
  );
}

export { World, WorldNode };
