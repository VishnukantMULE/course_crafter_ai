import React, { useEffect, useState } from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      onClose();
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <div className="progress-bare">
          <div className="progresse" style={{ width: `${progress}%` }}></div>
        </div>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;
