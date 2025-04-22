import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

// Settings
let hash_map_levels = [
    "Set Basics",
    "Set Conversion",
    "Set Operations",
    "Map Basics",
    "Map Counting",
    "Map Comparison",
    "String Mapping",
    "Index Mapping",
    "Preset Mapping",
    "A Message",
    "Contains Duplicate",
    "Missing Number",
    "Find All Numbers Disappeared in an Array",
    "Jewels and Stones",
    "Intersection of Two Arrays",
    "Majority Element",
    "Majority Element II",
    "Valid Anagram",
    "Intersection of Two Arrays II",
    "Ransom Note",
    "Isomorphic Strings",
    "Word Pattern",
    "Contains Duplicate II",
    "Two Sum",
    "Roman to Integer",
    "Valid Sudoku",
    "Top K Frequent Elements",
    "Group Anagrams",
    "Integer to Roman",
    "Integer to English Words",]
let hash_map_file_names = [
    "set_basics.html",
    "set_conversion.html",
    "set_operations.html",
    "map_basics.html",
    "map_counting.html",
    "map_comparison.html",
    "string_mapping.html",
    "index_mapping.html",
    "preset_mapping.html",
    "a_message.html",
    "contains_duplicate.html",
    "missing_number.html",
    "find_all_numbers_disappeared_in_an_array.html",
    "jewels_and_stones.html",
    "intersection_of_two_arrays.html",
    "majority_element.html",
    "majority_element_ii.html",
    "valid_anagram.html",
    "intersection_of_two_arrays_ii.html",
    "ransom_note.html",
    "isomorphic_strings.html",
    "word_pattern.html",
    "contains_duplicate_ii.html",
    "two_sum.html",
    "roman_to_integer.html",
    "valid_sudoku.html",
    "top_k_frequent_elements.html",
    "group_anagrams.html",
    "integer_to_roman.html",
    "integer_to_english_words.html",];
let stack_levels = [
    "Stack Basics",
    "Tracking Depth",
    "Stack Reversal",
    "Monotonic Stack",
    "Valid Parentheses",
    "Remove All Adjacent Duplicates In String",
    "Minimum String Length After Removing Substrings",
    "Backspace String Compare",
    "Baseball Game",
    "Evaluate Reverse Polish Notation",
    "Asteroid Collision",
    "Maximum Nesting Depth of the Parentheses",
    "Crawler Log Folder",
    "Reverse Prefix of Word",
    "Minimum Add to Make Parentheses Valid",
    "Minimum Remove to Make Valid Parentheses",
    "Score of Parentheses",
    "Decode String",
    "Longest Valid Parentheses",
    "Next Greater Element I",
    "Final Prices With a Special Discount in a Shop",
    "Remove K Digits",
    "Daily Temperatures",
    "Maximum Width Ramp",
    "Largest Rectangle in Histogram",];
let stack_file_names = [
    "stack_basics.html",
    "tracking_depth.html",
    "stack_reversal.html",
    "monotonic_stack.html",
    "valid_parentheses.html",
    "remove_all_adjacent_duplicates_in_string.html",
    "minimum_string_length_after_removing_substrings.html",
    "backspace_string_compare.html",
    "baseball_game.html",
    "evaluate_reverse_polish_notation.html",
    "asteroid_collision.html",
    "maximum_nesting_depth_of_the_parentheses.html",
    "crawler_log_folder.html",
    "reverse_prefix_of_word.html",
    "minimum_add_to_make_parentheses_valid.html",
    "minimum_remove_to_make_valid_parentheses.html",
    "score_of_parentheses.html",
    "decode_string.html",
    "longest_valid_parentheses.html",
    "next_greater_element_i.html",
    "final_prices_with_a_special_discount_in_a_shop.html",
    "remove_k_digits.html",
    "daily_temperatures.html",
    "maximum_width_ramp.html",
    "largest_rectangle_in_histogram.html",];
let two_pointers_levels = [
    "Two Pointers Basics",
    "Checking and Swapping",
    "Reordering by Swapping",
    "Two Structures",
    "Advanced Checking",
    "Reverse String",
    "Reverse Vowels of a String",
    "Reverse Words in a String",
    "Sort Array by Parity",
    "Sort Array by Parity II",
    "Sort Colors",
    "Move Zeros",
    "Remove Element",
    "Remove Duplicates from Sorted Array",
    "Is Subsequence",
    "Find the Index of the First Occurrence in a String",
    "Compare Version Number",
    "Merge Sorted Array",
    "Assign Cookies",
    "Shortest Distance to a Character",
    "Valid Palindrome",
    "Two Sum II - Input Array is Sorted",
    "3Sum",
    "4Sum",
    "Container With Most Water",
    "Trapping Rain Water",];

let two_pointers_file_names = [
    "two_pointers_basics.html",
    "checking_and_swapping.html",
    "reordering_by_swapping.html",
    "two_structures.html",
    "advanced_checking.html",
    "reverse_string.html",
    "reverse_vowels_of_a_string.html",
    "reverse_words_in_a_string.html",
    "sort_array_by_parity.html",
    "sort_array_by_parity_ii.html",
    "sort_colors.html",
    "move_zeroes.html",
    "remove_element.html",
    "remove_duplicates_from_sorted_array.html",
    "is_subsequence.html",
    "find_the_index_of_the_first_occurrence_in_a_string.html",
    "compare_version_number.html",
    "merge_sorted_array.html",
    "assign_cookies.html",
    "shortest_distance_to_a_character.html",
    "valid_palindrome.html",
    "two_sum_ii_input_array_is_sorted.html",
    "3sum.html",
    "4sum.html",
    "container_with_most_water.html",
    "trapping_rain_water.html",];

let levels = two_pointers_levels;
let file_names = two_pointers_file_names;
// do some processing to get levelId you're already doing

// Loop through and update each level
for (let i = 0; i < levels.length; i++) {

let levelId = await prisma.level.findFirst({
    where: {
        title: levels[i],
    },
});
if (!levelId) {
    console.error(`Level with title ${levels[i]} not found`);
    continue; // Skip to the next iteration if levelId is not found
}

const htmlFilePath = path.join(process.cwd(), "src/lib/levels/two_pointers/", file_names[i]);
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