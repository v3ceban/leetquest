"use client";

import React from "react";
import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { QuestContext } from "@/components/quest/context";

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
  const { selectedWorld } = React.useContext(QuestContext);

  return (
    <>
      <h2 className="p-4 text-2xl font-bold">
        {title ? title : selectedWorld}
      </h2>
      <TransformWrapper>
        <TransformComponent>
          <section className="relative w-screen h-dvh">{children}</section>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}

World.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

function WorldNode({ name, type, levelColor, x, y, value }) {
  const { handleWorldClick, handleLevelClick } = React.useContext(QuestContext);
  const handleClick = () => {
    if (type === "world") {
      handleWorldClick(value);
    } else {
      handleLevelClick(value);
    }
  };

  return type === "world" ? (
    <button
      key={name}
      className="flex absolute justify-center items-center rounded cursor-pointer text-background bg-foreground"
      style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      onClick={handleClick}
    >
      {name}
    </button>
  ) : (
    <button
      key={name}
      className={`absolute text-white flex justify-center items-center cursor-pointer rounded-full ${LEVEL_COLOR_TO_BACKGROUND_COLOR[levelColor] || LEVEL_COLOR_TO_BACKGROUND_COLOR["default"]}`}
      style={{ left: x, top: y, width: LEVEL_DIAMETER, height: LEVEL_DIAMETER }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

WorldNode.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  levelColor: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export { World, WorldNode };
