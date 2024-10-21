from collections import Counter
def topKFrequent(nums, k):
  hsh = Counter(nums) # Map Counting
  reg = sorted(hsh.items(), key = lambda x: -x[1]) # Map Items, Sorting
  return [reg[i][0] for i in range(k)]