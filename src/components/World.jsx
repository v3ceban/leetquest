"use client";

import React from "react";
import PropTypes from "prop-types";
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
          <div className="relative w-screen h-dvh">{children}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

World.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

function WorldNode({ isAWorld, name, levelColor, x, y, onClick }) {
  return isAWorld ? (
    <div
      key={name}
      className="flex absolute justify-center items-center text-background bg-foreground rounded cursor-pointer"
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
      onClick={onClick}
    >
      {name}
    </div>
  );
}

WorldNode.propTypes = {
  isAWorld: PropTypes.bool,
  name: PropTypes.string,
  levelColor: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  onClick: PropTypes.func,
};

export { World, WorldNode };
