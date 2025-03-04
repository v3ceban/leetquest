
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Dynamic Programming"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Backtracking_with_Memory = await prisma.level.create({
  data: {
      title: "Backtracking with Memory",
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

const _Variable_DP = await prisma.level.create({
  data: {
      title: "Variable DP",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 150,
      y_position: 150,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Climbing_Stairs = await prisma.level.create({
  data: {
      title: "Climbing Stairs",
      description: "“You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?“",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 50,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/climbing-stairs/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Count_Vowels_Permutation = await prisma.level.create({
  data: {
      title: "Count Vowels Permutation",
      description: "“You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?“",
      type: "BONUS",
      color: "RED",
      name: "A",
      x_position: 50,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/count-vowels-permutation/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Array_DP = await prisma.level.create({
  data: {
      title: "Array DP",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 350,
      y_position: 250,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Pascals_Triangle = await prisma.level.create({
  data: {
      title: "Pascal’s Triangle",
      description: "“Given an integer numRows, return the first numRows of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 450,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/pascals-triangle/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Min_Cost_Climbing_Stairs = await prisma.level.create({
  data: {
      title: "Min Cost Climbing Stairs",
      description: "“You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 450,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/min-cost-climbing-stairs/description/",
      world: { connect: { id: _world.id } }
  }
});

const _House_Robber = await prisma.level.create({
  data: {
      title: "House Robber",
      description: "“Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police. Police are alerted if two adjacent houses are robbed.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 450,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/house-robber/description/",
      world: { connect: { id: _world.id } }
  }
});

const _House_Robber_II = await prisma.level.create({
  data: {
      title: "House Robber II",
      description: "“Given a circular integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police. Police are alerted if two adjacent houses are robbed. The last house is considered adjacent to the first house.“",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 550,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/house-robber-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Coin_Change = await prisma.level.create({
  data: {
      title: "Coin Change",
      description: "“You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "5",
      x_position: 350,
      y_position: 550,
      leetcode_url: "https://leetcode.com/problems/coin-change/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Decode_Ways = await prisma.level.create({
  data: {
      title: "Decode Ways",
      description: "“Given a string s containing only digits, return the number of ways to decode it into letters. If the entire string cannot be decoded in any valid way, return 0.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "6",
      x_position: 250,
      y_position: 650,
      leetcode_url: "https://leetcode.com/problems/decode-ways/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Word_Break = await prisma.level.create({
  data: {
      title: "Word Break",
      description: "“Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "7",
      x_position: 150,
      y_position: 650,
      leetcode_url: "https://leetcode.com/problems/word-break/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Word_Break_II = await prisma.level.create({
  data: {
      title: "Word Break II",
      description: "“Given a string s and a dictionary of strings wordDict, return ALL of the ways s can be segmented into a space-separated sequence of one or more dictionary words.“",
      type: "BONUS",
      color: "RED",
      name: "C",
      x_position: 50,
      y_position: 650,
      leetcode_url: "https://leetcode.com/problems/word-break-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _2D_DP = await prisma.level.create({
  data: {
      title: "2D DP",
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

const _Longest_Common_Subsequence = await prisma.level.create({
  data: {
      title: "Longest Common Subsequence",
      description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "8",
      x_position: 250,
      y_position: 950,
      leetcode_url: "https://leetcode.com/problems/longest-common-subsequence/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Edit_Distance = await prisma.level.create({
  data: {
      title: "Edit Distance",
      description: "“Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. The operations are deleting a character, inserting a character, or replacing a character.“",
      type: "BONUS",
      color: "YELLOW",
      name: "D",
      x_position: 350,
      y_position: 950,
      leetcode_url: "https://leetcode.com/problems/edit-distance/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Coin_Change_II = await prisma.level.create({
  data: {
      title: "Coin Change II",
      description: "“You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "9",
      x_position: 250,
      y_position: 1050,
      leetcode_url: "https://leetcode.com/problems/coin-change-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Interleaving_String = await prisma.level.create({
  data: {
      title: "Interleaving String",
      description: "“Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "10",
      x_position: 250,
      y_position: 1150,
      leetcode_url: "https://leetcode.com/problems/interleaving-string/",
      world: { connect: { id: _world.id } }
  }
});

const _Distinct_Subsequences = await prisma.level.create({
  data: {
      title: "Distinct Subsequences",
      description: "“Given two strings s and t, return the number of distinct subsequences of s which equals t.“",
      type: "BONUS",
      color: "RED",
      name: "E",
      x_position: 150,
      y_position: 1500,
      leetcode_url: "https://leetcode.com/problems/distinct-subsequences/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Regular_Expression_Matching = await prisma.level.create({
  data: {
      title: "Regular Expression Matching",
      description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*', where '.' matches any single character and '*' matches zero or more of the preceding element.",
      type: "BONUS",
      color: "RED",
      name: "F",
      x_position: 250,
      y_position: 1500,
      leetcode_url: "https://leetcode.com/problems/regular-expression-matching/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Wildcard_Matching = await prisma.level.create({
  data: {
      title: "Wildcard Matching",
      description: "Given an input string s and a pattern p, implement wildcard matching with support for '?' and '*', where '?' matches any single character and '*' matches any sequence of characters.",
      type: "BONUS",
      color: "RED",
      name: "G",
      x_position: 350,
      y_position: 1500,
      leetcode_url: "https://leetcode.com/problems/wildcard-matching/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Legacy_Set = await prisma.level.create({
  data: {
      title: "Legacy Set",
      description: "None",
      type: "BONUS",
      color: "BLUE",
      name: "?",
      x_position: 250,
      y_position: 2000,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Best_Time_to_Buy_and_Sell_Stock__Sliding_Window = await prisma.level.create({
  data: {
      title: "Best Time to Buy and Sell Stock (Sliding Window)",
      description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      type: "BONUS",
      color: "BLUE",
      name: "!",
      x_position: 150,
      y_position: 2250,
      leetcode_url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Is_Subsequence__Two_Pointers = await prisma.level.create({
  data: {
      title: "Is Subsequence (Two Pointers)",
      description: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise.",
      type: "BONUS",
      color: "BLUE",
      name: "@",
      x_position: 350,
      y_position: 2250,
      leetcode_url: "https://leetcode.com/problems/is-subsequence/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Generate_Parentheses__Backtracking = await prisma.level.create({
  data: {
      title: "Generate Parentheses (Backtracking)",
      description: "“Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.“",
      type: "BONUS",
      color: "BLUE",
      name: "#",
      x_position: 50,
      y_position: 2500,
      leetcode_url: "https://leetcode.com/problems/generate-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Longest_Valid_Parentheses__Stacks = await prisma.level.create({
  data: {
      title: "Longest Valid Parentheses (Stacks)",
      description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring .",
      type: "BONUS",
      color: "BLUE",
      name: "$",
      x_position: 450,
      y_position: 2500,
      leetcode_url: "https://leetcode.com/problems/longest-valid-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Binary_Tree_Maximum_Path_Sum = await prisma.level.create({
  data: {
      title: "Binary Tree Maximum Path Sum",
      description: "Given the root of a binary tree, return the maximum path sum of any non-empty path.",
      type: "BONUS",
      color: "BLUE",
      name: "%",
      x_position: 150,
      y_position: 2750,
      leetcode_url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Trapping_Rain_Water__Two_Pointers = await prisma.level.create({
  data: {
      title: "Trapping Rain Water (Two Pointers)",
      description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      type: "BONUS",
      color: "BLUE",
      name: "^",
      x_position: 350,
      y_position: 2750,
      leetcode_url: "https://leetcode.com/problems/trapping-rain-water/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Variable_DP.id },
    data: {
        prerequisites: { connect: [{ id: _Backtracking_with_Memory.id }] }
    }
});
await prisma.level.update({
    where: { id: _Climbing_Stairs.id },
    data: {
        prerequisites: { connect: [{ id: _Variable_DP.id }] }
    }
});
await prisma.level.update({
    where: { id: _Count_Vowels_Permutation.id },
    data: {
        prerequisites: { connect: [{ id: _Climbing_Stairs.id }] }
    }
});
await prisma.level.update({
    where: { id: _Array_DP.id },
    data: {
        prerequisites: { connect: [{ id: _Variable_DP.id }] }
    }
});
await prisma.level.update({
    where: { id: _Pascals_Triangle.id },
    data: {
        prerequisites: { connect: [{ id: _Array_DP.id }] }
    }
});
await prisma.level.update({
    where: { id: _Min_Cost_Climbing_Stairs.id },
    data: {
        prerequisites: { connect: [{ id: _Array_DP.id }] }
    }
});
await prisma.level.update({
    where: { id: _House_Robber.id },
    data: {
        prerequisites: { connect: [{ id: _Min_Cost_Climbing_Stairs.id }] }
    }
});
await prisma.level.update({
    where: { id: _House_Robber_II.id },
    data: {
        prerequisites: { connect: [{ id: _House_Robber.id }] }
    }
});
await prisma.level.update({
    where: { id: _Coin_Change.id },
    data: {
        prerequisites: { connect: [{ id: _House_Robber.id }] }
    }
});
await prisma.level.update({
    where: { id: _Decode_Ways.id },
    data: {
        prerequisites: { connect: [{ id: _Coin_Change.id }] }
    }
});
await prisma.level.update({
    where: { id: _Word_Break.id },
    data: {
        prerequisites: { connect: [{ id: _Decode_Ways.id }] }
    }
});
await prisma.level.update({
    where: { id: _Word_Break_II.id },
    data: {
        prerequisites: { connect: [{ id: _Word_Break.id }] }
    }
});
await prisma.level.update({
    where: { id: _2D_DP.id },
    data: {
        prerequisites: { connect: [{ id: _Decode_Ways.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Common_Subsequence.id },
    data: {
        prerequisites: { connect: [{ id: _2D_DP.id }] }
    }
});
await prisma.level.update({
    where: { id: _Edit_Distance.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Common_Subsequence.id }] }
    }
});
await prisma.level.update({
    where: { id: _Coin_Change_II.id },
    data: {
        prerequisites: { connect: [{ id: _Longest_Common_Subsequence.id }] }
    }
});
await prisma.level.update({
    where: { id: _Interleaving_String.id },
    data: {
        prerequisites: { connect: [{ id: _Coin_Change_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Distinct_Subsequences.id },
    data: {
        prerequisites: { connect: [{ id: _Interleaving_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Regular_Expression_Matching.id },
    data: {
        prerequisites: { connect: [{ id: _Interleaving_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Wildcard_Matching.id },
    data: {
        prerequisites: { connect: [{ id: _Interleaving_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Legacy_Set.id },
    data: {
        prerequisites: { connect: [{ id: _Distinct_Subsequences.id }, { id: _Regular_Expression_Matching.id }, { id: _Wildcard_Matching.id }] }
    }
});
await prisma.level.update({
    where: { id: _Best_Time_to_Buy_and_Sell_Stock__Sliding_Window.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.level.update({
    where: { id: _Is_Subsequence__Two_Pointers.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.level.update({
    where: { id: _Generate_Parentheses__Backtracking.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Valid_Parentheses__Stacks.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.level.update({
    where: { id: _Binary_Tree_Maximum_Path_Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.level.update({
    where: { id: _Trapping_Rain_Water__Two_Pointers.id },
    data: {
        prerequisites: { connect: [{ id: _Legacy_Set.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Backtracking_with_Memory.id},
                    {id: _Variable_DP.id},
                    {id: _Climbing_Stairs.id},
                    {id: _Count_Vowels_Permutation.id},
                    {id: _Array_DP.id},
                    {id: _Pascals_Triangle.id},
                    {id: _Min_Cost_Climbing_Stairs.id},
                    {id: _House_Robber.id},
                    {id: _House_Robber_II.id},
                    {id: _Coin_Change.id},
                    {id: _Decode_Ways.id},
                    {id: _Word_Break.id},
                    {id: _Word_Break_II.id},
                    {id: _2D_DP.id},
                    {id: _Longest_Common_Subsequence.id},
                    {id: _Edit_Distance.id},
                    {id: _Coin_Change_II.id},
                    {id: _Interleaving_String.id},
                    {id: _Distinct_Subsequences.id},
                    {id: _Regular_Expression_Matching.id},
                    {id: _Wildcard_Matching.id},
                    {id: _Legacy_Set.id},
                    {id: _Best_Time_to_Buy_and_Sell_Stock__Sliding_Window.id},
                    {id: _Is_Subsequence__Two_Pointers.id},
                    {id: _Generate_Parentheses__Backtracking.id},
                    {id: _Longest_Valid_Parentheses__Stacks.id},
                    {id: _Binary_Tree_Maximum_Path_Sum.id},
                    {id: _Trapping_Rain_Water__Two_Pointers.id}],
      },
  },
});
