from collections import Counter
def isAnagram(self, s: str, t: str) -> bool:
    return Counter(s) == Counter(t) # (1 - B) Counter, (1 - C) Counter Operations
    # s = Counter(s) # Map Counting
    # t = Counter(t) # Map Counting
    # return s == t # Map Comparison: Equal