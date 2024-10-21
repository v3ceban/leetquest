from collections import Counter
def canConstruct(self, ransomNote: str, magazine: str) -> bool:
  return Counter(magazine) >= Counter(ransomNote)
  # note = Counter(ransomNote) # Map Counting
  # mag = Counter(magazine) # Map Counting

  # # Map Comparison: Submap
  # for n in note:
  #     if mag[n] < note[n]:
  #         return False
  # return True