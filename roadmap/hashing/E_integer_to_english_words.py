def numberToWords(self, num):
  if not num:
      return "Zero"
  str_num = str(num)
  digits = len(str_num)
  mag = 0
  mags = {
      0: "",
      1: " Thousand",
      2: " Million",
      3: " Billion"
  }
  second_digit = {
      "0": "",
      "2": " Twenty",
      "3": " Thirty",
      "4": " Forty",
      "5": " Fifty",
      "6": " Sixty",
      "7": " Seventy",
      "8": " Eighty",
      "9": " Ninety"
  }
  tens = {
      "10": " Ten",
      "11": " Eleven",
      "12": " Twelve",
      "13": " Thirteen",
      "14": " Fourteen",
      "15": " Fifteen",
      "16": " Sixteen",
      "17": " Seventeen",
      "18": " Eighteen",
      "19": " Nineteen",
  }
  digit = {
      "0": "",
      "1": " One",
      "2": " Two",
      "3": " Three",
      "4": " Four",
      "5": " Five",
      "6": " Six",
      "7": " Seven",
      "8": " Eight",
      "9": " Nine",
  }
  output = ""
  while digits > 0:
      temp = ""
      if digits > 2:
          temp = str_num[-3:]
      else:
          temp = str_num
          while len(temp) < 3:
              temp = "0" + temp
      if temp == "000":
          mag += 1
          digits -= 3
          str_num = str_num[:-3]
          continue
      output = mags[mag] + output
      if temp[1] == "1":
          output = tens[temp[1:]] + output
      else:
          output = digit[temp[2]] + output
          output = second_digit[temp[1]] + output
      if temp[0] != "0":
          output = digit[temp[0]] + " Hundred" + output
      mag += 1
      digits -= 3
      str_num = str_num[:-3]
  return output[1:]