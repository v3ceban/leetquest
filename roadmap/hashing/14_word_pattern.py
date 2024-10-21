def wordPattern(pattern, s):
  hsh = {} # Initialize Empty Map
  hsh2 = {} # Initialize Empty Map
  s = s.split() # String to List
  if len(pattern) != len(s): # Length of Array
      return False
  for i in range(len(s)): # For Loop
      if pattern[i] not in hsh and s[i] not in hsh2: # Checking if Key in Map
          hsh[pattern[i]] = s[i] # Setting Key Value Pair
          hsh2[s[i]] = pattern[i] # Setting Key Value Pair
      elif pattern[i] not in hsh or hsh[pattern[i]] != s[i] or s[i] not in hsh2 or hsh2[s[i]] != pattern[i]: # Getting Key Value, Not in Map
          return False
  return True