def findDisappearedNumbers(nums):
  output = []               # (0 - 1) Initialize Empty Array
  s = set()                 # (1 - 1) Initialize empty set
  n = len(nums) + 1         # (0 - 6) Get length of nums + 1
  for num in nums:          # (0 - 5) Iterate through all elements in nums
      s.add(num)            # (1 - 2) Add num to the set

  for i in range(1, n):     # (0 - 5) Iterate through all numbers before n
      if i not in s:        # (1 - 4) Check if n is NOT in the set
          output.append(i)  # (0 - 3) Append to Array
  return output