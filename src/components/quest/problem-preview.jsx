"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";
import { QuestContext } from "@/components/quest/context";
import { WorldNode } from "@/components/quest/world";
import { setLevelComplete } from "./fetch-data";

const ProblemPreview = () => {
  const {
    selectedWorldData,
    selectedLevelName,
    setWorldsData,
    setSelectedWorldData,
    closeLevel,
  } = React.useContext(QuestContext);
  const [loading, setLoading] = React.useState(false);

  // if needed, can implement a more efficient way to find the level e.g. by querying the database again or using a map
  const selectedLevelData =
    selectedWorldData && selectedLevelName
      ? selectedWorldData.find(({ name }) => name === selectedLevelName)
      : null;

  const handleStartClick = async () => {
    if (!selectedLevelData || loading) return;
    setLoading(true);
    try {
      const { worldsData, selectedWorldData } =
        await setLevelComplete(selectedLevelData);
      setWorldsData(worldsData);
      setSelectedWorldData(selectedWorldData);
      closeLevel();
    } catch (error) {
      console.error("Error setting level complete:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex flex-row gap-4 items-center">
        <div className="flex-shrink-0">
          {selectedLevelData && (
            <WorldNode
              key={selectedLevelName}
              isAWorld={true}
              name={selectedLevelName}
              color={selectedLevelData.color}
              x={0}
              y={0}
              value={selectedLevelName}
              isAPreview={true}
            />
          )}
        </div>
        <h2 className="w-2/3 text-2xl">{selectedLevelData.title}</h2>
      </div>
      <p>{selectedLevelData.description}</p>
      <div className="flex justify-center mt-auto">
        <Button
          onClick={handleStartClick}
          className="py-2 px-4 rounded-lg bg-foreground text-background w-fit"
          disabled={loading}
        >
          {loading ? <Loading /> : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default ProblemPreview;
