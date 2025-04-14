"use client";

import React from "react";
import PropTypes from "prop-types";
import { World } from "@/components/quest/world";
import { QuestContext } from "@/components/quest/context";
import ProblemPreview from "./problem-preview";
import { cn } from "@/lib/utils";
import { CircleX, Expand, Minimize } from "lucide-react";

const ButtonsContainer = ({ children, className }) => {
  return (
    <nav
      className={cn(
        "absolute right-2 top-[6px] flex items-center justify-center gap-3",
        className,
      )}
    >
      {children}
    </nav>
  );
};
ButtonsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const ResizeButton = ({ onClick, className, open }) => {
  if (open) {
    return (
      <Minimize
        onClick={onClick}
        className={cn(
          "w-6 h-6 ease-in-out cursor-pointer",
          "hover:text-primary",
          className,
        )}
      />
    );
  }
  return (
    <Expand
      onClick={onClick}
      className={cn(
        "w-[22px] h-[22px] cursor-pointer",
        "hover:text-primary",
        className,
      )}
    />
  );
};
ResizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

const CloseButton = ({ onClick, className }) => {
  return (
    <CircleX
      onClick={onClick}
      className={cn("w-6 h-6 cursor-pointer", "hover:text-primary", className)}
    />
  );
};
CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const Quest = () => {
  const {
    worldsData,
    selectedWorldData,
    selectedWorld,
    worldShifted,
    selectedLevelName,
    levelShifted,
    levelFull,
    setLevelFull,
    descriptionFull,
    setDescriptionFull,
    closeWorld,
    closeLevel,
  } = React.useContext(QuestContext);

  return (
    <section>
      {selectedWorld && (
        <section
          className={cn(
            "absolute duration-300 top-0 right-0 h-full bg-[--overlay] text-foreground shadow-window transform transition-all ease-in-out z-40",
            worldShifted ? "translate-x-0" : "translate-x-[110%]",
            levelFull || descriptionFull ? "w-full" : "w-2/3",
          )}
        >
          <ButtonsContainer>
            <ResizeButton
              onClick={() => {
                setLevelFull((prev) => !prev);
                setDescriptionFull(false);
              }}
              open={levelFull}
            />
            <CloseButton onClick={closeWorld} />
          </ButtonsContainer>
          {selectedLevelName && (
            <section
              className={cn(
                "absolute duration-300 top-0 w-2/3 right-0 h-full bg-[--surface-1] text-foreground shadow-window transform transition-all ease-in-out z-20",
                levelShifted ? "translate-x-0" : "translate-x-[110%]",
                descriptionFull ? "w-full" : "w-2/3",
              )}
            >
              <ButtonsContainer>
                <ResizeButton
                  onClick={() => setDescriptionFull((prev) => !prev)}
                  open={descriptionFull}
                />
                <CloseButton onClick={closeLevel} />
              </ButtonsContainer>
              <ProblemPreview />
            </section>
          )}
          <World worldData={selectedWorldData} isAWorld={true} />
        </section>
      )}
      {/* WIP
        <span className="absolute right-4 z-40 py-2 pl-4 bg-[var(--surface-1)]">
          Manual
        </span>
       */}
      <World worldData={worldsData} isAWorld={false} />
    </section>
  );
};
