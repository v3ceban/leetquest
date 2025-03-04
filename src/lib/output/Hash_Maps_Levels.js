
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Hash Maps"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Set_Basics = await prisma.level.create({
  data: {
      title: "Set Basics",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "I",
      x_position: 20,
      y_position: 20,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Contains_Duplicate = await prisma.level.create({
  data: {
      title: "Contains Duplicate",
      description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 20,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/contains-duplicate/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Missing_Number = await prisma.level.create({
  data: {
      title: "Missing Number",
      description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 120,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/missing-number/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_All_Numbers_Disappeared_in_an_Array = await prisma.level.create({
  data: {
      title: "Find All Numbers Disappeared in an Array",
      description: "Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 220,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Valid_Sudoku = await prisma.level.create({
  data: {
      title: "Valid Sudoku",
      description: "Given a 9x9 Sudoku board, determine if it is valid. A valid sudoku board must have the digits 1 through 9 in each row, column, and 3x3 box without repetition.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 220,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/valid-sudoku/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Set_Conversion = await prisma.level.create({
  data: {
      title: "Set Conversion",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 320,
      y_position: 120,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Jewels_and_Stones = await prisma.level.create({
  data: {
      title: "Jewels and Stones",
      description: "Given 2 strings, jewels and stones, determine how many of the stones you have are also jewels.",
      type: "PROBLEM",
      color: "GREEN",
      name: "4",
      x_position: 420,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/jewels-and-stones/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Set_Operations = await prisma.level.create({
  data: {
      title: "Set Operations",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 220,
      y_position: 220,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Intersection_of_Two_Arrays = await prisma.level.create({
  data: {
      title: "Intersection of Two Arrays",
      description: "Given two integer arrays nums1 and nums2, return an array of their intersection, the distinct elements that appear in both arrays.",
      type: "PROBLEM",
      color: "GREEN",
      name: "5",
      x_position: 320,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/intersection-of-two-arrays/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Map_Basics = await prisma.level.create({
  data: {
      title: "Map Basics",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IV",
      x_position: 320,
      y_position: 320,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Map_Counting = await prisma.level.create({
  data: {
      title: "Map Counting",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "V",
      x_position: 320,
      y_position: 420,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Majority_Element = await prisma.level.create({
  data: {
      title: "Majority Element",
      description: "Given an array nums of size n, return the majority element.",
      type: "PROBLEM",
      color: "GREEN",
      name: "6",
      x_position: 420,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/majority-element/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Majority_Element_II = await prisma.level.create({
  data: {
      title: "Majority Element II",
      description: "Given an array nums of size n, return all elements that appear at least a third of the time.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "7",
      x_position: 520,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/majority-element-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Top_K_Frequent_Elements = await prisma.level.create({
  data: {
      title: "Top K Frequent Elements",
      description: "Given an integer array nums and an integer k, return the k most frequent elements.",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 620,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/top-k-frequent-elements/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Map_Comparison = await prisma.level.create({
  data: {
      title: "Map Comparison",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "VI",
      x_position: 420,
      y_position: 520,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Valid_Anagram = await prisma.level.create({
  data: {
      title: "Valid Anagram",
      description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      type: "PROBLEM",
      color: "GREEN",
      name: "8",
      x_position: 420,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/valid-anagram/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Intersection_of_Two_Arrays_II = await prisma.level.create({
  data: {
      title: "Intersection of Two Arrays II",
      description: "Given two integer arrays nums1 and nums2, return an array of their intersection, ALL the elements that appear in both arrays.",
      type: "PROBLEM",
      color: "GREEN",
      name: "9",
      x_position: 320,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Ransom_Note = await prisma.level.create({
  data: {
      title: "Ransom Note",
      description: "Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.",
      type: "PROBLEM",
      color: "GREEN",
      name: "10",
      x_position: 420,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/ransom-note/description/",
      world: { connect: { id: _world.id } }
  }
});

const _String_Mapping = await prisma.level.create({
  data: {
      title: "String Mapping",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "VII",
      x_position: 520,
      y_position: 720,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Isomorphic_Strings = await prisma.level.create({
  data: {
      title: "Isomorphic Strings",
      description: "“Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "11",
      x_position: 620,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/isomorphic-strings/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Word_Pattern = await prisma.level.create({
  data: {
      title: "Word Pattern",
      description: "Given a pattern and a string s, find if s follows the same pattern. s follows the pattern if the characters in pattern can be replaced with words to get s.",
      type: "PROBLEM",
      color: "GREEN",
      name: "12",
      x_position: 620,
      y_position: 820,
      leetcode_url: "https://leetcode.com/problems/word-pattern/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Group_Anagrams = await prisma.level.create({
  data: {
      title: "Group Anagrams",
      description: "“Given an array of strings strs, group the anagrams together.“",
      type: "BONUS",
      color: "YELLOW",
      name: "C",
      x_position: 620,
      y_position: 920,
      leetcode_url: "https://leetcode.com/problems/group-anagrams/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Index_Mapping = await prisma.level.create({
  data: {
      title: "Index Mapping",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "VIII",
      x_position: 720,
      y_position: 720,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Contains_Duplicate_II = await prisma.level.create({
  data: {
      title: "Contains Duplicate II",
      description: "Given an integer array nums and an integer k, return true if any value appears at least twice in the array within k indices from each other, and false otherwise.",
      type: "PROBLEM",
      color: "GREEN",
      name: "13",
      x_position: 820,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/contains-duplicate-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Two_Sum = await prisma.level.create({
  data: {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return the indices of two numbers that add up to target.",
      type: "PROBLEM",
      color: "GREEN",
      name: "14",
      x_position: 920,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/two-sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Preset_Mapping = await prisma.level.create({
  data: {
      title: "Preset Mapping",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IX",
      x_position: 920,
      y_position: 820,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Roman_to_Integer = await prisma.level.create({
  data: {
      title: "Roman to Integer",
      description: "Given a roman numeral, convert it to an integer.",
      type: "PROBLEM",
      color: "GREEN",
      name: "15",
      x_position: 920,
      y_position: 920,
      leetcode_url: "https://leetcode.com/problems/roman-to-integer/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Integer_to_Roman = await prisma.level.create({
  data: {
      title: "Integer to Roman",
      description: "Given an integer, convert it to a roman numeral.",
      type: "BONUS",
      color: "YELLOW",
      name: "D",
      x_position: 1020,
      y_position: 920,
      leetcode_url: "https://leetcode.com/problems/integer-to-roman/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Integer_to_English_Words = await prisma.level.create({
  data: {
      title: "Integer to English Words",
      description: "Convert a non-negative integer num to its English words representation.",
      type: "BONUS",
      color: "RED",
      name: "E",
      x_position: 920,
      y_position: 1020,
      leetcode_url: "https://leetcode.com/problems/integer-to-english-words/description/",
      world: { connect: { id: _world.id } }
  }
});

const _A_Message = await prisma.level.create({
  data: {
      title: "A Message",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "X",
      x_position: 1020,
      y_position: 1020,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Contains_Duplicate.id },
    data: {
        prerequisites: { connect: [{ id: _Set_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Missing_Number.id },
    data: {
        prerequisites: { connect: [{ id: _Contains_Duplicate.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_All_Numbers_Disappeared_in_an_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Missing_Number.id }] }
    }
});
await prisma.level.update({
    where: { id: _Valid_Sudoku.id },
    data: {
        prerequisites: { connect: [{ id: _Find_All_Numbers_Disappeared_in_an_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Set_Conversion.id },
    data: {
        prerequisites: { connect: [{ id: _Find_All_Numbers_Disappeared_in_an_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Jewels_and_Stones.id },
    data: {
        prerequisites: { connect: [{ id: _Set_Conversion.id }] }
    }
});
await prisma.level.update({
    where: { id: _Set_Operations.id },
    data: {
        prerequisites: { connect: [{ id: _Find_All_Numbers_Disappeared_in_an_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Intersection_of_Two_Arrays.id },
    data: {
        prerequisites: { connect: [{ id: _Set_Operations.id }] }
    }
});
await prisma.level.update({
    where: { id: _Map_Basics.id },
    data: {
        prerequisites: { connect: [{ id: _Intersection_of_Two_Arrays.id }] }
    }
});
await prisma.level.update({
    where: { id: _Map_Counting.id },
    data: {
        prerequisites: { connect: [{ id: _Map_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Majority_Element.id },
    data: {
        prerequisites: { connect: [{ id: _Map_Counting.id }] }
    }
});
await prisma.level.update({
    where: { id: _Majority_Element_II.id },
    data: {
        prerequisites: { connect: [{ id: _Majority_Element.id }] }
    }
});
await prisma.level.update({
    where: { id: _Top_K_Frequent_Elements.id },
    data: {
        prerequisites: { connect: [{ id: _Majority_Element_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Map_Comparison.id },
    data: {
        prerequisites: { connect: [{ id: _Majority_Element.id }] }
    }
});
await prisma.level.update({
    where: { id: _Valid_Anagram.id },
    data: {
        prerequisites: { connect: [{ id: _Map_Comparison.id }] }
    }
});
await prisma.level.update({
    where: { id: _Intersection_of_Two_Arrays_II.id },
    data: {
        prerequisites: { connect: [{ id: _Valid_Anagram.id }] }
    }
});
await prisma.level.update({
    where: { id: _Ransom_Note.id },
    data: {
        prerequisites: { connect: [{ id: _Valid_Anagram.id }] }
    }
});
await prisma.level.update({
    where: { id: _String_Mapping.id },
    data: {
        prerequisites: { connect: [{ id: _Ransom_Note.id }] }
    }
});
await prisma.level.update({
    where: { id: _Isomorphic_Strings.id },
    data: {
        prerequisites: { connect: [{ id: _String_Mapping.id }] }
    }
});
await prisma.level.update({
    where: { id: _Word_Pattern.id },
    data: {
        prerequisites: { connect: [{ id: _Isomorphic_Strings.id }] }
    }
});
await prisma.level.update({
    where: { id: _Group_Anagrams.id },
    data: {
        prerequisites: { connect: [{ id: _Word_Pattern.id }] }
    }
});
await prisma.level.update({
    where: { id: _Index_Mapping.id },
    data: {
        prerequisites: { connect: [{ id: _Isomorphic_Strings.id }] }
    }
});
await prisma.level.update({
    where: { id: _Contains_Duplicate_II.id },
    data: {
        prerequisites: { connect: [{ id: _Index_Mapping.id }] }
    }
});
await prisma.level.update({
    where: { id: _Two_Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Contains_Duplicate_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Preset_Mapping.id },
    data: {
        prerequisites: { connect: [{ id: _Two_Sum.id }] }
    }
});
await prisma.level.update({
    where: { id: _Roman_to_Integer.id },
    data: {
        prerequisites: { connect: [{ id: _Preset_Mapping.id }] }
    }
});
await prisma.level.update({
    where: { id: _Integer_to_Roman.id },
    data: {
        prerequisites: { connect: [{ id: _Roman_to_Integer.id }] }
    }
});
await prisma.level.update({
    where: { id: _Integer_to_English_Words.id },
    data: {
        prerequisites: { connect: [{ id: _Roman_to_Integer.id }] }
    }
});
await prisma.level.update({
    where: { id: _A_Message.id },
    data: {
        prerequisites: { connect: [{ id: _Integer_to_English_Words.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Set_Basics.id},
                    {id: _Contains_Duplicate.id},
                    {id: _Missing_Number.id},
                    {id: _Find_All_Numbers_Disappeared_in_an_Array.id},
                    {id: _Valid_Sudoku.id},
                    {id: _Set_Conversion.id},
                    {id: _Jewels_and_Stones.id},
                    {id: _Set_Operations.id},
                    {id: _Intersection_of_Two_Arrays.id},
                    {id: _Map_Basics.id},
                    {id: _Map_Counting.id},
                    {id: _Majority_Element.id},
                    {id: _Majority_Element_II.id},
                    {id: _Top_K_Frequent_Elements.id},
                    {id: _Map_Comparison.id},
                    {id: _Valid_Anagram.id},
                    {id: _Intersection_of_Two_Arrays_II.id},
                    {id: _Ransom_Note.id},
                    {id: _String_Mapping.id},
                    {id: _Isomorphic_Strings.id},
                    {id: _Word_Pattern.id},
                    {id: _Group_Anagrams.id},
                    {id: _Index_Mapping.id},
                    {id: _Contains_Duplicate_II.id},
                    {id: _Two_Sum.id},
                    {id: _Preset_Mapping.id},
                    {id: _Roman_to_Integer.id},
                    {id: _Integer_to_Roman.id},
                    {id: _Integer_to_English_Words.id},
                    {id: _A_Message.id}],
      },
  },
});
