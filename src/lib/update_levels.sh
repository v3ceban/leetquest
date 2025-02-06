#!/bin/bash

#Run the following:
    #chmod +x src/lib/update_levels.sh
    #src/lib/update_levels.sh

python src/lib/generate.py
echo "Finished running generate.py"

node src/lib/output/Hash_Maps_Levels.js
echo "Finished running Hash_Maps_Levels.js"

node src/lib/output/Stacks_Levels.js
echo "Finished running Stacks_Levels.js"

node src/lib/output/Two_Pointers_Levels.js
echo "Finished running Two_Pointers_Levels.js"

node src/lib/output/Sliding_Window_Levels.js
echo "Finished running Sliding_Window_Levels.js"

node src/lib/output/Binary_Search_Levels.js
echo "Finished running Binary_Search_Levels.js"

node src/lib/output/Linked_Lists_Levels.js
echo "Finished running Linked_Lists_Levels.js"

node src/lib/output/Trees_Levels.js
echo "Finished running Trees_Levels.js"

node src/lib/output/Graphs_Levels.js
echo "Finished running Graphs_Levels.js"

node src/lib/output/Heaps_Levels.js
echo "Finished running Heaps_Levels.js"

node src/lib/output/Backtracking_Levels.js
echo "Finished running Backtracking_Levels.js"

node src/lib/output/Dynamic_Programming_Levels.js
echo "Finished running Dynamic_Programming_Levels.js"