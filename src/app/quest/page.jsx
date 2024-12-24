import React from "react";
import { QuestProvider } from "@/components/quest/context";
import { QuestArrows } from "@/components/arrow";
import { World, WorldNode } from "@/components/quest/world";
import { Levels } from "@/components/quest/levels";

// eventually this data will be fetched from db (hence made function async) - VLAD
import worldsData from "@/data/worlds.json";
import arrayWorldData from "@/data/worlds/array.json";
// import hashingWorldData from '@/data/worlds/hashing.json';

export default async function QuestPage() {
  const SHIFT_DURATION = 200;
  const worldData = {
    Worlds: worldsData,
    Array: arrayWorldData,
    // "Hashing": hashingWorldData
  };

  return (
    <main className="relative overflow-hidden max-h-[calc(100dvh-104px-20px)] bg-[--overlay] rounded-xl">
      <QuestProvider worldData={worldData} shiftDuration={SHIFT_DURATION}>
        {/* TODO: Breadcumbs */}
        <Levels />
        <World title={"Worlds"}>
          {Object.entries(worldData["Worlds"]).map(([name, { x, y }]) => (
            <WorldNode
              key={name}
              type="world"
              name={name}
              x={x}
              y={y}
              value={name}
              isAPreview={false}
            />
          ))}
          {worldData["Worlds"] && (
            <QuestArrows data={worldData["Worlds"]} isAWorld={true} />
          )}
        </World>
      </QuestProvider>
    </main>
  );
}
