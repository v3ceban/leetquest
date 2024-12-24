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

  const [selectedLevelName, setSelectedLevelName] = React.useState(null);
  const [levelShifted, setLevelShifted] = React.useState(false);

  const switchWorld = (nextWorld) => {
    if (selectedLevelName) {
      setLevelShifted(false);
      setTimeout(() => {
        setSelectedLevelName(null);
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
    if (!selectedLevelName) {
      setSelectedLevelName(levelName);
    } else if (selectedLevelName !== levelName) {
      setLevelShifted(false);
      setTimeout(() => setSelectedLevelName(levelName), shiftDuration);
    }
  };

  const closeLevel = () => {
    setLevelShifted(false);
    setTimeout(() => setSelectedLevelName(null), shiftDuration);
  };

  React.useEffect(() => {
    if (selectedLevelName) {
      setLevelShifted(true);
    }
  }, [selectedLevelName]);

  return (
    <QuestContext.Provider
      value={{
        worldData,
        shiftDuration,
        selectedWorld,
        worldShifted,
        selectedLevelName,
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
