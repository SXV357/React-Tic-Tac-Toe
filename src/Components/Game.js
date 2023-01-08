import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../CalculateWinner";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // jumping from one state to another and each element in the array will represent the board at that state
  /*For ex: history[0] represents the board after 1 move and history[1] represents the board after move 2*/

  const [stepNumber, setStepNumber] = useState(0); // represents what element we're on in history
  // history[stepNumber] will equal the board at a particular state

  const [xIsNext, setXIsNext] = useState(true); // to determine whether x plays next
  
  const [moves, setMoves] = useState(0);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const winner = calculateWinner(history[stepNumber]); // passing in history[stepNumber] will give the updated winner based on the state of the board

  const style = {
    width: "350px",
    maxWidth: "100%",
    margin: "35px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  };

  const divStyle = {
    display: "flex",
    gap: "30px",
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    if (winner == "X") {
      setXScore((prevScore) => prevScore + 1);
    } else if (winner == "Y") {
      setOScore((prevScore) => prevScore + 1);
    }
  }, [winner]);

  function handleClick(i) {
    // slice out history that's not needed(since jumping from one state to another, don't need to save states after the current one: The current one will keep changing based on the moves the user makes)
    const timeInHistory = history.slice(0, stepNumber + 1); // yields most current state

    const currentMove = timeInHistory[stepNumber]; // most current move(since timeInHistory stores states only after the most current stepNumber)

    const copy = [...currentMove]; // make a copy because state is being mutated

    if (winner || copy[i]) return; // if a value already exists in a square or winner return

    copy[i] = xIsNext ? "X" : "O"; // determining whether to put an X or O in the square

    setHistory([...timeInHistory, copy]); // want to update state as well as most current state
    // adding copy at the end will add one array to history

    setStepNumber(timeInHistory.length); // will keep adding up as new moves are made now that copy is being added

    setMoves((prevMoves) => prevMoves + 1);

    setXIsNext(!xIsNext); // alternating between X and O
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const buttonText = move ? `Go to move #${move}` : "Go to the beginning";
      return (
        <li
          key={move}
          style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "row",
            maxWidth: "300px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => {
              setStepNumber(move);
              setXIsNext(move % 2 === 0); // if even then false, if odd then true because O goes after X
              // ensure that the value for XisNext keeps getting updated as we step from one state to the other
            }}
          >
            {buttonText}
          </button>
        </li>
      );
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={style}>
        <button
          disabled={winner ? false : true}
          onClick={() => {
            setHistory([Array(9).fill(null)]);
            setStepNumber(0);
            setXIsNext(true);
            setMoves(0);
          }}
        >
          Re-start game
        </button>
        <div style={divStyle}>
          <h3>
            {winner
              ? "Winner: " + winner
              : "Next player: " + (xIsNext ? "X" : "O")}
          </h3>
          <h3>Moves made so far: {moves}</h3>
        </div>
        <div style={divStyle}>
          <h4>X-score: {xScore}</h4>
          <h4>O-score: {oScore}</h4>
          <button
            onClick={() => {
              setXScore(0);
              setOScore(0);
            }}
          >
            Reset Scores
          </button>
        </div>
        {renderMoves()}
      </div>
    </div>
  );
}
