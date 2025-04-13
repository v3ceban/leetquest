"use client";

import React from "react";
import PropTypes from "prop-types";

const shiftDuration = 300;

const QuestContext = React.createContext({});

const QuestProvider = ({ children, initialWorldsData }) => {
  const [worldsData, setWorldsData] = React.useState(initialWorldsData);
  const [selectedWorldData, setSelectedWorldData] = React.useState([]);

  const [selectedWorld, setSelectedWorld] = React.useState(null);
  const [worldShifted, setWorldShifted] = React.useState(false);

  const [selectedLevelName, setSelectedLevelName] = React.useState(null);
  const [levelShifted, setLevelShifted] = React.useState(false);

  const updateSelectedWorldData = (worldName) => {
    if (!worldName) {
      setSelectedWorldData([]);
      return;
    }

    const world = worldsData.find((w) => w.name === worldName);
    if (!world) return;

    const levelsData = world.levels.map((level) => ({
      ...level,
      user_id: level.user_levels[0]?.user_id,
      status: level.user_levels[0]?.status || "INCOMPLETE",
      unlocked: level.user_levels[0]?.unlocked || false,
      isWorldUnlocked: world.user_world[0]?.unlocked || false,
    }));

    setSelectedWorldData(levelsData);
  };

  const switchWorld = (nextWorld) => {
    if (selectedLevelName) {
      setLevelShifted(false);
      setTimeout(() => {
        setSelectedLevelName(null);
        setWorldShifted(false);
        setTimeout(() => {
          setSelectedWorldData([]);
          setSelectedWorld(nextWorld);
        }, shiftDuration);
      }, shiftDuration);
    } else {
      setWorldShifted(false);
      setTimeout(() => {
        setSelectedWorld(nextWorld);
      }, shiftDuration);
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
      updateSelectedWorldData(selectedWorld);
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
        worldsData,
        selectedWorldData,
        shiftDuration,
        selectedWorld,
        worldShifted,
        selectedLevelName,
        levelShifted,
        closeLevel,
        handleLevelClick,
        closeWorld,
        handleWorldClick,
        setWorldsData,
        setSelectedWorldData,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

QuestProvider.propTypes = {
  initialWorldsData: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export { QuestContext, QuestProvider };
