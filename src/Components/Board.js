import React, {useState, useEffect} from "react";
import Square from "./Square";

export default function Board({ squares, onClick, winner, combination, isDraw }) {

  const [winningSquares, setWinningSquares] = useState([])

  useEffect(() => {
    if (combination != null){
      setWinningSquares(prevWinningSquares => {
        const matchedSquares = combination.map(winningSquare => (
          {
            match: winningSquare,
            isHighlighted: true
          }
        ))
        return [...prevWinningSquares, ...matchedSquares]
      })
    }
  }, [combination])

  return (
    <div className = "gridStyle">
      {squares.map((val, idx) => {
        let currentSquare = idx;
        let isHighlighted = winningSquares.some(winningElem => winningElem.match === currentSquare);
        return <Square key={currentSquare} value={val} onClick={() => onClick(currentSquare)} winner = {winner} isHighlighted = {isHighlighted} isDraw = {isDraw}/>
      })}
    </div>
  );
}