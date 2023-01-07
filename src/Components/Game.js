import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../CalculateWinner";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null)); // initial state of the board

  const [history, setHistory] = useState([Array(9).fill(null)]); // jumping from one state to another and each element in the array will represent the board at that state
  /*For ex: history[0] represents the board after 1 move and history[1] represents the board after move 2*/

  const [stepNumber, setStepNumber] = useState(0); // represents what element we're on in history
  // history[stepNumber] will equal the board at a particular state

  const [xIsNext, setXIsNext] = useState(true); // to determine whether x plays next
  const [moves, setMoves] = useState(0);
  const winner = calculateWinner(board); // passing in history[stepNumber] will give the updated winner based on the state of the board

  const style = {
    width: "200px",
    margin: "35px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleClick = (i) => {
    const copy = [...board]; // make a copy because state is being mutated
    if (winner || copy[i]) return; // if a value already exists in a square or winner return
    copy[i] = xIsNext ? "X" : "O"; // determining whether to put an X or O in the square
    setBoard(copy); // updating board state to reflect new changes
    setMoves((prevMoves) => prevMoves + 1);
    setXIsNext(!xIsNext); // alternating between X and O
  };

  const jumpTo = () => {
  };

  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div style={style}>
        <p>
          {winner
            ? "Winner: " + winner
            : "Next player: " + (xIsNext ? "X" : "O")}
        </p>
        <p>Moves made so far: {moves}</p>
        {winner ? (
          <button
            onClick={() => {
              setBoard(Array(9).fill(null));
              setXIsNext(true);
              setMoves(0);
            }}
          >
            Re-Start game
          </button>
        ) : null}
      </div>
    </>
  );
}
