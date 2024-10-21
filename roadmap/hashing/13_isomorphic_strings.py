def isIsomorphic(s, t):
  hsh = {} # Initialize Empty Map
  hsh2 = {} # Initialize Empty Map
  for i in range(len(s)): # For Loop
      if t[i] not in hsh and s[i] not in hsh2: # Checking if Key in Map
          hsh[t[i]] = s[i] # Setting Key Value Pair
          hsh2[s[i]] = t[i] # Setting Key Value Pair
      elif t[i] not in hsh or hsh[t[i]] != s[i] or s[i] not in hsh2 or hsh2[s[i]] != t[i]: # Getting Key Value, Not in Map
          return False
  return True