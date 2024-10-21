def romanToInt(s):
  output = 0
  special_mapping = { # Initialize Filled Map
      "IV": 4,
      "IX": 9,
      "XL": 40,
      "XC": 90,
      "CD": 400,
      "CM": 900
  }
  mapping = { # Initialize Filled Map
      "I": 1,
      "V": 5,
      "X": 10,
      "L": 50,
      "C": 100,
      "D": 500,
      "M": 1000,
  }
  i = 0
  while i < len(s):
      if s[i:i + 2] in special_mapping:
          output += special_mapping[s[i:i + 2]]
          i += 2
      else:
          output += mapping[s[i]]
          i += 1
  return output