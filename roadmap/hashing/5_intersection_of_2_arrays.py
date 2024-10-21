def intersection(nums1, nums2):
  # return set(nums1) & set(nums2)

  set1 = set(nums1) # (1 - 5) Convert nums1 to a set
  set2 = set(nums2) # (1 - 5) Convert nums2 to a set
  return set1 & set2 # (1 - 7) Return the intersection of the two sets