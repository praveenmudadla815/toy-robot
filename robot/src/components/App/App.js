import React, { useState } from "react";
import Robot from "../Robot/Robot";
import CommandForm from "./CommandForm/CommandForm";
import "./App.css";
import Tabletop from "../TableTop/Tabletop";

const App = () => {
  const [robotPosition, setRobotPosition] = useState({
    x: null,
    y: null,
    direction: null,
  });

  const handleCommand = (command) => {
    if (command === "MOVE") {
      if (
        robotPosition.x !== null &&
        robotPosition.y !== null &&
        robotPosition.direction !== null
      ) {
        if (
          canMove(robotPosition.x, robotPosition.y, robotPosition.direction)
        ) {
          setRobotPosition((prevPosition) => {
            const { x, y, direction } = prevPosition;
            switch (direction) {
              case "NORTH":
                return { x, y: y + 1, direction };
              case "SOUTH":
                return { x, y: y - 1, direction };
              case "EAST":
                return { x: x + 1, y, direction };
              case "WEST":
                return { x: x - 1, y, direction };
              default:
                return prevPosition;
            }
          });
        }
      }
    } else if (command === "LEFT" || command === "RIGHT") {
      setRobotPosition((prevPosition) => {
        const { x, y, direction } = prevPosition;
        const newDirection =
          command === "LEFT"
            ? { NORTH: "WEST", WEST: "SOUTH", SOUTH: "EAST", EAST: "NORTH" }[
                direction
              ]
            : { NORTH: "EAST", EAST: "SOUTH", SOUTH: "WEST", WEST: "NORTH" }[
                direction
              ];

        return { x, y, direction: newDirection };
      });
    } else if (command === "REPORT") {
      alert(
        `Robot Position: ${robotPosition.x},${robotPosition.y},${robotPosition.direction}`
      );
    } else if (command.startsWith("PLACE")) {
      const [, x, y, direction] = command.match(
        /PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)/
      );
      setRobotPosition({ x: parseInt(x), y: parseInt(y), direction });
    }
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

  const isInsideTable = (x, y) => {
    return x >= 0 && x < 5 && y >= 0 && y < 5;
  };

  return (
    <div className="app-container">
      <Tabletop robotPosition={robotPosition} />
      <Robot position={robotPosition} />
      <CommandForm onCommandSubmit={handleCommand} />
    </div>
  );
};

export default App;
