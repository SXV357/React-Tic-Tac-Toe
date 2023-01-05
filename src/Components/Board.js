import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick }) {
  const style = {
    border: "4px solid darkblue",
    borderRadius: "10px",
    width: "350px",
    height: "350px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
    marginTop: "75px",
  };

  return (
    <div style={style}>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
