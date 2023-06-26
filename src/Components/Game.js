import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../CalculateWinner";

export default function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    row: null,
    col: null
  }]); // jumping from one state to another and each element in the array will represent the board at that state
  /*For ex: history[0] represents the board after 1 move and history[1] represents the board after move 2*/

  const [stepNumber, setStepNumber] = useState(0); // represents what element we're on in history
  // history[stepNumber] will equal the board at a particular state

  const [xIsNext, setXIsNext] = useState(true); // to determine whether x plays next

  const [moves, setMoves] = useState(0);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [textArr, setTextArr] = useState([])
  const [inAscending, setInAscending] = useState(true)

  const winner = calculateWinner(history[stepNumber].squares); // passing in history[stepNumber] will give the updated winner based on the state of the board

  const utilStyles = {
    width: "350px",
    maxWidth: "100%",
    margin: "35px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  };

  const statistics = {
    display: "flex",
    gap: "30px",
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    if (winner === "X") {
      setXScore((prevScore) => prevScore + 1);
    } else if (winner === "O") {
      setOScore((prevScore) => prevScore + 1);
    }
  }, [winner]);

  function handleClick(i) {

    setHistory(prevHistory => [...prevHistory, {row: 0, col: 0}])

    // slice out history that's not needed(since jumping from one state to another, don't need to save states after the current one: The current one will keep changing based on the moves the user makes)
    const timeInHistory = history.slice(0, stepNumber + 1); // yields most current state

    const currentMove = timeInHistory[stepNumber]; // most current move(since timeInHistory stores states only after the most current stepNumber)

    const copy = [...currentMove.squares]; // make a copy because state is being mutated

    if (winner || copy[i]) return; // if a value already exists in a square or winner return

    copy[i] = xIsNext ? "X" : "O"; // determining whether to put an X or O in the square

    const square = i+1;
    let row = calculateRow(square); 
    let col = calculateCol(square);

    setHistory([...timeInHistory, {squares: copy, row: row, col: col}]); // want to update state as well as most current state
    // adding copy at the end will add one array to history

    setStepNumber(timeInHistory.length); // will keep adding up as new moves are made now that copy is being added

    setMoves((prevMoves) => prevMoves + 1);

    setXIsNext(!xIsNext); // alternating between X and O
  }

  const calculateRow = (square) => {
    if (square >= 1 && square <= 3) return 1;
    else if (square >= 4 && square <= 6) return 2;
    return 3;
  }

  const calculateCol = (square) => {
    return square === 1 || square === 4 || square === 7 ? 1 : square === 2 || square === 5 || square === 8 ? 2 : 3
  }

  // useEffect(() => {
  //   console.log("At step number " + stepNumber + ", board state: " + JSON.stringify(history[stepNumber]))
  // }, [history, stepNumber])


  useEffect(() => {
    const buttonTexts = history.map((currState, idx) => {
      return idx
        ? `Go to move #${idx}(Row ${currState.row}, Column ${currState.col})`
        : "Go to the beginning";
    });

    setTextArr(prevArr => Array.from(new Set([...prevArr, ...buttonTexts])));
  }, [history]);

  const moveElems = () => {
  let modifiedArr = !inAscending ? textArr.slice().reverse() : textArr; 
   return modifiedArr.map((text, idx) => {
    return (
      <button onClick = {() => {
        setStepNumber(idx);
        setXIsNext(idx % 2 === 0)
      }}>
        {text}
      </button>
    )
  }) 
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <div style={{ display: "inherit", gap: 10, overflowX: "auto" }}>{moveElems()}</div>
      <div>
        <button onClick = {() => setInAscending(prevOrder => !prevOrder)}>
          {inAscending ? "Display in descending order" : "Display in ascending order"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 50 }}>
        <Board squares={history[stepNumber].squares} onClick={handleClick} />
        <div style={utilStyles}>
          <button
            disabled={winner ? false : true}
            onClick={() => {
              setHistory([{squares: Array(9).fill(null), row: null, col: null}]);
              setStepNumber(0);
              setXIsNext(true);
              setMoves(0);
            }}
          >
            Re-start game
          </button>
          <div style={statistics}>
            <h3>
              {winner
                ? "Winner: " + winner
                : "Next player: " + (xIsNext ? "X" : "O")}
            </h3>
            <h3>Moves made so far: {moves}</h3>
          </div>
          <div style={statistics}>
            <h4>X-score: {xScore}</h4>
            <h4>O-score: {oScore}</h4>
            <button
              onClick={() => {
                setXScore(0);
                setOScore(0);
              }}
              disabled = {xScore === 0 && oScore === 0}
            >
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}