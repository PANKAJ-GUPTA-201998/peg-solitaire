export function isValidMove(board, sr, sc, tr, tc) {

  const dr = tr - sr
  const dc = tc - sc

  // move must be 2 steps in straight line
  if ((Math.abs(dr) === 2 && dc === 0) || (Math.abs(dc) === 2 && dr === 0)) {

    const mr = sr + dr / 2
    const mc = sc + dc / 2

    // middle must have marble and target must be empty
    if (board[mr][mc] === 1 && board[tr][tc] === 0) {
      return true
    }

  }

  return false
}


export function makeMove(board, sr, sc, tr, tc) {

  const dr = tr - sr
  const dc = tc - sc

  const mr = sr + dr / 2
  const mc = sc + dc / 2

  const newBoard = board.map(row => [...row])

  newBoard[sr][sc] = 0
  newBoard[mr][mc] = 0
  newBoard[tr][tc] = 1

  return newBoard
}