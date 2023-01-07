import React from "react";

export default function Square({ onClick, value }) {
  return (
    <button
      style={{
        background: "lightblue",
        border: "2px solid darkblue",
        fontSize: "30px",
        fontWeight: "800",
        cursor: "pointer",
        outline: "none",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
