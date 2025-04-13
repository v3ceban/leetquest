"use client";

import React from "react";
import PropTypes from "prop-types";
import { QuestArrows } from "@/components/arrow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { QuestContext } from "@/components/quest/context";
import { cn } from "@/lib/utils";

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

  //console.log("world.jsx:25 World", worldData, isAWorld);

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
      <h2 className="py-2 pl-4 bg-[var(--surface-1)]">
        {isAWorld ? selectedWorld : "Worlds"}
      </h2>
      <TransformWrapper
        doubleClick={{ disabled: true }}
        maxScale={MAX_SCALE}
        minScale={MIN_SCALE}
        limitToBounds={LIMIT_TO_BOUNDS}
      >
        <TransformComponent>
          <section className={"relative flex-grow w-screen h-dvh"}>
            {Object.values(worldData).map(
              ({
                id,
                name,
                x_position,
                y_position,
                color,
                isWorldUnlocked,
                unlocked: isLevelUnlocked,
              }) => (
                <WorldNode
                  key={id}
                  isAWorld={isAWorld}
                  name={name}
                  x_position={x_position}
                  y_position={y_position}
                  value={name}
                  isAPreview={false}
                  color={color}
                  isWorldUnlocked={isWorldUnlocked}
                  isLevelUnlocked={isLevelUnlocked}
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
  isWorldUnlocked,
  isLevelUnlocked,
  className,
}) {
  const { handleWorldClick, handleLevelClick } = React.useContext(QuestContext);

  // console.log("world.jsx:115 WorldNode", name, isAWorld, color, x_position, y_position, value, isAPreview);

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
      className={cn(
        "flex justify-center text-sm items-center rounded cursor-pointer text-background bg-foreground",
        isAPreview ? "shadow-node" : "animate-fadein",
        !isWorldUnlocked && "opacity-50",
      )}
      // disabled={!isWorldUnlocked}
      style={{
        left: x_position,
        top: y_position,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto",
        '--target-opacity': !isWorldUnlocked ? 0.5 : 1,
      }}
      onClick={handleClick}
    >
      {name}
    </button>
  ) : (
    <button
      key={name}
      className={cn(
        "text-black flex justify-center items-center cursor-pointer rounded-full text-xl text-[--surface-1]",
        isAPreview ? "shadow-node" : "animate-fadein",
        !isLevelUnlocked && "opacity-50",
        className,
      )}
      // disabled={!isLevelUnlocked}
      style={{
        left: x_position,
        top: y_position,
        width: LEVEL_DIAMETER,
        height: LEVEL_DIAMETER,
        backgroundColor: `var(--${color.toLowerCase()}-node)`,
        position: isAPreview ? "relative" : "absolute",
        pointerEvents: isAPreview ? "none" : "auto",
        '--target-opacity': !isLevelUnlocked ? 0.5 : 1,
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
  isWorldUnlocked: PropTypes.bool,
  isLevelUnlocked: PropTypes.bool, // might also be renamed to "unlocked"
  className: PropTypes.string,
};

export { World, WorldNode };
