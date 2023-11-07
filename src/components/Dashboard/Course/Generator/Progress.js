import React, { useEffect, useState } from 'react';
// import './style/Progress.css'
export default function Progress() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const simulateProgress = () => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 2; 
          setProgress(currentProgress);
          setMessage(`Progress: ${currentProgress}%`);
        } else {
          clearInterval(interval);
          setMessage('Progress completed!');
        }
      }, 3000); 
    };

    simulateProgress();

    return () => {
      
    };
  }, []);

  return (
    <div>
      <h2>Progress</h2>
      <div style={{ width: '100%', backgroundColor: '#eee' }}>
        <div style={{ width: `${progress}%`, height: '20px', backgroundColor: 'blue' }}></div>
      </div>
      <p>{message}</p>
    </div>
  );
}
