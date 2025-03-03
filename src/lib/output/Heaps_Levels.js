
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Heaps"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Heap_Basics = await prisma.level.create({
  data: {
      title: "Heap Basics",
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

const _Last_Stone_Weight = await prisma.level.create({
  data: {
      title: "Last Stone Weight",
      description: "“You are given an array of integers stones where stones[i] is the weight of the ith stone. On each turn, choose the heaviest two stones and smash them together, leaving the difference in the weights as a new stone. At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 120,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/last-stone-weight/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Kth_Largest_Element_in_an_Array = await prisma.level.create({
  data: {
      title: "Kth Largest Element in an Array",
      description: "Given an integer array nums and an integer k, return the kth largest element in the array without sorting the array.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "2",
      x_position: 20,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/kth-largest-element-in-an-array/description/",
      world: { connect: { id: _world.id } }
  }
});

const _K_Closest_Points_to_Origin = await prisma.level.create({
  data: {
      title: "K Closest Points to Origin",
      description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
      type: "PROBLEM",
      color: "YELLOW",
      name: "3",
      x_position: 120,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/task-scheduler/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Task_Scheduler = await prisma.level.create({
  data: {
      title: "Task Scheduler",
      description: "You are given an array of CPU tasks and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there has to be a gap of at least n intervals between two tasks with the same label. Return the minimum number of CPU intervals required to complete all tasks.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 220,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/task-scheduler/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Find_Median_From_Data_Stream = await prisma.level.create({
  data: {
      title: "Find Median From Data Stream",
      description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class.",
      type: "BONUS",
      color: "RED",
      name: "A",
      x_position: 120,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/find-median-from-data-stream/description/",
      world: { connect: { id: _world.id } }
  }
});

const _IPO = await prisma.level.create({
  data: {
      title: "IPO",
      description: "You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it. Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital. Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.",
      type: "BONUS",
      color: "RED",
      name: "B",
      x_position: 320,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/ipo/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Last_Stone_Weight.id },
    data: {
        prerequisites: { connect: [{ id: _Heap_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Kth_Largest_Element_in_an_Array.id },
    data: {
        prerequisites: { connect: [{ id: _Last_Stone_Weight.id }] }
    }
});
await prisma.level.update({
    where: { id: _K_Closest_Points_to_Origin.id },
    data: {
        prerequisites: { connect: [{ id: _Kth_Largest_Element_in_an_Array.id }] }
    }
});
await prisma.level.update({
    where: { id: _Task_Scheduler.id },
    data: {
        prerequisites: { connect: [{ id: _K_Closest_Points_to_Origin.id }] }
    }
});
await prisma.level.update({
    where: { id: _Find_Median_From_Data_Stream.id },
    data: {
        prerequisites: { connect: [{ id: _Task_Scheduler.id }] }
    }
});
await prisma.level.update({
    where: { id: _IPO.id },
    data: {
        prerequisites: { connect: [{ id: _Task_Scheduler.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Heap_Basics.id},
                    {id: _Last_Stone_Weight.id},
                    {id: _Kth_Largest_Element_in_an_Array.id},
                    {id: _K_Closest_Points_to_Origin.id},
                    {id: _Task_Scheduler.id},
                    {id: _Find_Median_From_Data_Stream.id},
                    {id: _IPO.id}],
      },
  },
});
