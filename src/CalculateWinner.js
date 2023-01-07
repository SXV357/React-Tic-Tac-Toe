/*Function utilized from this tutorial: https://reactjs.org/tutorial/tutorial.html*/

export function calculateWinner(squares) {
  // param: current board state
  const lines = [
    // all the possible winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // 1st three(row traversal from L --> R), 2nd three(column traversal from T --> B), last three(diagonal))
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // ES6 destructuring
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // checks if first value whether it's 'X' or 'O' is equal to next 2 spots and returns that value else null
      return squares[a];
    }
  }
  return null;
}
