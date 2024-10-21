def containsNearbyDuplicate(nums, k):
  hsh = {} # Initialize Empty Map
  for i in range(len(nums)): # For Loop
      if nums[i] in hsh and i - hsh[nums[i]] <= k: # Get Key Value
          return True
      hsh[nums[i]] = i # Set Key Value
  return False