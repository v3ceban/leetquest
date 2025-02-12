"use client";

import React from "react";
import PropTypes from "prop-types";
import { QuestArrows } from "@/components/arrow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { QuestContext } from "@/components/quest/context";

// also in src/components/arrow.jsx
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 40;
const LEVEL_RADIUS = 20;

const MAX_SCALE = 2;
const MIN_SCALE = 0.5;
const LIMIT_TO_BOUNDS = false;

const LEVEL_DIAMETER = LEVEL_RADIUS * 2;

function World({ worldData, isAWorld }) {
  const { selectedWorld, selectedLevelName, closeLevel, closeWorld } =
    React.useContext(QuestContext);

  // console.log("world.jsx:23 World", worldData, isAWorld);

  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      if (!isAWorld && selectedWorld) {
        closeWorld();
      } else if (isAWorld && selectedLevelName) {
        closeLevel();
      }
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2 className="bg-[var(--surface-1)] pl-4 py-2">
        {isAWorld ? selectedWorld : "Worlds"}
      </h2>
      <TransformWrapper
        doubleClick={{ disabled: true }}
        maxScale={MAX_SCALE}
        minScale={MIN_SCALE}
        limitToBounds={LIMIT_TO_BOUNDS}
      >
        <TransformComponent>
          <section className="relative w-screen h-dvh flex-grow animate-fadein">
            {Object.values(worldData).map(
              ({ name, x_position, y_position, color }) => (
                <WorldNode
                  key={name}
                  isAWorld={isAWorld}
                  name={name}
                  x_position={x_position}
                  y_position={y_position}
                  value={name}
                  isAPreview={false}
                  color={color}
                />
              ),
            )}
            {worldData && <QuestArrows data={worldData} isAWorld={isAWorld} />}
          </section>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

World.propTypes = {
  worldData: PropTypes.object,
  isAWorld: PropTypes.bool,
};

function WorldNode({
  name,
  isAWorld,
  color,
  x_position,
  y_position,
  value,
  isAPreview,
}) {
  const { handleWorldClick, handleLevelClick } = React.useContext(QuestContext);

  // console.log("world.jsx:85 WorldNode", name, isAWorld, color, x_position, y_position, value, isAPreview);

  const handleClick = isAPreview
    ? undefined
    : (event) => {
      // Prevents the click from propagating to the World (which also closes tabs to the right if clicked, but prevents going to the newly clicked node in the same world)
      event.stopPropagation();
      if (!isAWorld) {
        handleWorldClick(value);
      } else {
        handleLevelClick(name);
      }
    };

  return !isAWorld ? (
    <button
      key={name}
      className={`flex justify-center items-center rounded cursor-pointer text-background bg-foreground ${isAPreview ? "" : "shadow-node"}`}
      style={{
        left: x_position,
        top: y_position,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto",
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
        left: x_position,
        top: y_position,
        width: LEVEL_DIAMETER,
        height: LEVEL_DIAMETER,
        backgroundColor: `var(--${color.toLowerCase()}-node)`,
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto",
      }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

WorldNode.propTypes = {
  name: PropTypes.string.isRequired,
  isAWorld: PropTypes.bool,
  color: PropTypes.string,
  x_position: PropTypes.number.isRequired,
  y_position: PropTypes.number.isRequired,
  value: PropTypes.string,
  isAPreview: PropTypes.bool,
};

export { World, WorldNode };
