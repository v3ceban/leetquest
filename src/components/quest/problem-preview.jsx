import React from 'react';
import { QuestContext } from "@/components/quest/context";
import { WorldNode } from "@/components/quest/world";

const ProblemPreview = () => {
    const {
        worldData,
        selectedWorld,
        selectedLevelName,
    } = React.useContext(QuestContext);

    const selectedLevelData = selectedWorld && selectedLevelName ? worldData[selectedWorld][selectedLevelName] : null;

    return (
        <div className="flex flex-col gap-4 p-4 h-full">
            <div className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0">
                    {selectedLevelData && (
                        <WorldNode
                            key={selectedLevelName}
                            type="level"
                            name={selectedLevelName}
                            levelColor={selectedLevelData.color}
                            x={0}
                            y={0}
                            value={selectedLevelData.level}
                            isAPreview={true}
                        />
                    )}
                </div>
                <h2 className="text-2xl">{selectedLevelData.title}</h2>
            </div>
            <p>{selectedLevelData.description}</p>
            <div className="flex justify-center mt-auto">
                <button className="rounded-lg bg-foreground text-background px-4 py-2 w-fit">
                    Start
                </button>
            </div>
        </div>
    );
};

export default ProblemPreview;