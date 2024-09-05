import React from "react";

function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To React Quiz</h2>
      <h3>X number of questions To answer</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
