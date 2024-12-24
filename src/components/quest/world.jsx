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
  blue: "var(--blue-node)",
  green: "var(--green-node)",
  red: "var(--red-node)",
};

function World({ children, title }) {
  const { selectedWorld, selectedLevelName, closeLevel, closeWorld } = React.useContext(QuestContext);

  const isAWorld = title ? false : true;

  const handleBackgroundClick = () => {
    if (!isAWorld && selectedWorld) {
      closeWorld();
    } else if (isAWorld && selectedLevelName) {
      closeLevel();
    }
  };

  return (
    <div className="flex flex-col h-full" onClick={handleBackgroundClick}>
      <h2 className="bg-[var(--surface-1)] pl-4 py-2">
        {isAWorld ? selectedWorld : title}
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

function WorldNode({ name, type, levelColor, x, y, value, isAPreview }) {
  const { handleWorldClick, handleLevelClick } = React.useContext(QuestContext);

  const handleClick = isAPreview ? undefined : (event) => {
    // Prevents the click from propagating to the World (which also closes tabs to the right if clicked, but prevents going to the newly clicked node in the same world)
    event.stopPropagation();
    if (type === "world") {
      handleWorldClick(value);
    } else {
      handleLevelClick(name);
    }
  };

  return type === "world" ? (
    <button
      key={name}
      className={`flex justify-center items-center rounded cursor-pointer text-background bg-foreground ${isAPreview ? "" : "shadow-node"}`}
      style={{
        left: x,
        top: y,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto"
      }}
      onClick={handleClick}
    >
      {name}
    </button>
  ) : (
    <button
      key={name}
      className={`text-black flex justify-center items-center cursor-pointer rounded-full text-xl text-[--surface-1] ${isAPreview ? "" : "shadow-node"}`}
      style={{ 
        left: x, 
        top: y, 
        width: LEVEL_DIAMETER, 
        height: LEVEL_DIAMETER, 
        backgroundColor: LEVEL_COLOR_TO_BACKGROUND_COLOR[levelColor], 
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto"
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
