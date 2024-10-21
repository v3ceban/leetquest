from collections import Counter
def majorityElementII(nums) -> int:
  hsh = Counter(nums) # (1 - B) Counter
  threshold = len(nums) / 3 # Array Length
  output = [] # Initialize Empty Array
  for h in hsh: # Iterate Through Map Keys
      if hsh[h] > threshold: # Getting Key Value
          output.append(h) # Append to Array
  return output