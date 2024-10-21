from collections import Counter
def singleNumber(nums) -> int:
  hsh = Counter(nums) # (1 - B) Counter
  for h in hsh: # (1 - 13) Iterate through all stones
      if hsh[h] == 1: # (1 - 11) Check if count of
          return h