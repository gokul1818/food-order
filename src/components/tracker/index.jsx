import React from "react";
import "./style.css";

function Tracker({ stages, currentStage }) {
  return (
    <div className="tracker">
      {stages.map((stage, index) => (
        <div key={index} className="tracker-item">
          <div className="dot-and-connector">
            <div
              className={`dot ${index <= currentStage ? "active" : ""}`}
            ></div>
            <span className="stage">{stage}</span>
          </div>
          {index < stages.length - 1 && (
            <div
              className="connector"
              style={{
                backgroundColor: index < currentStage ? "#af8d02" : "#e5e5e5",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tracker;
