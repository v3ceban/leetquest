"use client";

import React from "react";
import PropTypes from "prop-types";
import { fetchWorldsData, fetchSelectedWorldData } from "@/components/quest/fetch-data";

const shiftDuration = 200;

let fetchedSelectedWorld = null;

const QuestContext = React.createContext({});

const QuestProvider = ({ children }) => {
  const [worldsData, setWorldsData] = React.useState([]);
  const [selectedWorldData, setSelectedWorldData] = React.useState([]);

  const [selectedWorld, setSelectedWorld] = React.useState(null);
  const [worldShifted, setWorldShifted] = React.useState(false);

  const [selectedLevelName, setSelectedLevelName] = React.useState(null);
  const [levelShifted, setLevelShifted] = React.useState(false);

  React.useEffect(() => {
    const fetchAndSetWorldsData = async () => setWorldsData(await fetchWorldsData());
    fetchAndSetWorldsData();
  }, []);

  const fetchAndSetSelectedWorldData = async () => {
    fetchedSelectedWorld = selectedWorld;
    return setSelectedWorldData(selectedWorld ? await fetchSelectedWorldData(worldsData, selectedWorld) : []);
  };

  const switchWorld = (nextWorld) => {
    if (selectedLevelName) {
      setLevelShifted(false);
      setTimeout(() => {
        setSelectedLevelName(null);
        setWorldShifted(false);
        setTimeout(() => {
          // can optimize by fetching before it's done shifting
          setSelectedWorldData([]);
          fetchedSelectedWorld = null;
          setSelectedWorld(nextWorld);
        }, shiftDuration);
      }, shiftDuration);
    } else {
      setWorldShifted(false);
      setTimeout(() => {
        setSelectedWorldData([]);
        fetchedSelectedWorld = null;
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
      if (selectedWorld !== fetchedSelectedWorld) {
        fetchAndSetSelectedWorldData();
      }
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
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

QuestProvider.propTypes = {
  selectedWorldData: PropTypes.object,
  children: PropTypes.node,
};

export { QuestContext, QuestProvider };