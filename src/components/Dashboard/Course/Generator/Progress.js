import React from 'react';

export default function Progress({ progress, message }) {
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
