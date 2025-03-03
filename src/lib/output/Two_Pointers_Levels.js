
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Two Pointers"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Two_Pointers_Basics = await prisma.level.create({
  data: {
      title: "Two Pointers Basics",
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

const _Reverse_String = await prisma.level.create({
  data: {
      title: "Reverse String",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 20,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/reverse-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Checking_and_Swapping = await prisma.level.create({
  data: {
      title: "Checking and Swapping",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 20,
      y_position: 220,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Reverse_Vowels_of_a_String = await prisma.level.create({
  data: {
      title: "Reverse Vowels of a String",
      description: "Given a string s, reverse only all the vowels in the string and return it.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 20,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/reverse-vowels-of-a-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Reverse_Words_in_a_String = await prisma.level.create({
  data: {
      title: "Reverse Words in a String",
      description: "Given an input string s, reverse the order of the words.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 20,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/reverse-words-in-a-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Reordering_by_Swapping = await prisma.level.create({
  data: {
      title: "Reordering by Swapping",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 120,
      y_position: 220,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Sort_Array_by_Parity = await prisma.level.create({
  data: {
      title: "Sort Array by Parity",
      description: "Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 120,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/sort-array-by-parity/",
      world: { connect: { id: _world.id } }
  }
});

const _Sort_Array_by_Parity_II = await prisma.level.create({
  data: {
      title: "Sort Array by Parity II",
      description: "Given an integer array nums, move all the even integers to even indices and odd integers to odd indices.",
      type: "PROBLEM",
      color: "GREEN",
      name: "4",
      x_position: 120,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/sort-array-by-parity-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Sort_Colors = await prisma.level.create({
  data: {
      title: "Sort Colors",
      description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 220,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/sort-colors/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Move_Zeros = await prisma.level.create({
  data: {
      title: "Move Zeros",
      description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
      type: "PROBLEM",
      color: "GREEN",
      name: "5",
      x_position: 120,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/sort-colors/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Element = await prisma.level.create({
  data: {
      title: "Remove Element",
      description: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.",
      type: "PROBLEM",
      color: "GREEN",
      name: "6",
      x_position: 220,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/remove-element/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Duplicates_from_Sorted_Array = await prisma.level.create({
  data: {
      title: "Remove Duplicates from Sorted Array",
      description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.",
      type: "PROBLEM",
      color: "GREEN",
      name: "7",
      x_position: 220,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Two_Structures = await prisma.level.create({
  data: {
      title: "Two Structures",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IV",
      x_position: 320,
      y_position: 620,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Is_Subsequence = await prisma.level.create({
  data: {
      title: "Is Subsequence",
      description: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise.",
      type: "PROBLEM",
      color: "GREEN",
      name: "8",
      x_position: 420,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/is-subsequence/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_the_Index_of_the_First_Occurrence_in_a_String = await prisma.level.create({
  data: {
      title: "Find the Index of the First Occurrence in a String",
      description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
      type: "PROBLEM",
      color: "GREEN",
      name: "9",
      x_position: 520,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Compare_Version_Number = await prisma.level.create({
  data: {
      title: "Compare Version Number",
      description: "Given two version strings, version1 and version2, compare them. A version string consists of revisions separated by dots '.'. The value of the revision is its integer conversion ignoring leading zeros.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "10",
      x_position: 520,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/compare-version-numbers/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Merge_Sorted_Array = await prisma.level.create({
  data: {
      title: "Merge Sorted Array",
      description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.",
      type: "PROBLEM",
      color: "GREEN",
      name: "11",
      x_position: 420,
      y_position: 720,
      leetcode_url: "https://leetcode.com/problems/merge-sorted-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Assign_Cookies = await prisma.level.create({
  data: {
      title: "Assign Cookies",
      description: "Given an integer array g representing each child’s greed factor and integer array s representing the size of a cookie, maximize the number of your content children and output the maximum number.",
      type: "PROBLEM",
      color: "GREEN",
      name: "12",
      x_position: 420,
      y_position: 820,
      leetcode_url: "https://leetcode.com/problems/assign-cookies/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Shortest_Distance_to_a_Character = await prisma.level.create({
  data: {
      title: "Shortest Distance to a Character",
      description: "Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the distance from index i to the closest occurrence of character c in s.",
      type: "PROBLEM",
      color: "GREEN",
      name: "13",
      x_position: 520,
      y_position: 820,
      leetcode_url: "https://leetcode.com/problems/shortest-distance-to-a-character/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Advanced_Checking = await prisma.level.create({
  data: {
      title: "Advanced Checking",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "V",
      x_position: 220,
      y_position: 720,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Valid_Palindrome = await prisma.level.create({
  data: {
      title: "Valid Palindrome",
      description: "Given a string s, return true if it is a palindrome, or false otherwise.",
      type: "PROBLEM",
      color: "GREEN",
      name: "14",
      x_position: 220,
      y_position: 820,
      leetcode_url: "https://leetcode.com/problems/valid-palindrome/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Two_Sum_II___Input_Array_is_Sorted = await prisma.level.create({
  data: {
      title: "Two Sum II - Input Array is Sorted",
      description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "15",
      x_position: 220,
      y_position: 920,
      leetcode_url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/",
      world: { connect: { id: _world.id } }
  }
});

const _3Sum = await prisma.level.create({
  data: {
      title: "3Sum",
      description: "Given an integer array nums, return all the triplets that sum to 0.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "16",
      x_position: 170,
      y_position: 1020,
      leetcode_url: "https://leetcode.com/problems/3sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _4Sum = await prisma.level.create({
  data: {
      title: "4Sum",
      description: "Given an integer array nums, return all the quadruplets that sum to 0.",
      type: "BONUS",
      color: "YELLOW",
      name: "C",
      x_position: 170,
      y_position: 1120,
      leetcode_url: "https://leetcode.com/problems/4sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Container_With_Most_Water = await prisma.level.create({
  data: {
      title: "Container With Most Water",
      description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "17",
      x_position: 270,
      y_position: 1020,
      leetcode_url: "https://leetcode.com/problems/container-with-most-water/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Trapping_Rain_Water = await prisma.level.create({
  data: {
      title: "Trapping Rain Water",
      description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      type: "BONUS",
      color: "RED",
      name: "D",
      x_position: 270,
      y_position: 1120,
      leetcode_url: "https://leetcode.com/problems/trapping-rain-water/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Reverse_String.id },
    data: {
        prerequisites: { connect: [{ id: _Two_Pointers_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Checking_and_Swapping.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Vowels_of_a_String.id },
    data: {
        prerequisites: { connect: [{ id: _Checking_and_Swapping.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Words_in_a_String.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Vowels_of_a_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reordering_by_Swapping.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Vowels_of_a_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Sort_Array_by_Parity.id },
    data: {
        prerequisites: { connect: [{ id: _Reordering_by_Swapping.id }] }
    }
});
await prisma.level.update({
    where: { id: _Sort_Array_by_Parity_II.id },
    data: {
        prerequisites: { connect: [{ id: _Sort_Array_by_Parity.id }] }
    }
});
await prisma.level.update({
    where: { id: _Sort_Colors.id },
    data: {
        prerequisites: { connect: [{ id: _Sort_Array_by_Parity_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Move_Zeros.id },
    data: {
        prerequisites: { connect: [{ id: _Sort_Array_by_Parity_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_Element.id },
    data: {
        prerequisites: { connect: [{ id: _Move_Zeros.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_Duplicates_from_Sorted_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Element.id }] }
    }
});
await prisma.level.update({
    where: { id: _Two_Structures.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Duplicates_from_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Is_Subsequence.id },
    data: {
        prerequisites: { connect: [{ id: _Find_the_Index_of_the_First_Occurrence_in_a_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_the_Index_of_the_First_Occurrence_in_a_String.id },
    data: {
        prerequisites: { connect: [{ id: _Is_Subsequence.id }] }
    }
});
await prisma.level.update({
    where: { id: _Compare_Version_Number.id },
    data: {
        prerequisites: { connect: [{ id: _Find_the_Index_of_the_First_Occurrence_in_a_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Merge_Sorted_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Is_Subsequence.id }] }
    }
});
await prisma.level.update({
    where: { id: _Assign_Cookies.id },
    data: {
        prerequisites: { connect: [{ id: _Merge_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Shortest_Distance_to_a_Character.id },
    data: {
        prerequisites: { connect: [{ id: _Assign_Cookies.id }] }
    }
});
await prisma.level.update({
    where: { id: _Advanced_Checking.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Duplicates_from_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Valid_Palindrome.id },
    data: {
        prerequisites: { connect: [{ id: _Advanced_Checking.id }] }
    }
});
await prisma.level.update({
    where: { id: _Two_Sum_II___Input_Array_is_Sorted.id },
    data: {
        prerequisites: { connect: [{ id: _Valid_Palindrome.id }] }
    }
});
await prisma.level.update({
    where: { id: _3Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Two_Sum_II___Input_Array_is_Sorted.id }] }
    }
});
await prisma.level.update({
    where: { id: _4Sum.id },
    data: {
        prerequisites: { connect: [{ id: _3Sum.id }] }
    }
});
await prisma.level.update({
    where: { id: _Container_With_Most_Water.id },
    data: {
        prerequisites: { connect: [{ id: _Two_Sum_II___Input_Array_is_Sorted.id }] }
    }
});
await prisma.level.update({
    where: { id: _Trapping_Rain_Water.id },
    data: {
        prerequisites: { connect: [{ id: _Container_With_Most_Water.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Two_Pointers_Basics.id},
                    {id: _Reverse_String.id},
                    {id: _Checking_and_Swapping.id},
                    {id: _Reverse_Vowels_of_a_String.id},
                    {id: _Reverse_Words_in_a_String.id},
                    {id: _Reordering_by_Swapping.id},
                    {id: _Sort_Array_by_Parity.id},
                    {id: _Sort_Array_by_Parity_II.id},
                    {id: _Sort_Colors.id},
                    {id: _Move_Zeros.id},
                    {id: _Remove_Element.id},
                    {id: _Remove_Duplicates_from_Sorted_Array.id},
                    {id: _Two_Structures.id},
                    {id: _Is_Subsequence.id},
                    {id: _Find_the_Index_of_the_First_Occurrence_in_a_String.id},
                    {id: _Compare_Version_Number.id},
                    {id: _Merge_Sorted_Array.id},
                    {id: _Assign_Cookies.id},
                    {id: _Shortest_Distance_to_a_Character.id},
                    {id: _Advanced_Checking.id},
                    {id: _Valid_Palindrome.id},
                    {id: _Two_Sum_II___Input_Array_is_Sorted.id},
                    {id: _3Sum.id},
                    {id: _4Sum.id},
                    {id: _Container_With_Most_Water.id},
                    {id: _Trapping_Rain_Water.id}],
      },
  },
});
