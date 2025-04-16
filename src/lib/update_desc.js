import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

// Settings
let levels = [
    "Set Basics",
    "Set Conversion",
    "Set Operations",]
let fileNames = [
    "set_basics.html",
    "set_conversion.html",
    "set_operations.html",]
// do some processing to get levelId you're already doing

// Loop through and update each level
for (let i = 0; i < levels.length; i++) {

let levelId = await prisma.level.findFirst({
    where: {
        title: levels[i],
    },
});

const htmlFilePath = path.join(process.cwd(), "src/lib/levels/", fileNames[i]);
const description = fs.readFileSync(htmlFilePath, "utf-8").replace(/\r?\n/g, ""); // need to delete new lines for it to be a proper string

await prisma.level.update({
    where: {
        id: levelId.id,
    },
    data: {
        description,
    },
});
}



// await prisma.level.update({
//     where: {
//         id: _Set_Basics.id,
//     },
//     data: {
//         description: "<h2>What is a Hash Set?</h2><p>A hash set is an unordered collection (set) of elements.</p><ul><li>A hash set has no indices. To refer to an element, you have to know the name of the element itself.</li><li>A hash set has no duplicates. If you try to add a duplicate to a set, the set will not be affected.</li></ul><h2>Basic Syntax</h2><p>Initializing a Hash Set:</p><ul><li>Empty Set: <code class=\"bg-gray-600 p-1 rounded\">hash_set = set()</code></li><li>Non-Empty Set: <code class=\"bg-gray-600 p-1 rounded\">hash_set = {'{1, 2, 3}'}</code></li></ul><p>Adding to a Hash Set:</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">hash_set.add(4)</code></li></ul><p>Removing from a Hash Set:</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">hash_set.remove(2)</code></li></ul><p>Checking if Element in Hash Set:</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">if 3 in hash_map:</code></li></ul><h2>Set Operations</h2><p>Set Union: All elements in set1 <span class=\"!bg-red-500\">OR</span> set2</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">set3 = set1 | set2</code></li></ul><p>Set Intersection: All elements in set1 AND set2</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">set3 = set1 & set2</code></li></ul><p>Set Difference: All elements in set1 that are NOT in set2</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">set3 = set1 - set2</code></li></ul><p>Set Exclusive Union: All elements ONLY in set1 OR set2</p><ul><li><code class=\"bg-gray-600 p-1 rounded\">set3 = set1 ^ set2</code></li></ul>",
//     },
// });