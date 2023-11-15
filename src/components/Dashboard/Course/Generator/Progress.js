import React, { useState, useEffect } from "react";
import "./style/Progress.css";

export default function Progress({ progressData }) {
  const [progressStyle, setProgressStyle] = useState({ width: "0%" });

  useEffect(() => {
    setProgressStyle({ width: `${progressData.progress}%` });
  }, [progressData.progress]);

  return (
    <div className="my-courses-container">
      <div className="progress-container">
        <h2 className="progress-title">Progress</h2>
        <div
          className="progress-bar-container"
          style={{ width: "100%", backgroundColor: "#eee" }}
        >
          <div className="progress-bar" style={progressStyle}></div>
        </div>
        {progressData.error && (
          <p className="error-message">{progressData.error}</p>
        )}
        <p className="progress-message">{progressData.message}</p>
      </div>
    </div>
  );
}
