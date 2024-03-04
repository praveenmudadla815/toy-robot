import React from "react";
import "./Robot.css";

const Robot = ({ position }) => {
  const { x, y, direction } = position;

  const adjustedX = x !== null ? Math.min(Math.max(x, 0), 4) : null;
  const adjustedY = y !== null ? Math.min(Math.max(y, 0), 4) : null;

  return (
    <div className="robot-container">
      {adjustedX !== null && adjustedY !== null && direction !== null && (
        <div
          className={`robot ${direction.toLowerCase()}`}
          style={{ left: `${adjustedX * 50}px`, bottom: `${adjustedY * 50}px` }}
        >
          <p className="position-text">
            Position:{" "}
            <span className="position">
              {adjustedX},{adjustedY}
            </span>{" "}
            | Direction: <span className="direction">{direction}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Robot;
