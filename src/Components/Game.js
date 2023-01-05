import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';

export default function Game(){
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const winner = calculateWinner(board)

    const handleClick = (i) => {
        const copy = [...board] // make a copy because state is being mutated
        if (winner || copy[i]) return // if a value already exists in a square or winner return
        copy[i] = xIsNext ? "X" : "O" // determining whether to put an X or O in the square
        setBoard(copy) // updating board state to reflect new changes
        setXIsNext(!xIsNext) // alternating between X and O
    }

    const jumpTo = () => {

    }

    const renderMoves = () => {

    }

  return(
    <Board squares = {board} onClick = {handleClick}/>
  )
}