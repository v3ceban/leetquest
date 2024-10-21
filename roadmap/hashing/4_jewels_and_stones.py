def numJewelsInStones(jewels, stones):
  jewels = set(jewels) # (1 - 5) Convert jewels to a set
  output = 0
  for s in stones: # (0 - 5) Iterate through all stones
      if s in jewels: # (1 - 4) Check if stone is in the set
          output += 1
  return output