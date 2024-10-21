def isValidSudoku(board):
  rows = [set(), set(), set(), set(), set(), set(), set(), set(), set()]
  cols = [set(), set(), set(), set(), set(), set(), set(), set(), set()]
  boxes = [set(), set(), set(), set(), set(), set(), set(), set(), set()]
  for i in range(len(board)):
      for j in range(len(board[0])):
          if board[i][j] == ".":
              continue
          if board[i][j] in rows[i] or board[i][j] in cols[j] or board[i][j] in boxes[((i // 3) * 3) + (j // 3)]:
              return False
          rows[i].add(board[i][j])
          cols[j].add(board[i][j])
          boxes[((i // 3) * 3) + (j // 3)].add(board[i][j])
  return True