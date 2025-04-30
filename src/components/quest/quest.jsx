"use client";

import { useContext } from "react";
import PropTypes from "prop-types";
import { World } from "@/components/quest/world";
import { QuestContext } from "@/components/quest/context";
import ProblemPreview from "@/components/quest/problem-preview";
import { cn } from "@/lib/utils";
import { CircleX, Expand, Minimize, BookOpen, Book } from "lucide-react";
import { Manual } from "@/components/quest/manual";

export const ButtonsContainer = ({ children, className }) => {
  return (
    <nav
      className={cn(
        "absolute right-4 top-[7px] flex items-center justify-center gap-3 bg-[--surface-1]",
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

const AnimatedButton = ({ children, onClick, className, title, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex relative justify-center items-center w-6 h-6 hover:text-primary",
        className,
      )}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export const ResizeButton = ({ onClick, className, open }) => {
  return (
    <AnimatedButton
      aria-label={open ? "Minimize" : "Minimize"}
      title={open ? "Minimize" : "Maximize"}
      onClick={onClick}
      className={className}
    >
      <Expand
        className={cn(
          "transition-all absolute w-[22px] h-[22px]",
          open && "opacity-0 scale-0",
        )}
      />
      <Minimize
        className={cn("transition-all absolute", !open && "opacity-0 scale-50")}
      />
    </AnimatedButton>
  );
};
ResizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

export const CloseButton = ({ onClick, className }) => {
  return (
    <CircleX
      aria-label="Close"
      onClick={onClick}
      className={cn("w-6 h-6 cursor-pointer", "hover:text-primary", className)}
    />
  );
};
CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const ManualButton = ({ open, onClick, className }) => {
  return (
    <AnimatedButton
      aria-label={open ? "Close Manual" : "Open Manual"}
      title={open ? "Close Manual" : "Open Manual"}
      onClick={onClick}
    >
      <Book
        className={cn(
          "transition-all absolute",
          open && "opacity-0 scale-50",
          className,
        )}
      />
      <BookOpen
        className={cn(
          "transition-all absolute",
          !open && "opacity-0 scale-50",
          className,
        )}
      />
    </AnimatedButton>
  );
};
ManualButton.propTypes = {
  open: PropTypes.bool.isRequired,
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
    manualOpen,
    setManualOpen,
  } = useContext(QuestContext);

  return (
    <section>
      <Manual open={manualOpen} onOpenChange={setManualOpen} />

      {selectedWorld && (
        <section
          className={cn(
            "absolute duration-300 top-0 right-0 h-full bg-[--overlay] text-foreground shadow-window transform transition-all ease-in-out z-40",
            worldShifted ? "translate-x-0" : "translate-x-[110%]",
            levelFull || descriptionFull ? "w-full" : "w-2/3",
          )}
        >
          <ButtonsContainer>
            <ManualButton
              open={manualOpen}
              onClick={() => setManualOpen((prev) => !prev)}
            />
            <ResizeButton
              onClick={() => {
                setLevelFull((prev) => !prev);
                setDescriptionFull(false);
              }}
              open={levelFull}
              className="hidden md:flex"
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
              <ProblemPreview />
            </section>
          )}
          <World worldData={selectedWorldData} isAWorld={true} />
        </section>
      )}
      <ButtonsContainer>
        <ManualButton
          open={manualOpen}
          onClick={() => setManualOpen((prev) => !prev)}
        />
      </ButtonsContainer>
      <World worldData={worldsData} isAWorld={false} />
    </section>
  );
};
