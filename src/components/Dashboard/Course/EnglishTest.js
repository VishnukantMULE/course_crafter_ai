import React from 'react';

export default function EnglishTest(props) {
  const handleGoBack = () => {
    props.onGoBack();
  };

  return (
    <div>
      <h2>English Test</h2>
      {/* Your English test content goes here */}
      <button className="btn button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}
