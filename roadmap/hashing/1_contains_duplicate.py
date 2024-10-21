# 1. Optimal Solution, Less Intuitive (O(n))
def containsDuplicate(nums):
  s = set()           # (1 - 1) Initialize empty set
  for n in nums:      # (0 - 5) Iterate through each element n in nums
      if n in s:      # (1 - 4) Check if n is in the set
          return True
      s.add(n)        # (1 - 2) Add n to the set
  return False

array1 = [1, 2, 3, 3, 4]
array2 = [1, 2, 3, 4]
print(containsDuplicate(array1))
print(containsDuplicate(array2))

# 2. Other Efficient, More Intuitive Solution (O(n))
def containsDuplicate(nums):
  s = set(nums)         # (1 - 5) Convert nums to a set
  len_nums = len(nums)  # (0 - 6) Get length of nums
  len_set = len(s)      # (1 - 14) Get length of s
  return len_nums != len_set

# 3. Sorting Solution (No Hash Map) (O(nlog(n)))
def containsDuplicate(nums):
  nums.sort()                     # (1 - 7) Sort nums
  for i in range(len(nums) - 1):  # (0 - 5) Iterate through all elements except the last
    if nums[i] == nums[i + 1]:    # (0 - 2) Check adjacent elements
      return True
  return False

# 4. Nested For Loop (No Hash Map) (O(n^2))
def containsDuplicate(nums):
  for i in range(len(nums) - 1):      # (0 - 5) Iterate through all elements except the last
    for j in range(i + 1, len(nums)): # (0 - 5) Iterate through all elements past the other element
      if nums[i] == nums[j]:          # (0 - 2) Check elements at the indices
        return True
  return False