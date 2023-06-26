/* Function borrowed from this resource with minor modifications: https://reactjs.org/tutorial/tutorial.html*/
/* Traverses through all possible winning combinations and determines the winner based off of that */

export function calculateWinner(squares) {
  const lines = [
    // All the winning combinations
      // 1st 3: Row major traversal(L --> R)
      // 2nd 3: Column major traversal(T --> B)
      // Last 2: Diagonal traversal(TL --> BR && TR --> BL)
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; 
  for (let i = 0; i < Math.max(...lines.map(arr => arr[arr.length - 1])); i++) {
    for (let j = 0; j < lines.length; j++) {
      if (squares[lines[j][i]] && squares[lines[j][i]] === squares[lines[j][i+1]] && squares[lines[j][i]] === squares[lines[j][i+2]]) {
        return squares[lines[j][i]];
      }
    }
  }
  return null;
}