"use client";

import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { QuestArrows } from "@/components/arrow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { QuestContext } from "@/components/quest/context";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCircleCheck, FaLock } from "react-icons/fa6";

// also in src/components/arrow.jsx
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 40;
const LEVEL_RADIUS = 20;

const MAX_SCALE = 5;
const INITIAL_SCALE = 1.8;
const MIN_SCALE = 0.5;
const LIMIT_TO_BOUNDS = false;

const LEVEL_DIAMETER = LEVEL_RADIUS * 2;

function World({ worldData, isAWorld }) {
  const { selectedWorld, selectedLevelName, closeLevel, closeWorld } =
    React.useContext(QuestContext);

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
      <section>
        <TransformWrapper
          doubleClick={{ mode: "reset" }}
          maxScale={MAX_SCALE}
          minScale={MIN_SCALE}
          limitToBounds={LIMIT_TO_BOUNDS}
          initialScale={isAWorld ? 1 : INITIAL_SCALE}
          wheel={{
            step: 0.1,
            smoothStep: 0.005,
          }}
          pinch={{
            step: 10,
          }}
        >
          {({ resetTransform }) => {
            useEffect(() => {
              isAWorld && resetTransform();
            }, []);
            return (
              <TransformComponent>
                <TooltipProvider>
                  <section className={"relative flex-grow w-screen h-dvh"}>
                    {worldData.map(
                      (
                        {
                          id,
                          name,
                          x_position,
                          y_position,
                          color,
                          isWorldUnlocked,
                          unlocked: isLevelUnlocked,
                          status: levelStatus,
                        },
                        idx,
                      ) => (
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
                          levelStatus={levelStatus}
                          worldData={worldData[idx]}
                        />
                      ),
                    )}
                    {worldData && (
                      <QuestArrows data={worldData} isAWorld={isAWorld} />
                    )}
                  </section>
                </TooltipProvider>
              </TransformComponent>
            );
          }}
        </TransformWrapper>
      </section>
    </div>
  );
}

World.propTypes = {
  worldData: PropTypes.array,
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
  levelStatus,
  className,
  worldData,
}) {
  const { handleWorldClick, handleLevelClick } = React.useContext(QuestContext);

  const handleClick = isAPreview
    ? undefined
    : (event) => {
        // Prevents the click from propagating to the World (which also closes tabs to the right if clicked, but prevents going to the newly clicked node in the same world)
        event.stopPropagation();
        if (isAWorld) {
          handleLevelClick(name);
        } else {
          handleWorldClick(value);
        }
      };

  if (isAWorld) {
    // isAWorld means are you inside a world
    const levelLocked = !isLevelUnlocked || !isWorldUnlocked;
    if (isAPreview) {
      return (
        <button
          key={name}
          className={cn(
            "text-black shadow shadow-black/60 flex justify-center items-center rounded-full text-xl text-[--surface-1]",
            "cursor-pointer hover:shadow-black hover:brightness-[0.9]",
          )}
          style={{
            left: x_position,
            top: y_position,
            width: LEVEL_DIAMETER,
            height: LEVEL_DIAMETER,
            backgroundColor: `var(--${color.toLowerCase()}-node)`,
            position: "relative",
            pointerEvents: "none",
          }}
        >
          {name}
        </button>
      );
    }
    return (
      <Tooltip>
        <TooltipTrigger
          key={name}
          className={cn(
            "text-black shadow shadow-black/60 flex justify-center items-center rounded-full text-xl text-[--surface-1]",
            "cursor-pointer hover:shadow-black hover:brightness-[0.9]",
            levelLocked && "opacity-50",
            className,
          )}
          style={{
            left: x_position,
            top: y_position,
            width: LEVEL_DIAMETER,
            height: LEVEL_DIAMETER,
            backgroundColor: `var(--${color.toLowerCase()}-node)`,
            position: "absolute",
            pointerEvents: "auto",
          }}
          onClick={handleClick}
        >
          <h3>{name}</h3>
          {levelStatus === "COMPLETE" && (
            <FaCircleCheck className="absolute w-3 h-3 rounded-full -right-[1px] -top-[1px] bg-[--overlay]" />
          )}
        </TooltipTrigger>
        <LevelTooltipContent level={worldData} />
      </Tooltip>
    );
  }
  const totalLevels = worldData?.totalLevels || 0;
  const completedLevels = worldData?.levelsCompleted || 0;
  return (
    <button
      key={name}
      className={cn(
        "flex shadow shadow-black/25 flex-col justify-center text-[8px] items-center rounded text-background bg-foreground",
        " cursor-pointer hover:shadow-black/50 hover:saturate-150",
        !isWorldUnlocked && "opacity-50",
      )}
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
      <h3 className="font-medium">{name}</h3>
      {!isAPreview && (
        <>
          {!isWorldUnlocked ? (
            <span className="mt-1 text-[6px]">
              <FaLock className="inline-block mr-1 w-2 h-2" />
              Locked
            </span>
          ) : (
            <>
              <span className="mt-1 text-[6px]">
                {completedLevels || 0}/{totalLevels || 0} Levels
              </span>
              <Progress
                value={(completedLevels / totalLevels) * 100}
                className="w-[78px] h-[3px] mt-[2.5px] bg-primary"
                progressBarClass="bg-background"
              />
            </>
          )}
        </>
      )}
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
  isLevelUnlocked: PropTypes.bool,
  className: PropTypes.string,
  worldData: PropTypes.object.isRequired,
  levelStatus: PropTypes.string,
};

function LevelTooltipContent({ level }) {
  const levelComplete = level.status === "COMPLETE";
  return (
    <TooltipContent className="absolute left-6 space-y-1 w-48 text-xs rounded-sm shadow-background/75">
      <h4 className="font-semibold">{level.title}</h4>
      <p className="flex gap-1 items-center">
        <Star className="w-3 h-3 fill-foreground" />
        <span>{level.type[0] + level.type.slice(1).toLowerCase()}</span>
      </p>
      <p className="flex gap-1 items-center">
        {level.unlocked ? (
          levelComplete ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Circle className="w-3 h-3" />
          )
        ) : (
          <FaLock className="w-3 h-3" />
        )}
        <span>
          {level.unlocked
            ? levelComplete
              ? "Completed"
              : "Incomplete"
            : "Locked"}
        </span>
      </p>
    </TooltipContent>
  );
}

LevelTooltipContent.propTypes = {
  level: PropTypes.object.isRequired,
};

export { World, WorldNode };
