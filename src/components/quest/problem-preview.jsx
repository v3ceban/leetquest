"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";
import { QuestContext } from "@/components/quest/context";
import { WorldNode } from "@/components/quest/world";
import { setLevelComplete } from "./fetch-data";
import { cn } from "@/lib/utils";
import { Check, Play, SquareCheck } from "lucide-react";

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

  const handleCompleteClick = async () => {
    if (
      !selectedLevelData ||
      loading ||
      selectedLevelData.status === "COMPLETE" ||
      !selectedLevelData.unlocked
    )
      return;
    setLoading(true);
    try {
      const result = await setLevelComplete(selectedLevelData);
      setWorldsData(result.worldsData);
      setSelectedWorldData(result.selectedWorldData);
      closeLevel();
    } catch (error) {
      console.error("Error setting level complete:", error);
      setLoading(false);
    }
  };

  const handleLeetCodeClick = async (url) => {
    if (
      !selectedLevelData.unlocked ||
      !selectedLevelData.isWorldUnlocked ||
      !url
    )
      return;
    open(url, "_blank", "noreferrer");
    setLoading(false);
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
              isLevelUnlocked={selectedLevelData.unlocked}
              levelStatus={selectedLevelData.status}
              className="opacity-100"
            />
          )}
        </div>
        <h2 className="w-2/3 text-2xl">{selectedLevelData.title}</h2>
      </div>
      <div
        className="prose prose-invert overflow-scroll"
        dangerouslySetInnerHTML={{ __html: selectedLevelData.description }}
      />
      <div
        className={cn(
          "grid gap-4 mx-auto mt-auto w-fit",
          selectedLevelData.leetcode_url && "grid-cols-2",
        )}
      >
        <Button
          onClick={handleCompleteClick}
          className="w-full bg-foreground text-background"
          variant="outline"
          disabled={
            !selectedLevelData.unlocked ||
            !selectedLevelData.isWorldUnlocked ||
            loading
          }
        >
          {loading ? (
            <Loading />
          ) : selectedLevelData.status === "COMPLETE" ? (
            <>
              <SquareCheck className="mr-2 w-5 h-5" />
              Completed
            </>
          ) : (
            <>
              <Check className="mr-2 w-5 h-5" />
              Mark Complete
            </>
          )}
        </Button>
        {selectedLevelData.leetcode_url && (
          <Button
            onClick={() => handleLeetCodeClick(selectedLevelData.leetcode_url)}
            className="w-full bg-foreground text-background"
            disabled={
              !selectedLevelData.unlocked ||
              !selectedLevelData.isWorldUnlocked ||
              loading
            }
          >
            <Play className="mr-2 w-4 h-4 fill-background" />
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProblemPreview;
