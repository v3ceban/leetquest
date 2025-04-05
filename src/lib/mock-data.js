const mockUser = {
  id: "clg1234567",
  email: "john.doe@example.com",
  name: "John Doe",
  picture: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
};

const mockWorlds = [
  {
    id: "w1",
    name: "Arrays & Strings",
    x_position: 0,
    y_position: 0,
    levels: [],
  },
  {
    id: "w2",
    name: "Trees & Graphs",
    x_position: 1,
    y_position: 1,
    levels: [],
  },
  {
    id: "w3",
    name: "Dynamic Programming",
    x_position: 2,
    y_position: 0,
    levels: [],
  },
];

const mockLevels = [
  {
    id: "l1",
    title: "Two Sum",
    description: "Find two numbers that add up to a target",
    type: "PROBLEM",
    color: "BLUE",
    name: "two-sum",
    world_id: "w1",
  },
  {
    id: "l2",
    title: "Binary Tree Traversal",
    description: "Learn different ways to traverse a binary tree",
    type: "LEARN",
    color: "GREEN",
    name: "tree-traversal",
    world_id: "w2",
  },
];

// Helper function to generate past dates
const generateLastYearToNowDates = () => {
  const dates = {};
  const today = new Date();

  // Find the start of the week from last year
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek); // Go to start of week

  let currentDate = new Date(startDate);
  // Generate data until we reach today, ensuring we have complete weeks
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];
    dates[dateStr] = Math.floor(Math.random() * 9);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Add remaining days to complete the last week if necessary
  const remainingDays = 7 - (Object.keys(dates).length % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      dates[dateStr] = Math.floor(Math.random() * 9);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return dates;
};

const mockUserProgress = {
  completedLevels: 15,
  totalLevels: 30,
  unlockedWorlds: 2,
  totalWorlds: 3,
  dailyActivity: generateLastYearToNowDates(),
  recentActivity: [
    {
      id: "act1",
      type: "COMPLETE",
      levelName: "Two Sum",
      worldName: "Arrays & Strings",
      date: "2025-04-03",
    },
    {
      id: "act2",
      type: "UNLOCK",
      levelName: "Binary Tree Traversal",
      worldName: "Trees & Graphs",
      date: "2025-04-02",
    },
  ],
  worldProgress: [
    { worldId: "w1", completed: 8, total: 10 },
    { worldId: "w2", completed: 5, total: 12 },
    { worldId: "w3", completed: 2, total: 8 },
  ],
};

export { mockUser, mockWorlds, mockLevels, mockUserProgress };
