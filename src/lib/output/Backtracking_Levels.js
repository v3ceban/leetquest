
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Backtracking"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Getting_Familiar = await prisma.level.create({
  data: {
      title: "Getting Familiar",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "I",
      x_position: 50,
      y_position: 50,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Subsets = await prisma.level.create({
  data: {
      title: "Subsets",
      description: "“Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "1",
      x_position: 150,
      y_position: 150,
      leetcode_url: "https://leetcode.com/problems/subsets/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Subsets_II = await prisma.level.create({
  data: {
      title: "Subsets II",
      description: "“Given an integer array nums of elements that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.“",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 250,
      y_position: 50,
      leetcode_url: "https://leetcode.com/problems/subsets-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Permutations = await prisma.level.create({
  data: {
      title: "Permutations",
      description: "“Given an integer array nums of unique elements, return all the possible permutations. You can return the answer in any order.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "2",
      x_position: 250,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/permutations/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Permutations_II = await prisma.level.create({
  data: {
      title: "Permutations II",
      description: "“Given an integer array nums of elements that may contain duplicates, return all the possible permutations. You can return the answer in any order.“",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 350,
      y_position: 150,
      leetcode_url: "https://leetcode.com/problems/permutations/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Combination_Sum = await prisma.level.create({
  data: {
      title: "Combination Sum",
      description: "“Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The numbers in candidates can be used an unlimited number of times in each combination.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "3",
      x_position: 350,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/combination-sum/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Combination_Sum_II = await prisma.level.create({
  data: {
      title: "Combination Sum II",
      description: "“Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The numbers in candidates can only be used once in each combination.“",
      type: "BONUS",
      color: "YELLOW",
      name: "C",
      x_position: 450,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/combination-sum-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Combination_Sum_III = await prisma.level.create({
  data: {
      title: "Combination Sum III",
      description: "“Find all valid combinations of k numbers that sum up to n such that only numbers 1 through 9 are used and each number is used at most once.“",
      type: "BONUS",
      color: "YELLOW",
      name: "D",
      x_position: 550,
      y_position: 150,
      leetcode_url: "https://leetcode.com/problems/combination-sum-iii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Combination_Sum_IV = await prisma.level.create({
  data: {
      title: "Combination Sum IV",
      description: "“Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target. In this case, difference sequences count as different combinations.“",
      type: "BONUS",
      color: "YELLOW",
      name: "E",
      x_position: 650,
      y_position: 50,
      leetcode_url: "https://leetcode.com/problems/combination-sum-iv/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Generate_Parentheses = await prisma.level.create({
  data: {
      title: "Generate Parentheses",
      description: "“Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 450,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/generate-parentheses/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Unique_Binary_Search_Trees = await prisma.level.create({
  data: {
      title: "Unique Binary Search Trees",
      description: "“Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.“",
      type: "PROBLEM",
      color: "YELLOW",
      name: "5",
      x_position: 550,
      y_position: 550,
      leetcode_url: "https://leetcode.com/problems/unique-binary-search-trees/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Unique_Binary_Search_Trees_II = await prisma.level.create({
  data: {
      title: "Unique Binary Search Trees II",
      description: "“Given an integer n, return ALL the unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.“",
      type: "BONUS",
      color: "YELLOW",
      name: "F",
      x_position: 650,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/unique-binary-search-trees-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Sudoku_Solver = await prisma.level.create({
  data: {
      title: "Sudoku Solver",
      description: "Given a 9x9 Sudoku board, fill in the rest of the board such that it is valid. A valid sudoku board must have the digits 1 through 9 in each row, column, and 3x3 box without repetition.",
      type: "BONUS",
      color: "RED",
      name: "G",
      x_position: 450,
      y_position: 650,
      leetcode_url: "https://leetcode.com/problems/sudoku-solver/description/",
      world: { connect: { id: _world.id } }
  }
});

const _N_Queens = await prisma.level.create({
  data: {
      title: "N-Queens",
      description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.",
      type: "PROBLEM",
      color: "RED",
      name: "6",
      x_position: 650,
      y_position: 650,
      leetcode_url: "https://leetcode.com/problems/n-queens/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Subsets.id },
    data: {
        prerequisites: { connect: [{ id: _Getting_Familiar.id }] }
    }
});
await prisma.level.update({
    where: { id: _Subsets_II.id },
    data: {
        prerequisites: { connect: [{ id: _Subsets.id }] }
    }
});
await prisma.level.update({
    where: { id: _Permutations.id },
    data: {
        prerequisites: { connect: [{ id: _Subsets.id }] }
    }
});
await prisma.level.update({
    where: { id: _Permutations_II.id },
    data: {
        prerequisites: { connect: [{ id: _Permutations.id }] }
    }
});
await prisma.level.update({
    where: { id: _Combination_Sum.id },
    data: {
        prerequisites: { connect: [{ id: _Permutations.id }] }
    }
});
await prisma.level.update({
    where: { id: _Combination_Sum_II.id },
    data: {
        prerequisites: { connect: [{ id: _Combination_Sum.id }] }
    }
});
await prisma.level.update({
    where: { id: _Combination_Sum_III.id },
    data: {
        prerequisites: { connect: [{ id: _Combination_Sum_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Combination_Sum_IV.id },
    data: {
        prerequisites: { connect: [{ id: _Combination_Sum_III.id }] }
    }
});
await prisma.level.update({
    where: { id: _Generate_Parentheses.id },
    data: {
        prerequisites: { connect: [{ id: _Combination_Sum.id }] }
    }
});
await prisma.level.update({
    where: { id: _Unique_Binary_Search_Trees.id },
    data: {
        prerequisites: { connect: [{ id: _Generate_Parentheses.id }] }
    }
});
await prisma.level.update({
    where: { id: _Unique_Binary_Search_Trees_II.id },
    data: {
        prerequisites: { connect: [{ id: _Unique_Binary_Search_Trees.id }] }
    }
});
await prisma.level.update({
    where: { id: _Sudoku_Solver.id },
    data: {
        prerequisites: { connect: [{ id: _Unique_Binary_Search_Trees.id }] }
    }
});
await prisma.level.update({
    where: { id: _N_Queens.id },
    data: {
        prerequisites: { connect: [{ id: _Unique_Binary_Search_Trees.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Getting_Familiar.id},
                    {id: _Subsets.id},
                    {id: _Subsets_II.id},
                    {id: _Permutations.id},
                    {id: _Permutations_II.id},
                    {id: _Combination_Sum.id},
                    {id: _Combination_Sum_II.id},
                    {id: _Combination_Sum_III.id},
                    {id: _Combination_Sum_IV.id},
                    {id: _Generate_Parentheses.id},
                    {id: _Unique_Binary_Search_Trees.id},
                    {id: _Unique_Binary_Search_Trees_II.id},
                    {id: _Sudoku_Solver.id},
                    {id: _N_Queens.id}],
      },
  },
});
