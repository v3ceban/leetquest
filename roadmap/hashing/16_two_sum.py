def twoSum(nums, target):
  hsh = {} # Initialize Empty 
  for i in range(len(nums)): # For Loop
      if target - nums[i] in hsh: # Get Key Value
          return [i, hsh[target - nums[i]]] # Get Key Value
      hsh[nums[i]] = i # Set Key Value