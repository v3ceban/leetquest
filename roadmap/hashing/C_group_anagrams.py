from collections import defaultdict
def groupAnagrams(strs):
  hsh = defaultdict(list) # Initialize Empty Map
  for s in strs: # For Each Loop
      hsh["".join(sorted(list(s)))].append(s) # String to List, Sort List, List to String, Set Map Key
  return list(hsh.values()) # Map Values