from collections import Counter
def intersect(nums1, nums2):
  hsh1 = Counter(nums1) # Map Counting
  hsh2 = Counter(nums2) # Map Counting
  output = [] # Initialize Empty Array
  intersection = hsh1 & hsh2 # Map Operations: Intersection
  for i in intersection:
      output = output + ([i] * intersection[i])
  return output