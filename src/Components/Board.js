import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick }) {
  return (
    <div
      style={{
        border: "4px solid darkblue",
        borderRadius: "10px",
        width: "350px",
        height: "350px",
        margin: "0 auto",
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        marginTop: "75px",
      }}
    >
      {squares.map((val, idx) => (
        <Square key={idx} value={val} onClick={() => onClick(idx)} />
      ))}
    </div>
  );
}
