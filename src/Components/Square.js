import React from "react";

export default function Square({ onClick, value, winner, isHighlighted, isDraw }) {

  return (
    <button
      style={{
        background: winner != null && isHighlighted ? "#0FFF50" : "#00FFFF",
        border: "2px solid darkblue",
        fontSize: "30px",
        fontWeight: "800",
        cursor: "pointer",
        outline: "none",
      }}
      onClick={onClick}
      disabled = {winner || isDraw}>
      {value}
    </button>
  );
}