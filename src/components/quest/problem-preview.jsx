"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";
import { QuestContext } from "@/components/quest/context";
import { WorldNode } from "@/components/quest/world";
import { setLevelComplete } from "@/components/quest/fetch-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Play } from "lucide-react";
import LevelDescription from "@/components/quest/level-description";
import {
  ButtonsContainer,
  CloseButton,
  ManualButton,
  ResizeButton,
} from "@/components/quest/quest";

const ProblemPreview = () => {
  const {
    selectedWorldData,
    selectedLevelName,
    setWorldsData,
    setSelectedWorldData,
    closeLevel,
    descriptionFull,
    setDescriptionFull,
    manualOpen,
    setManualOpen,
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
    ) {
      return;
    }
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
    <section className="flex overflow-scroll relative flex-col gap-4 h-full">
      <header className="flex sticky top-0 z-10 flex-row gap-4 items-center p-4 border-b border-[--surface-2] bg-[var(--surface-1)]">
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
          />
        )}
        <h2 className="w-2/3 text-2xl font-semibold">
          {selectedLevelData.title}
        </h2>
        <ButtonsContainer className="top-1/2 -translate-y-1/2">
          <ManualButton
            open={manualOpen}
            onClick={() => setManualOpen((prev) => !prev)}
          />
          <ResizeButton
            onClick={() => setDescriptionFull((prev) => !prev)}
            open={descriptionFull}
            className="hidden md:flex"
          />
          <CloseButton onClick={closeLevel} />
        </ButtonsContainer>
      </header>

      <LevelDescription
        rawHtml={selectedLevelData.description}
        className="px-4 md:overflow-scroll prose prose-invert"
      />

      <footer
        className={cn(
          "grid gap-4 mx-auto mt-auto w-full max-w-xl p-4 border-t border-[--surface-2]",
          selectedLevelData.leetcode_url && "lg:grid-cols-2 grid-cols-1",
        )}
      >
        <Button
          onClick={handleCompleteClick}
          className="bg-foreground text-background"
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
              <CheckCircle2 className="mr-2 w-5 h-5" />
              Completed
            </>
          ) : (
            <>
              <Circle className="mr-2 w-5 h-5" />
              Mark Complete
            </>
          )}
        </Button>
        {selectedLevelData.leetcode_url && (
          <Button
            onClick={() => handleLeetCodeClick(selectedLevelData.leetcode_url)}
            className="bg-foreground text-background"
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
      </footer>
    </section>
  );
};

export default ProblemPreview;
