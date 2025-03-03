
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Stacks"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Stack_Basics = await prisma.level.create({
  data: {
      title: "Stack Basics",
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

const _Valid_Parentheses = await prisma.level.create({
  data: {
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 20,
      y_position: 120,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Remove_All_Adjacent_Duplicates_In_String = await prisma.level.create({
  data: {
      title: "Remove All Adjacent Duplicates In String",
      description: "Return a string after all duplicate removals have been made.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 20,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Minimum_String_Length_After_Removing_Substrings = await prisma.level.create({
  data: {
      title: "Minimum String Length After Removing Substrings",
      description: "Return the minimum possible length of the resulting string that you can obtain after removing instances of AB and CD.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 20,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/minimum-string-length-after-removing-substrings/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Backspace_String_Compare = await prisma.level.create({
  data: {
      title: "Backspace String Compare",
      description: "Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.",
      type: "PROBLEM",
      color: "GREEN",
      name: "4",
      x_position: 120,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/backspace-string-compare/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Baseball_Game = await prisma.level.create({
  data: {
      title: "Baseball Game",
      description: "Return the sum of all the scores on the record after applying all the baseball game operations.",
      type: "PROBLEM",
      color: "GREEN",
      name: "5",
      x_position: 220,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/baseball-game/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Evaluate_Reverse_Polish_Notation = await prisma.level.create({
  data: {
      title: "Evaluate Reverse Polish Notation",
      description: "Given an expression in reverse polish notation, evaluate the expression. Return an integer that represents the value of the expression.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 220,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      world: { connect: { id: _world.id } }
  }
});

const _Asteroid_Collision = await prisma.level.create({
  data: {
      title: "Asteroid Collision",
      description: "Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 320,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/asteroid-collision/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Tracking_Depth = await prisma.level.create({
  data: {
      title: "Tracking Depth",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 120,
      y_position: 320,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Maximum_Nesting_Depth_of_the_Parentheses = await prisma.level.create({
  data: {
      title: "Maximum Nesting Depth of the Parentheses",
      description: "Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses.",
      type: "PROBLEM",
      color: "GREEN",
      name: "6",
      x_position: 220,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Crawler_Log_Folder = await prisma.level.create({
  data: {
      title: "Crawler Log Folder",
      description: "Given a list of strings logs, return the minimum number of operations needed to go back to the main folder.",
      type: "PROBLEM",
      color: "GREEN",
      name: "7",
      x_position: 120,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/crawler-log-folder/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Stack_Reversal = await prisma.level.create({
  data: {
      title: "Stack Reversal",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 120,
      y_position: 520,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Reverse_Prefix_of_Word = await prisma.level.create({
  data: {
      title: "Reverse Prefix of Word",
      description: "Given a 0-indexed string word and a character ch, reverse the segment of word that starts at index 0 and ends at the index of the first occurrence of ch",
      type: "PROBLEM",
      color: "GREEN",
      name: "8",
      x_position: 120,
      y_position: 620,
      leetcode_url: "https://leetcode.com/problems/reverse-prefix-of-word/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Minimum_Add_to_Make_Parentheses_Valid = await prisma.level.create({
  data: {
      title: "Minimum Add to Make Parentheses Valid",
      description: "You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string. Return the minimum number of moves required to make s valid.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "9",
      x_position: 320,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Minimum_Remove_to_Make_Valid_Parentheses = await prisma.level.create({
  data: {
      title: "Minimum Remove to Make Valid Parentheses",
      description: "Given a string s of '(' , ')' and lowercase English characters. Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string. ",
      type: "PROBLEM",
      color: "YELLOW",
      name: "10",
      x_position: 320,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Score_of_Parentheses = await prisma.level.create({
  data: {
      title: "Score of Parentheses",
      description: "Given a balanced parentheses string s, return the score of the string.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "11",
      x_position: 420,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/score-of-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Decode_String = await prisma.level.create({
  data: {
      title: "Decode String",
      description: "Given an encoded string, return its decoded string.",
      type: "BONUS",
      color: "YELLOW",
      name: "C",
      x_position: 520,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/decode-string/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Longest_Valid_Parentheses = await prisma.level.create({
  data: {
      title: "Longest Valid Parentheses",
      description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring .",
      type: "BONUS",
      color: "RED",
      name: "D",
      x_position: 420,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/longest-valid-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Monotonic_Stack = await prisma.level.create({
  data: {
      title: "Monotonic Stack",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IV",
      x_position: 420,
      y_position: 20,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Next_Greater_Element_I = await prisma.level.create({
  data: {
      title: "Next Greater Element I",
      description: "“The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "12",
      x_position: 620,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/next-greater-element-i/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Final_Prices_With_a_Special_Discount_in_a_Shop = await prisma.level.create({
  data: {
      title: "Final Prices With a Special Discount in a Shop",
      description: "“You are given an integer array prices where prices[i] is the price of the ith item in a shop. Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering a special discount.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "13",
      x_position: 720,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_K_Digits = await prisma.level.create({
  data: {
      title: "Remove K Digits",
      description: "Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "14",
      x_position: 620,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/remove-k-digits/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Daily_Temperatures = await prisma.level.create({
  data: {
      title: "Daily Temperatures",
      description: "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "15",
      x_position: 720,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/daily-temperatures/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Maximum_Width_Ramp = await prisma.level.create({
  data: {
      title: "Maximum Width Ramp",
      description: "A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i. Given an integer array nums, return the maximum width of a ramp in nums.",
      type: "BONUS",
      color: "YELLOW",
      name: "E",
      x_position: 820,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/maximum-width-ramp/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Largest_Rectangle_in_Histogram = await prisma.level.create({
  data: {
      title: "Largest Rectangle in Histogram",
      description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
      type: "BONUS",
      color: "RED",
      name: "F",
      x_position: 720,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/maximum-width-ramp/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Valid_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Stack_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_All_Adjacent_Duplicates_In_String.id },
    data: {
        prerequisites: { connect: [{ id: _Valid_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Minimum_String_Length_After_Removing_Substrings.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_All_Adjacent_Duplicates_In_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Backspace_String_Compare.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_All_Adjacent_Duplicates_In_String.id }] }
    }
});
await prisma.level.update({
    where: { id: _Baseball_Game.id },
    data: {
        prerequisites: { connect: [{ id: _Backspace_String_Compare.id }] }
    }
});
await prisma.level.update({
    where: { id: _Evaluate_Reverse_Polish_Notation.id },
    data: {
        prerequisites: { connect: [{ id: _Baseball_Game.id }] }
    }
});
await prisma.level.update({
    where: { id: _Asteroid_Collision.id },
    data: {
        prerequisites: { connect: [{ id: _Baseball_Game.id }] }
    }
});
await prisma.level.update({
    where: { id: _Tracking_Depth.id },
    data: {
        prerequisites: { connect: [{ id: _Backspace_String_Compare.id }] }
    }
});
await prisma.level.update({
    where: { id: _Maximum_Nesting_Depth_of_the_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Tracking_Depth.id }] }
    }
});
await prisma.level.update({
    where: { id: _Crawler_Log_Folder.id },
    data: {
        prerequisites: { connect: [{ id: _Maximum_Nesting_Depth_of_the_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Stack_Reversal.id },
    data: {
        prerequisites: { connect: [{ id: _Crawler_Log_Folder.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Prefix_of_Word.id },
    data: {
        prerequisites: { connect: [{ id: _Stack_Reversal.id }] }
    }
});
await prisma.level.update({
    where: { id: _Minimum_Add_to_Make_Parentheses_Valid.id },
    data: {
        prerequisites: { connect: [{ id: _Maximum_Nesting_Depth_of_the_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Minimum_Remove_to_Make_Valid_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Minimum_Add_to_Make_Parentheses_Valid.id }] }
    }
});
await prisma.level.update({
    where: { id: _Score_of_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Minimum_Add_to_Make_Parentheses_Valid.id }] }
    }
});
await prisma.level.update({
    where: { id: _Decode_String.id },
    data: {
        prerequisites: { connect: [{ id: _Score_of_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Longest_Valid_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Score_of_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Monotonic_Stack.id },
    data: {
        prerequisites: { connect: [{ id: _Score_of_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Next_Greater_Element_I.id },
    data: {
        prerequisites: { connect: [{ id: _Monotonic_Stack.id }] }
    }
});
await prisma.level.update({
    where: { id: _Final_Prices_With_a_Special_Discount_in_a_Shop.id },
    data: {
        prerequisites: { connect: [{ id: _Next_Greater_Element_I.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_K_Digits.id },
    data: {
        prerequisites: { connect: [{ id: _Next_Greater_Element_I.id }] }
    }
});
await prisma.level.update({
    where: { id: _Daily_Temperatures.id },
    data: {
        prerequisites: { connect: [{ id: _Final_Prices_With_a_Special_Discount_in_a_Shop.id }, { id: _Remove_K_Digits.id }] }
    }
});
await prisma.level.update({
    where: { id: _Maximum_Width_Ramp.id },
    data: {
        prerequisites: { connect: [{ id: _Daily_Temperatures.id }] }
    }
});
await prisma.level.update({
    where: { id: _Largest_Rectangle_in_Histogram.id },
    data: {
        prerequisites: { connect: [{ id: _Daily_Temperatures.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Stack_Basics.id},
                    {id: _Valid_Parentheses.id},
                    {id: _Remove_All_Adjacent_Duplicates_In_String.id},
                    {id: _Minimum_String_Length_After_Removing_Substrings.id},
                    {id: _Backspace_String_Compare.id},
                    {id: _Baseball_Game.id},
                    {id: _Evaluate_Reverse_Polish_Notation.id},
                    {id: _Asteroid_Collision.id},
                    {id: _Tracking_Depth.id},
                    {id: _Maximum_Nesting_Depth_of_the_Parentheses.id},
                    {id: _Crawler_Log_Folder.id},
                    {id: _Stack_Reversal.id},
                    {id: _Reverse_Prefix_of_Word.id},
                    {id: _Minimum_Add_to_Make_Parentheses_Valid.id},
                    {id: _Minimum_Remove_to_Make_Valid_Parentheses.id},
                    {id: _Score_of_Parentheses.id},
                    {id: _Decode_String.id},
                    {id: _Longest_Valid_Parentheses.id},
                    {id: _Monotonic_Stack.id},
                    {id: _Next_Greater_Element_I.id},
                    {id: _Final_Prices_With_a_Special_Discount_in_a_Shop.id},
                    {id: _Remove_K_Digits.id},
                    {id: _Daily_Temperatures.id},
                    {id: _Maximum_Width_Ramp.id},
                    {id: _Largest_Rectangle_in_Histogram.id}],
      },
  },
});
