// EnglisTestNav.js
import React from 'react';
import Loading from '../../../Auth/Loading';
import './style/EnglisTestNav.css';

export default function EnglisTestNav({ mcqData, onQuestionClick, selectedOptions, currentQuestion }) {
  if (!mcqData || !mcqData.questions) {
    return <Loading />;
  }
  console.log('Current Question:', currentQuestion); // Add this line


  return (
    <div className="english-test-nav-container">
      <h2>Question Numbers:</h2>
      <ul className="question-list">
        {mcqData.questions.map((question) => (
          <li key={question.question_number}>
            <button
              className={`question-button ${
                selectedOptions[question.question_number] ? 'completed' : ''
              } ${question.question_number === currentQuestion ? 'current' : ''}`}
              onClick={() => onQuestionClick(question.question_number)}
            >
              {question.question_number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
