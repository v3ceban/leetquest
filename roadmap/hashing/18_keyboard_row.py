def findWords(words):
  first = "QWERTYUIOPqwertyuiop"
  second = "ASDFGHJKLasdfghjkl"
  third = "ZXCVBNMzxcvbnm"
  first = set(first) # Initialize Filled Map
  second = set(second) # Initialize Filled Map
  third = set(third) # Initialize Filled Map
  output = [] # Initialize Empty Array
  for w in words:
      temp = None
      exclusive = True
      for l in w:
          if not temp:
              if l in first:
                  temp = first
              elif l in second:
                  temp = second
              else:
                  temp = third
          elif l not in temp:
              exclusive = False
              break
      if exclusive:
          output.append(w)
  return output