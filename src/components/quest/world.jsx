"use client";

import React from "react";
import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { QuestContext } from "@/components/quest/context";

// also in src/components/arrow.jsx
const WORLD_WIDTH = 100; 
const WORLD_HEIGHT = 40; 
const LEVEL_RADIUS = 20; 

const MAX_SCALE = 2;
const MIN_SCALE = 0.5;
const LIMIT_TO_BOUNDS = true;

const LEVEL_DIAMETER = LEVEL_RADIUS * 2;
const LEVEL_COLOR_TO_BACKGROUND_COLOR = {
  blue: "var(--blue-world-node)",
  green: "var(--green-world-node)",
  red: "var(--red-world-node)",
};

function World({ children, title }) {
  const { selectedWorld } = React.useContext(QuestContext);

  return (
    <div className="flex flex-col h-full">
      <h2 className="bg-[var(--surface-1)] pl-4 py-2">
        {title ? title : selectedWorld}
      </h2>
      <TransformWrapper
        doubleClick={{ step: 0.3 }}
        maxScale={MAX_SCALE}
        minScale={MIN_SCALE}
        limitToBounds={LIMIT_TO_BOUNDS}
      >
        <TransformComponent>
          <section className="relative w-screen h-dvh flex-grow">{children}</section>
        </TransformComponent>
      </TransformWrapper>
    </div>
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
      className="flex absolute justify-center items-center rounded cursor-pointer text-background bg-foreground shadow-lg shadow-[--surface-1]"
      style={{ left: x, top: y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
      onClick={handleClick}
    >
      {name}
    </button>
  ) : (
    <button
      key={name}
        className="absolute text-black flex justify-center items-center cursor-pointer rounded-full text-xl text-[--surface-1] shadow-lg shadow-[--surface-1]"
      style={{ 
        left: x, 
        top: y, 
        width: LEVEL_DIAMETER, 
        height: LEVEL_DIAMETER, 
        backgroundColor: LEVEL_COLOR_TO_BACKGROUND_COLOR[levelColor], 
        // fontWeight: /^[A-Za-z]$/.test(name) ? "bold" : "normal" 
      }}
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
