"use client";

import React from "react";
import PropTypes from "prop-types";

export const QuestContext = React.createContext({
  // default fallback values
  worldData: {},
  shiftDuration: 200,
});

export const QuestProvider = ({ worldData, shiftDuration, children }) => {
  const [selectedWorld, setSelectedWorld] = React.useState(null);
  const [worldShifted, setWorldShifted] = React.useState(false);

  const [selectedLevel, setSelectedLevel] = React.useState(null);
  const [levelShifted, setLevelShifted] = React.useState(false);

  const switchWorld = (nextWorld) => {
    if (selectedLevel) {
      setLevelShifted(false);
      setTimeout(() => {
        setSelectedLevel(null);
        setWorldShifted(false);
        setTimeout(() => setSelectedWorld(nextWorld), shiftDuration);
      }, shiftDuration);
    } else {
      setWorldShifted(false);
      setTimeout(() => setSelectedWorld(nextWorld), shiftDuration);
    }
  };

  const handleWorldClick = (world) => {
    if (!selectedWorld) {
      setSelectedWorld(world);
    } else if (selectedWorld !== world) {
      switchWorld(world);
    }
  };

  const closeWorld = () => {
    switchWorld(null);
  };

  React.useEffect(() => {
    if (selectedWorld) {
      setWorldShifted(true);
    }
  }, [selectedWorld]);

  const handleLevelClick = (levelName) => {
    if (!selectedLevel) {
      setSelectedLevel(levelName);
    } else if (selectedLevel !== levelName) {
      setLevelShifted(false);
      setTimeout(() => setSelectedLevel(levelName), shiftDuration);
    }
  };

  const closeLevel = () => {
    setLevelShifted(false);
    setTimeout(() => setSelectedLevel(null), shiftDuration);
  };

  React.useEffect(() => {
    if (selectedLevel) {
      setLevelShifted(true);
    }
  }, [selectedLevel]);

  return (
    <QuestContext.Provider
      value={{
        worldData,
        shiftDuration,
        selectedWorld,
        worldShifted,
        selectedLevel,
        levelShifted,
        closeLevel,
        handleLevelClick,
        closeWorld,
        handleWorldClick,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

QuestProvider.propTypes = {
  worldData: PropTypes.object,
  shiftDuration: PropTypes.number,
  children: PropTypes.node,
};
