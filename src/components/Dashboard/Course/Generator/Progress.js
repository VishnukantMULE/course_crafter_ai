import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export default function Progress() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000'); // Replace with your server URL
    socket.on('progress', (data) => {
      console.log("Received progress data");
      setProgress(data.step * 25); // Assuming each step is 25% of progress
      setMessage(data.message);
    });

    return () => {
      socket.disconnect();
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
