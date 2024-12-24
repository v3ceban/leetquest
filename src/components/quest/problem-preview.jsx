import React from 'react';
import { QuestContext } from "@/components/quest/context";
import { WorldNode } from "@/components/quest/world";

const ProblemPreview = () => {
    const {
        worldData,
        selectedWorld,
        selectedLevel,
    } = React.useContext(QuestContext);

    const selectedLevelData = selectedWorld && selectedLevel ? worldData[selectedWorld][selectedLevel] : null;

    return (
        <div>
            <div>
                <div className="flex flex-row items-center">
                    <div className="flex-shrink-0">
                        {selectedLevelData && (
                            <WorldNode
                                key={selectedLevel}
                                type="level"
                                name={selectedLevel}
                                levelColor={selectedLevelData.color}
                                x={0}
                                y={0}
                                value={selectedLevelData.level}
                                isAPreview={true}
                            />
                        )}
                    </div>
                    <h2 className="text-2xl">{selectedLevelData.level}</h2>
                </div>
            </div>
            <p>This is the description of the problem being previewed.</p>
        </div>
    );
};

export default ProblemPreview;