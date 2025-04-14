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

  const [levelFull, setLevelFull] = React.useState(false);
  const [descriptionFull, setDescriptionFull] = React.useState(false);

  React.useEffect(function setWorldFromURL() {
    const params = new URLSearchParams(location.search);
    const worldParam = params.get("world");
    const levelParam = params.get("level");

    if (worldParam) {
      const world = initialWorldsData.find((w) => w.id === worldParam);
      if (world) {
        setSelectedWorld(world.name);
        updateSelectedWorldData(world.name);
      }
    }

    if (levelParam) {
      setSelectedLevelName(levelParam);
    }
  }, []);

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

    const params = new URLSearchParams(location.search);
    params.set("world", world.id);
    history.replaceState({}, "", `${location.pathname}?${params}`);

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
    const params = new URLSearchParams(location.search);
    params.delete("world");
    params.delete("level");
    history.replaceState({}, "", `${location.pathname}?${params}`);
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
    const params = new URLSearchParams(location.search);
    params.set("level", levelName);
    history.replaceState({}, "", `${location.pathname}?${params}`);
  };

  const closeLevel = () => {
    setLevelShifted(false);
    setTimeout(() => setSelectedLevelName(null), shiftDuration);
    const params = new URLSearchParams(location.search);
    params.delete("level");
    history.replaceState({}, "", `${location.pathname}?${params}`);
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
        levelFull,
        setLevelFull,
        descriptionFull,
        setDescriptionFull,
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
