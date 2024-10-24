def intToRoman(self, num: int) -> str:
  thresholds = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1, 0] # Initialize Preset Array
  i = 0
  output = ""
  mapping = { # Initialize Preset Map
      0: "M",
      1: "CM",
      2: "D",
      3: "CD",
      4: "C",
      5: "XC",
      6: "L",
      7: "XL",
      8: "X",
      9: "IX",
      10: "V",
      11: "IV",
      12: "I"
  }
  while num > 0:
      while num >= thresholds[i]:
          output = output + mapping[i] # Get Map Value
          num -= thresholds[i] # Get Array Value
      while num < thresholds[i]:
          i += 1
  return output