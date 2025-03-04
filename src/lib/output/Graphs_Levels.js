
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Graphs"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Graph_Basics = await prisma.level.create({
  data: {
      title: "Graph Basics",
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

const _Depth_First_Search = await prisma.level.create({
  data: {
      title: "Depth First Search",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "II",
      x_position: 200,
      y_position: 150,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Number_of_Islands = await prisma.level.create({
  data: {
      title: "Number of Islands",
      description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "2",
      x_position: 150,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/number-of-islands/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Surround_Regions = await prisma.level.create({
  data: {
      title: "Surround Regions",
      description: "You are given an m x n matrix board containing letters 'X' and 'O', capture regions of ‘O’ that are surrounded by ‘X’. To capture a surrounded region, replace all 'O's with 'X's in-place within the original board.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "3",
      x_position: 50,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/surrounded-regions/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Max_Area_of_Island = await prisma.level.create({
  data: {
      title: "Max Area of Island",
      description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the size of the largest island.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 150,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/max-area-of-island/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Clone_Graph = await prisma.level.create({
  data: {
      title: "Clone Graph",
      description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 150,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/clone-graph/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Breadth_First_Search = await prisma.level.create({
  data: {
      title: "Breadth First Search",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 300,
      y_position: 150,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Keys_and_Rooms = await prisma.level.create({
  data: {
      title: "Keys and Rooms",
      description: "Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "1",
      x_position: 250,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/keys-and-rooms/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Rotting_Oranges = await prisma.level.create({
  data: {
      title: "Rotting Oranges",
      description: "Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "5",
      x_position: 350,
      y_position: 250,
      leetcode_url: "https://leetcode.com/problems/rotting-oranges/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Course_Schedule = await prisma.level.create({
  data: {
      title: "Course Schedule",
      description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "6",
      x_position: 350,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/course-schedule/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Course_Schedule_II = await prisma.level.create({
  data: {
      title: "Course Schedule II",
      description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return any valid order of classes that can be taken.",
      type: "BONUS",
      color: "YELLOW",
      name: "B",
      x_position: 450,
      y_position: 350,
      leetcode_url: "https://leetcode.com/problems/course-schedule/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Word_Ladder = await prisma.level.create({
  data: {
      title: "Word Ladder",
      description: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
      type: "BONUS",
      color: "RED",
      name: "C",
      x_position: 350,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/word-ladder/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Word_Ladder_II = await prisma.level.create({
  data: {
      title: "Word Ladder II",
      description: "Given two words, beginWord and endWord, and a dictionary wordList, return ALL of the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists.",
      type: "BONUS",
      color: "RED",
      name: "D",
      x_position: 450,
      y_position: 450,
      leetcode_url: "https://leetcode.com/problems/word-ladder-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Depth_First_Search.id },
    data: {
        prerequisites: { connect: [{ id: _Graph_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Number_of_Islands.id },
    data: {
        prerequisites: { connect: [{ id: _Depth_First_Search.id }] }
    }
});
await prisma.level.update({
    where: { id: _Surround_Regions.id },
    data: {
        prerequisites: { connect: [{ id: _Number_of_Islands.id }] }
    }
});
await prisma.level.update({
    where: { id: _Max_Area_of_Island.id },
    data: {
        prerequisites: { connect: [{ id: _Number_of_Islands.id }] }
    }
});
await prisma.level.update({
    where: { id: _Clone_Graph.id },
    data: {
        prerequisites: { connect: [{ id: _Max_Area_of_Island.id }] }
    }
});
await prisma.level.update({
    where: { id: _Breadth_First_Search.id },
    data: {
        prerequisites: { connect: [{ id: _Graph_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Keys_and_Rooms.id },
    data: {
        prerequisites: { connect: [{ id: _Depth_First_Search.id }, { id: _Breadth_First_Search.id }] }
    }
});
await prisma.level.update({
    where: { id: _Rotting_Oranges.id },
    data: {
        prerequisites: { connect: [{ id: _Breadth_First_Search.id }] }
    }
});
await prisma.level.update({
    where: { id: _Course_Schedule.id },
    data: {
        prerequisites: { connect: [{ id: _Rotting_Oranges.id }] }
    }
});
await prisma.level.update({
    where: { id: _Course_Schedule_II.id },
    data: {
        prerequisites: { connect: [{ id: _Course_Schedule.id }] }
    }
});
await prisma.level.update({
    where: { id: _Word_Ladder.id },
    data: {
        prerequisites: { connect: [{ id: _Course_Schedule.id }] }
    }
});
await prisma.level.update({
    where: { id: _Word_Ladder_II.id },
    data: {
        prerequisites: { connect: [{ id: _Word_Ladder.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Graph_Basics.id},
                    {id: _Depth_First_Search.id},
                    {id: _Number_of_Islands.id},
                    {id: _Surround_Regions.id},
                    {id: _Max_Area_of_Island.id},
                    {id: _Clone_Graph.id},
                    {id: _Breadth_First_Search.id},
                    {id: _Keys_and_Rooms.id},
                    {id: _Rotting_Oranges.id},
                    {id: _Course_Schedule.id},
                    {id: _Course_Schedule_II.id},
                    {id: _Word_Ladder.id},
                    {id: _Word_Ladder_II.id}],
      },
  },
});
