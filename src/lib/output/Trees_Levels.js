
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: "Trees"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
const _Tree_Basics = await prisma.level.create({
  data: {
      title: "Tree Basics",
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

const _Binary_Tree_Preorder_Traversal = await prisma.level.create({
  data: {
      title: "Binary Tree Preorder Traversal",
      description: "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
      type: "PROBLEM",
      color: "GREEN",
      name: "1",
      x_position: 120,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/binary-tree-preorder-traversal/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Binary_Tree_Inorder_Traversal = await prisma.level.create({
  data: {
      title: "Binary Tree Inorder Traversal",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      type: "PROBLEM",
      color: "GREEN",
      name: "2",
      x_position: 220,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
      world: { connect: { id: _world.id } }
  }
});

const _Binary_Tree_Postorder_Traversal = await prisma.level.create({
  data: {
      title: "Binary Tree Postorder Traversal",
      description: "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
      type: "PROBLEM",
      color: "GREEN",
      name: "3",
      x_position: 320,
      y_position: 20,
      leetcode_url: "https://leetcode.com/problems/binary-tree-postorder-traversal/description/",
      world: { connect: { id: _world.id } }
  }
});

await prisma.level.update({
    where: { id: _Binary_Tree_Preorder_Traversal.id },
    data: {
        prerequisites: { connect: [{ id: _Tree_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Binary_Tree_Inorder_Traversal.id },
    data: {
        prerequisites: { connect: [{ id: _Tree_Basics.id }] }
    }
});
await prisma.level.update({
    where: { id: _Binary_Tree_Postorder_Traversal.id },
    data: {
        prerequisites: { connect: [{ id: _Tree_Basics.id }] }
    }
});
await prisma.world.update({
  where: {
      id: _world.id,
  },
  data: {
      levels: {
          connect: [{id: _Tree_Basics.id},
                    {id: _Binary_Tree_Preorder_Traversal.id},
                    {id: _Binary_Tree_Inorder_Traversal.id},
                    {id: _Binary_Tree_Postorder_Traversal.id}],
      },
  },
});
