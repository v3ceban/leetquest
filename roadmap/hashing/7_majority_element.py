from collections import defaultdict
def majorityElement(nums) -> int:
  hsh = defaultdict(int)
  limit = len(nums) // 2
  for n in nums:
      hsh[n] += 1
      if hsh[n] > limit:
          return n