"use client";

import React from "react";
import PropTypes from "prop-types";
import worldsData from "@/data/worlds.json";
import arrayWorldData from "@/data/worlds/array.json";

const SHIFT_DURATION = 200;

const QuestContext = React.createContext({});

const QuestProvider = ({ children }) => {
  const [worldData, setWorldData] = React.useState({
      Worlds: worldsData,
      Array: arrayWorldData,
      // "Hashing": hashingWorldData
    });

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
        setTimeout(() => setSelectedWorld(nextWorld), SHIFT_DURATION);
      }, SHIFT_DURATION);
    } else {
      setWorldShifted(false);
      setTimeout(() => setSelectedWorld(nextWorld), SHIFT_DURATION);
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
      setTimeout(() => setSelectedLevelName(levelName), SHIFT_DURATION);
    }
  };

  const closeLevel = () => {
    setLevelShifted(false);
    setTimeout(() => setSelectedLevelName(null), SHIFT_DURATION);
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
  children: PropTypes.node,
};

export { QuestContext, QuestProvider };