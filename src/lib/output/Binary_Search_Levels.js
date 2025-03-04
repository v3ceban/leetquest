
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Binary Search"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Search_a_Structure = await prisma.level.create({
  data: {
      title: "Search a Structure",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "I",
      x_position: 20,
      y_position: 520,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Binary_Search = await prisma.level.create({
  data: {
      title: "Binary Search",
      description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 20,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/binary-search/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Search_a_2D_Matrix = await prisma.level.create({
  data: {
      title: "Search a 2D Matrix",
      description: "Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "2",
      x_position: 20,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/search-a-2d-matrix/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Search_in_Rotated_Sorted_Array = await prisma.level.create({
  data: {
      title: "Search in Rotated Sorted Array",
      description: "Given the sorted array nums after a possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "3",
      x_position: 20,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/search-in-rotated-sorted-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Search_in_Rotated_Sorted_Array_II = await prisma.level.create({
  data: {
      title: "Search in Rotated Sorted Array II",
      description: "Given the sorted array nums after a possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.You must decrease the overall operation steps as much as possible.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 20,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Search_an_Answer_Space = await prisma.level.create({
  data: {
      title: "Search an Answer Space",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 120,
      y_position: 420,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Guess_Number_Higher_or_Lower = await prisma.level.create({
  data: {
      title: "Guess Number Higher or Lower",
      description: "I pick a number from 1 to n. You have to guess which number I picked. Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess. You call a pre-defined API int guess(int num), which returns whether you were higher, lower, or correct. Return the number that I picked.",
      type: "PROBLEM",
      color: "GREEN",
      name: "4",
      x_position: 120,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/guess-number-higher-or-lower/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Valid_Perfect_Square = await prisma.level.create({
  data: {
      title: "Valid Perfect Square",
      description: "Given a positive integer num, return true if num is a perfect square or false otherwise. You must not use any built-in library function, such as sqrt.",
      type: "PROBLEM",
      color: "GREEN",
      name: "5",
      x_position: 120,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/valid-perfect-square/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Uncertainty = await prisma.level.create({
  data: {
      title: "Uncertainty",
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

const _Search_Insert_Position = await prisma.level.create({
  data: {
      title: "Search Insert Position",
      description: "“Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "6",
      x_position: 220,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/search-insert-position/description/",
      world: { connect: { id: _world.id } }
  }
});

const _First_Bad_Version = await prisma.level.create({
  data: {
      title: "First Bad Version",
      description: "“Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad. You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "7",
      x_position: 120,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/first-bad-version/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_First_and_Last_Position_of_Element_in_Sorted_Array = await prisma.level.create({
  data: {
      title: "Find First and Last Position of Element in Sorted Array",
      description: "“Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. You must write an algorithm with O(log n) runtime complexity.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "8",
      x_position: 320,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_Minimum_in_Rotated_Sorted_Array = await prisma.level.create({
  data: {
      title: "Find Minimum in Rotated Sorted Array",
      description: "“Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "9",
      x_position: 220,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_Peak_Element = await prisma.level.create({
  data: {
      title: "Find Peak Element",
      description: "“A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.“",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 220,
      y_position: -80,
      leetcode_url: "https://leetcode.com/problems/find-peak-element/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Koko_Eating_Bananas = await prisma.level.create({
  data: {
      title: "Koko Eating Bananas",
      description: "“Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "10",
      x_position: 320,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/koko-eating-bananas/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Median_of_Two_Sorted_Arrays = await prisma.level.create({
  data: {
      title: "Median of Two Sorted Arrays",
      description: "“Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).“",
      type: "BONUS",
      color: "RED",
      name: "C",
      x_position: 320,
      y_position: -80,
      leetcode_url: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Binary_Search.id },
    data: {
        prerequisites: { connect: [{ id: _Search_a_Structure.id }] }
    }
});
await prisma.level.update({
    where: { id: _Search_a_2D_Matrix.id },
    data: {
        prerequisites: { connect: [{ id: _Binary_Search.id }] }
    }
});
await prisma.level.update({
    where: { id: _Search_in_Rotated_Sorted_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Search_a_2D_Matrix.id }] }
    }
});
await prisma.level.update({
    where: { id: _Search_in_Rotated_Sorted_Array_II.id },
    data: {
        prerequisites: { connect: [{ id: _Search_in_Rotated_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Search_an_Answer_Space.id },
    data: {
        prerequisites: { connect: [{ id: _Binary_Search.id }] }
    }
});
await prisma.level.update({
    where: { id: _Guess_Number_Higher_or_Lower.id },
    data: {
        prerequisites: { connect: [{ id: _Search_an_Answer_Space.id }] }
    }
});
await prisma.level.update({
    where: { id: _Valid_Perfect_Square.id },
    data: {
        prerequisites: { connect: [{ id: _Guess_Number_Higher_or_Lower.id }] }
    }
});
await prisma.level.update({
    where: { id: _Uncertainty.id },
    data: {
        prerequisites: { connect: [{ id: _Valid_Perfect_Square.id }] }
    }
});
await prisma.level.update({
    where: { id: _Search_Insert_Position.id },
    data: {
        prerequisites: { connect: [{ id: _Uncertainty.id }] }
    }
});
await prisma.level.update({
    where: { id: _First_Bad_Version.id },
    data: {
        prerequisites: { connect: [{ id: _Search_Insert_Position.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_First_and_Last_Position_of_Element_in_Sorted_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Search_Insert_Position.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_Minimum_in_Rotated_Sorted_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Search_Insert_Position.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_Peak_Element.id },
    data: {
        prerequisites: { connect: [{ id: _Find_Minimum_in_Rotated_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Koko_Eating_Bananas.id },
    data: {
        prerequisites: { connect: [{ id: _Find_Minimum_in_Rotated_Sorted_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Median_of_Two_Sorted_Arrays.id },
    data: {
        prerequisites: { connect: [{ id: _Koko_Eating_Bananas.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Search_a_Structure.id},
                    {id: _Binary_Search.id},
                    {id: _Search_a_2D_Matrix.id},
                    {id: _Search_in_Rotated_Sorted_Array.id},
                    {id: _Search_in_Rotated_Sorted_Array_II.id},
                    {id: _Search_an_Answer_Space.id},
                    {id: _Guess_Number_Higher_or_Lower.id},
                    {id: _Valid_Perfect_Square.id},
                    {id: _Uncertainty.id},
                    {id: _Search_Insert_Position.id},
                    {id: _First_Bad_Version.id},
                    {id: _Find_First_and_Last_Position_of_Element_in_Sorted_Array.id},
                    {id: _Find_Minimum_in_Rotated_Sorted_Array.id},
                    {id: _Find_Peak_Element.id},
                    {id: _Koko_Eating_Bananas.id},
                    {id: _Median_of_Two_Sorted_Arrays.id}],
      },
  },
});
