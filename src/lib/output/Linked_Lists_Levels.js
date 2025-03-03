
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Linked Lists"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Linked_List_Basics = await prisma.level.create({
  data: {
      title: "Linked List Basics",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "I",
      x_position: 20,
      y_position: 120,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Linked_List_Elements = await prisma.level.create({
  data: {
      title: "Remove Linked List Elements",
      description: "Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 120,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/remove-linked-list-elements/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Duplicates_from_Sorted_List = await prisma.level.create({
  data: {
      title: "Remove Duplicates from Sorted List",
      description: "Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 220,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Multiple_Pointers = await prisma.level.create({
  data: {
      title: "Multiple Pointers",
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

const _Reverse_Linked_List = await prisma.level.create({
  data: {
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 420,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/reverse-linked-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Duplicates_from_Sorted_List_II = await prisma.level.create({
  data: {
      title: "Remove Duplicates from Sorted List II",
      description: "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.",
      type: "BONUS",
      color: "YELLOW",
      name: "A",
      x_position: 520,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Reverse_Linked_List_II = await prisma.level.create({
  data: {
      title: "Reverse Linked List II",
      description: "Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "4",
      x_position: 520,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/reverse-linked-list-ii/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Reverse_Nodes_in_k_Group = await prisma.level.create({
  data: {
      title: "Reverse Nodes in k-Group",
      description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.",
      type: "BONUS",
      color: "RED",
      name: "B",
      x_position: 620,
      y_position: 120,
      leetcode_url: "https://leetcode.com/problems/reverse-nodes-in-k-group/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Swap_Nodes_in_Pairs = await prisma.level.create({
  data: {
      title: "Swap Nodes in Pairs",
      description: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
      type: "PROBLEM",
      color: "YELLOW",
      name: "5",
      x_position: 520,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/swap-nodes-in-pairs/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Odd_Even_Linked_List = await prisma.level.create({
  data: {
      title: "Odd Even Linked List",
      description: "Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "6",
      x_position: 620,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/odd-even-linked-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Partition_List = await prisma.level.create({
  data: {
      title: "Partition List",
      description: "Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.",
      type: "BONUS",
      color: "YELLOW",
      name: "C",
      x_position: 720,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/partition-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Remove_Nth_Node_From_End_of_List = await prisma.level.create({
  data: {
      title: "Remove Nth Node From End of List",
      description: "Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "7",
      x_position: 620,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Rotate_List = await prisma.level.create({
  data: {
      title: "Rotate List",
      description: "Given the head of a linked list, rotate the list to the right by k places.",
      type: "PROBLEM",
      color: "YELLOW",
      name: "8",
      x_position: 720,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/rotate-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Slow_and_Fast_Pointers = await prisma.level.create({
  data: {
      title: "Slow and Fast Pointers",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "III",
      x_position: 720,
      y_position: 420,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Middle_of_the_Linked_List = await prisma.level.create({
  data: {
      title: "Middle of the Linked List",
      description: "Given the head of a singly linked list, return the middle node of the linked list.",
      type: "PROBLEM",
      color: "GREEN",
      name: "9",
      x_position: 820,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/middle-of-the-linked-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Palindrome_Linked_List = await prisma.level.create({
  data: {
      title: "Palindrome Linked List",
      description: "“Given the head of a singly linked list, return true if it is a palindrome or false otherwise.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "10",
      x_position: 820,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/palindrome-linked-list/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Linked_List_Cycle = await prisma.level.create({
  data: {
      title: "Linked List Cycle",
      description: "“Given head, the head of a linked list, determine if the linked list has a cycle in it.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "11",
      x_position: 920,
      y_position: 420,
      leetcode_url: "https://leetcode.com/problems/linked-list-cycle/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Linked_List_Cycle_II = await prisma.level.create({
  data: {
      title: "Linked List Cycle II",
      description: "“Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.“",
      type: "BONUS",
      color: "YELLOW",
      name: "D",
      x_position: 920,
      y_position: 520,
      leetcode_url: "https://leetcode.com/problems/linked-list-cycle/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Multiple_Lists = await prisma.level.create({
  data: {
      title: "Multiple Lists",
      description: "None",
      type: "LEARN",
      color: "BLUE",
      name: "IV",
      x_position: 820,
      y_position: 320,
      leetcode_url: null,
      world: { connect: { id: _world.id } }
  }
});

const _Merge_Two_Sorted_Lists = await prisma.level.create({
  data: {
      title: "Merge Two Sorted Lists",
      description: "“You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.“",
      type: "PROBLEM",
      color: "GREEN",
      name: "12",
      x_position: 1020,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/merge-two-sorted-lists/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Intersection_of_Two_Linked_Lists = await prisma.level.create({
  data: {
      title: "Intersection of Two Linked Lists",
      description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
      type: "PROBLEM",
      color: "GREEN",
      name: "13",
      x_position: 1020,
      y_position: 220,
      leetcode_url: "https://leetcode.com/problems/intersection-of-two-linked-lists/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Merge_k_Sorted_Lists = await prisma.level.create({
  data: {
      title: "Merge k Sorted Lists",
      description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
      type: "BONUS",
      color: "RED",
      name: "E",
      x_position: 1120,
      y_position: 320,
      leetcode_url: "https://leetcode.com/problems/intersection-of-two-linked-lists/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Reorder_List = await prisma.level.create({
  data: {
      title: "Reorder List",
      description: "Given a linked list of length n, reorder the list so that the order is L1, Ln, L2, Ln-1, L3, Ln-2 …",
      type: "BONUS",
      color: "YELLOW",
      name: "F",
      x_position: 920,
      y_position: 1020,
      leetcode_url: "https://leetcode.com/problems/reorder-list/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Remove_Linked_List_Elements.id },
    data: {
        prerequisites: { connect: [{ id: _Linked_List_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_Duplicates_from_Sorted_List.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Linked_List_Elements.id }] }
    }
});
await prisma.level.update({
    where: { id: _Multiple_Pointers.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Duplicates_from_Sorted_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Linked_List.id },
    data: {
        prerequisites: { connect: [{ id: _Multiple_Pointers.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_Duplicates_from_Sorted_List_II.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Linked_List_II.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reverse_Nodes_in_k_Group.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Linked_List_II.id }] }
    }
});
await prisma.level.update({
    where: { id: _Swap_Nodes_in_Pairs.id },
    data: {
        prerequisites: { connect: [{ id: _Reverse_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Odd_Even_Linked_List.id },
    data: {
        prerequisites: { connect: [{ id: _Swap_Nodes_in_Pairs.id }] }
    }
});
await prisma.level.update({
    where: { id: _Partition_List.id },
    data: {
        prerequisites: { connect: [{ id: _Odd_Even_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Remove_Nth_Node_From_End_of_List.id },
    data: {
        prerequisites: { connect: [{ id: _Swap_Nodes_in_Pairs.id }] }
    }
});
await prisma.level.update({
    where: { id: _Rotate_List.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Nth_Node_From_End_of_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Slow_and_Fast_Pointers.id },
    data: {
        prerequisites: { connect: [{ id: _Remove_Nth_Node_From_End_of_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Middle_of_the_Linked_List.id },
    data: {
        prerequisites: { connect: [{ id: _Slow_and_Fast_Pointers.id }] }
    }
});
await prisma.level.update({
    where: { id: _Palindrome_Linked_List.id },
    data: {
        prerequisites: { connect: [{ id: _Middle_of_the_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Linked_List_Cycle.id },
    data: {
        prerequisites: { connect: [{ id: _Middle_of_the_Linked_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Linked_List_Cycle_II.id },
    data: {
        prerequisites: { connect: [{ id: _Linked_List_Cycle.id }] }
    }
});
await prisma.level.update({
    where: { id: _Multiple_Lists.id },
    data: {
        prerequisites: { connect: [{ id: _Rotate_List.id }] }
    }
});
await prisma.level.update({
    where: { id: _Merge_Two_Sorted_Lists.id },
    data: {
        prerequisites: { connect: [{ id: _Multiple_Lists.id }] }
    }
});
await prisma.level.update({
    where: { id: _Intersection_of_Two_Linked_Lists.id },
    data: {
        prerequisites: { connect: [{ id: _Merge_Two_Sorted_Lists.id }] }
    }
});
await prisma.level.update({
    where: { id: _Merge_k_Sorted_Lists.id },
    data: {
        prerequisites: { connect: [{ id: _Merge_Two_Sorted_Lists.id }] }
    }
});
await prisma.level.update({
    where: { id: _Reorder_List.id },
    data: {
        prerequisites: { connect: [{ id: _Middle_of_the_Linked_List.id }, { id: _Reverse_Linked_List.id }, { id: _Merge_Two_Sorted_Lists.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Linked_List_Basics.id},
                    {id: _Remove_Linked_List_Elements.id},
                    {id: _Remove_Duplicates_from_Sorted_List.id},
                    {id: _Multiple_Pointers.id},
                    {id: _Reverse_Linked_List.id},
                    {id: _Remove_Duplicates_from_Sorted_List_II.id},
                    {id: _Reverse_Linked_List_II.id},
                    {id: _Reverse_Nodes_in_k_Group.id},
                    {id: _Swap_Nodes_in_Pairs.id},
                    {id: _Odd_Even_Linked_List.id},
                    {id: _Partition_List.id},
                    {id: _Remove_Nth_Node_From_End_of_List.id},
                    {id: _Rotate_List.id},
                    {id: _Slow_and_Fast_Pointers.id},
                    {id: _Middle_of_the_Linked_List.id},
                    {id: _Palindrome_Linked_List.id},
                    {id: _Linked_List_Cycle.id},
                    {id: _Linked_List_Cycle_II.id},
                    {id: _Multiple_Lists.id},
                    {id: _Merge_Two_Sorted_Lists.id},
                    {id: _Intersection_of_Two_Linked_Lists.id},
                    {id: _Merge_k_Sorted_Lists.id},
                    {id: _Reorder_List.id}],
      },
  },
});
