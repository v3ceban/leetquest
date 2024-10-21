def missingNumber(nums):
  s = set()           # (1 - 1) Initialize empty set
  n = len(nums) + 1   # (0 - 6) Get length of nums + 1
  for num in nums:    # (0 - 5) Iterate through all elements in nums
      s.add(num)      # (1 - 2) Add num to the set

  for i in range(n):  # (0 - 5) Iterate through all numbers before n
      if i not in s:  # (1 - 4) Check if n is NOT in the set
          return i