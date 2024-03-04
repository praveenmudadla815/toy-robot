import React from "react";
import "./Tabletop.css";

const Tabletop = ({ robotPosition }) => {
  const isInsideTable = (x, y) => {
    return x >= 0 && x < 5 && y >= 0 && y < 5;
  };

  const canMove = (x, y, direction) => {
    let nextX = x;
    let nextY = y;

    if (direction === "NORTH") {
      nextY = y + 1;
    } else if (direction === "SOUTH") {
      nextY = y - 1;
    } else if (direction === "EAST") {
      nextX = x + 1;
    } else if (direction === "WEST") {
      nextX = x - 1;
    }

    return isInsideTable(nextX, nextY);
  };

  return (
    <div className="tabletop">
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="table-row">
          {Array.from({ length: 5 }).map((_, col) => (
            <div
              key={col}
              className={`table-cell ${
                robotPosition?.x === col && robotPosition?.y === row
                  ? "occupied"
                  : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tabletop;
