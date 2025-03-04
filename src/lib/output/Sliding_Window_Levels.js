
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Sliding Window"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Rolling = await prisma.level.create({
  data: {
      title: "Rolling",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "I",
      x_position: 250,
      y_position: 50,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Maximum_Average_Subarray_I = await prisma.level.create({
  data: {
      title: "Maximum Average Subarray I",
      description: "You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 250,
      y_position: 150,
      leetcode_url: "https://leetcode.com/problems/maximum-average-subarray-i/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Defuse_the_Bomb = await prisma.level.create({
  data: {
      title: "Defuse the Bomb",
      description: "Given the circular array code and an integer key k, return the decrypted code to defuse the bomb! The code for each index is the sum of the next k numbers.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 250,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/defuse-the-bomb/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_K_Closest_Elements = await prisma.level.create({
  data: {
      title: "Find K Closest Elements",
      description: "Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 150,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/find-k-closest-elements/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Grumpy_Bookstore_Owner = await prisma.level.create({
  data: {
      title: "Grumpy Bookstore Owner",
      description: "There is a bookstore owner that has a store open for n minutes. You are given an integer array customers of length n where customers[i] is the number of the customers that enter the store at the start of the ith minute and all those customers leave after the end of that minute. Return the maximum number of customers that can be satisfied throughout the day.",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 350,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/grumpy-bookstore-owner/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Inching = await prisma.level.create({
  data: {
      title: "Inching",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 250,
      y_position: 350,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Longest_Nice_Substring = await prisma.level.create({
  data: {
      title: "Longest Nice Substring",
      description: "A string s is nice if, for every letter of the alphabet that s contains, it appears both in uppercase and lowercase. Given a string s, return the longest substring of s that is nice.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 250,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/longest-nice-substring/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Best_Time_to_Buy_and_Sell_Stock = await prisma.level.create({
  data: {
      title: "Best Time to Buy and Sell Stock",
      description: "“You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.“",
      type: "BONUS",
      color: "GREEN",
      name: "C",
      x_position: 350,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Minimum_Size_Subarray_Sum = await prisma.level.create({
  data: {
      title: "Minimum Size Subarray Sum",
      description: "Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 250,
      y_position: 550,
      leetcode_url: "https://leetcode.com/problems/minimum-size-subarray-sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Combination_Shortcut = await prisma.level.create({
  data: {
      title: "Combination Shortcut",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 250,
      y_position: 650,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Subarray_Product_Less_Than_K = await prisma.level.create({
  data: {
      title: "Subarray Product Less Than K",
      description: "Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "5",
      x_position: 250,
      y_position: 750,
      leetcode_url: "https://leetcode.com/problems/subarray-product-less-than-k/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Rolling_Hash = await prisma.level.create({
  data: {
      title: "Rolling Hash",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IV",
      x_position: 250,
      y_position: 850,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Substrings_of_Size_Three_with_Distinct_Characters = await prisma.level.create({
  data: {
      title: "Substrings of Size Three with Distinct Characters",
      description: "“A string is good if there are no repeated characters. Given a string s , return the number of good substrings of length three in s .“",
      type: "PROBLEM",
      color: "GREEN",
      name: "6",
      x_position: 250,
      y_position: 950,
      leetcode_url: "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Repeated_DNA_Sequences = await prisma.level.create({
  data: {
      title: "Repeated DNA Sequences",
      description: "“Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "7",
      x_position: 250,
      y_position: 1050,
      leetcode_url: "https://leetcode.com/problems/repeated-dna-sequences/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_All_Anagrams_in_a_String = await prisma.level.create({
  data: {
      title: "Find All Anagrams in a String",
      description: "“Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "8",
      x_position: 200,
      y_position: 1150,
      leetcode_url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Permutation_in_String = await prisma.level.create({
  data: {
      title: "Permutation in String",
      description: "“Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "9",
      x_position: 300,
      y_position: 1150,
      leetcode_url: "https://leetcode.com/problems/permutation-in-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Inching_Hash = await prisma.level.create({
  data: {
      title: "Inching Hash",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "V",
      x_position: 250,
      y_position: 1250,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Longest_Substring_Without_Repeating_Characters = await prisma.level.create({
  data: {
      title: "Longest Substring Without Repeating Characters",
      description: "“Given a string s, find the length of the longest substring without repeating characters.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "10",
      x_position: 250,
      y_position: 1350,
      leetcode_url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Fruit_Into_Baskets = await prisma.level.create({
  data: {
      title: "Fruit Into Baskets",
      description: "“Given the integer array fruits, return the maximum number of fruits you can pick.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "11",
      x_position: 250,
      y_position: 1450,
      leetcode_url: "https://leetcode.com/problems/fruit-into-baskets/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Longest_Repeating_Character_Replacement = await prisma.level.create({
  data: {
      title: "Longest Repeating Character Replacement",
      description: "“You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "12",
      x_position: 200,
      y_position: 1550,
      leetcode_url: "https://leetcode.com/problems/longest-repeating-character-replacement/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Minimum_Window_Substring = await prisma.level.create({
  data: {
      title: "Minimum Window Substring",
      description: "“Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.“",
      type: "BONUS",
      color: "RED",
      name: "C",
      x_position: 200,
      y_position: 1650,
      leetcode_url: "https://leetcode.com/problems/minimum-window-substring/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Binary_Subarrays_With_Sum = await prisma.level.create({
  data: {
      title: "Binary Subarrays With Sum",
      description: "“Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "13",
      x_position: 300,
      y_position: 1550,
      leetcode_url: "https://leetcode.com/problems/binary-subarrays-with-sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Subarrays_with_K_Different_Integers = await prisma.level.create({
  data: {
      title: "Subarrays with K Different Integers",
      description: "“Given an integer array nums and an integer k, return the number of good subarrays of nums. A good array is an array where the number of different integers in that array is exactly k.“",
      type: "BONUS",
      color: "RED",
      name: "D",
      x_position: 300,
      y_position: 1650,
      leetcode_url: "https://leetcode.com/problems/subarrays-with-k-different-integers/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Maximum_Average_Subarray_I.id },
    data: {
        prerequisites: { connect: [{ id: _Rolling.id }] }
    }
});
await prisma.level.update({
    where: { id: _Defuse_the_Bomb.id },
    data: {
        prerequisites: { connect: [{ id: _Maximum_Average_Subarray_I.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_K_Closest_Elements.id },
    data: {
        prerequisites: { connect: [{ id: _Defuse_the_Bomb.id }] }
    }
});
await prisma.level.update({
    where: { id: _Grumpy_Bookstore_Owner.id },
    data: {
        prerequisites: { connect: [{ id: _Defuse_the_Bomb.id }] }
    }
});
await prisma.level.update({
    where: { id: _Inching.id },
    data: {
        prerequisites: { connect: [{ id: _Defuse_the_Bomb.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Nice_Substring.id },
    data: {
        prerequisites: { connect: [{ id: _Inching.id }] }
    }
});
await prisma.level.update({
    where: { id: _Best_Time_to_Buy_and_Sell_Stock.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Nice_Substring.id }] }
    }
});
await prisma.level.update({
    where: { id: _Minimum_Size_Subarray_Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Nice_Substring.id }] }
    }
});
await prisma.level.update({
    where: { id: _Combination_Shortcut.id },
    data: {
        prerequisites: { connect: [{ id: _Minimum_Size_Subarray_Sum.id }] }
    }
});
await prisma.level.update({
    where: { id: _Subarray_Product_Less_Than_K.id },
    data: {
        prerequisites: { connect: [{ id: _Combination_Shortcut.id }] }
    }
});
await prisma.level.update({
    where: { id: _Rolling_Hash.id },
    data: {
        prerequisites: { connect: [{ id: _Subarray_Product_Less_Than_K.id }] }
    }
});
await prisma.level.update({
    where: { id: _Substrings_of_Size_Three_with_Distinct_Characters.id },
    data: {
        prerequisites: { connect: [{ id: _Rolling_Hash.id }] }
    }
});
await prisma.level.update({
    where: { id: _Repeated_DNA_Sequences.id },
    data: {
        prerequisites: { connect: [{ id: _Substrings_of_Size_Three_with_Distinct_Characters.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_All_Anagrams_in_a_String.id },
    data: {
        prerequisites: { connect: [{ id: _Repeated_DNA_Sequences.id }] }
    }
});
await prisma.level.update({
    where: { id: _Permutation_in_String.id },
    data: {
        prerequisites: { connect: [{ id: _Repeated_DNA_Sequences.id }] }
    }
});
await prisma.level.update({
    where: { id: _Inching_Hash.id },
    data: {
        prerequisites: { connect: [{ id: _Find_All_Anagrams_in_a_String.id }, { id: _Permutation_in_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Substring_Without_Repeating_Characters.id },
    data: {
        prerequisites: { connect: [{ id: _Inching_Hash.id }] }
    }
});
await prisma.level.update({
    where: { id: _Fruit_Into_Baskets.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Substring_Without_Repeating_Characters.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Repeating_Character_Replacement.id },
    data: {
        prerequisites: { connect: [{ id: _Fruit_Into_Baskets.id }] }
    }
});
await prisma.level.update({
    where: { id: _Minimum_Window_Substring.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Repeating_Character_Replacement.id }] }
    }
});
await prisma.level.update({
    where: { id: _Binary_Subarrays_With_Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Fruit_Into_Baskets.id }] }
    }
});
await prisma.level.update({
    where: { id: _Subarrays_with_K_Different_Integers.id },
    data: {
        prerequisites: { connect: [{ id: _Binary_Subarrays_With_Sum.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Rolling.id},
                    {id: _Maximum_Average_Subarray_I.id},
                    {id: _Defuse_the_Bomb.id},
                    {id: _Find_K_Closest_Elements.id},
                    {id: _Grumpy_Bookstore_Owner.id},
                    {id: _Inching.id},
                    {id: _Longest_Nice_Substring.id},
                    {id: _Best_Time_to_Buy_and_Sell_Stock.id},
                    {id: _Minimum_Size_Subarray_Sum.id},
                    {id: _Combination_Shortcut.id},
                    {id: _Subarray_Product_Less_Than_K.id},
                    {id: _Rolling_Hash.id},
                    {id: _Substrings_of_Size_Three_with_Distinct_Characters.id},
                    {id: _Repeated_DNA_Sequences.id},
                    {id: _Find_All_Anagrams_in_a_String.id},
                    {id: _Permutation_in_String.id},
                    {id: _Inching_Hash.id},
                    {id: _Longest_Substring_Without_Repeating_Characters.id},
                    {id: _Fruit_Into_Baskets.id},
                    {id: _Longest_Repeating_Character_Replacement.id},
                    {id: _Minimum_Window_Substring.id},
                    {id: _Binary_Subarrays_With_Sum.id},
                    {id: _Subarrays_with_K_Different_Integers.id}],
      },
  },
});
