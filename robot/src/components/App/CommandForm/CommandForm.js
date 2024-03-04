import React, { useState } from "react";
import "./CommandForm.css";

const CommandForm = ({ onCommandSubmit }) => {
  const [command, setCommand] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommandSubmit(command);
    setCommand(""); // Clear the input after submitting
  };

  return (
    <form className="command-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter command"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommandForm;
