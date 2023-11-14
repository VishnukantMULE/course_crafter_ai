import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import './style/QuestionDetail.css';

export default function QuestionDetail({ selectedQuestion, selectedOption, onOptionSelect }) {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
  }, [selectedQuestion, selectedOption]);

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    onOptionSelect(selectedQuestion.question_number, selected);
    setLocalSelectedOption(selected); // Update local state
  };

  if (!selectedQuestion) {
    return <div className="question-detail">Select a question to view details.</div>;
  }

  const { question_number, paragraph, question, options } = selectedQuestion;

  return (
    <div className="question-detail">
      <h3>Question {question_number}</h3>
      <ReactMarkdown>{paragraph}</ReactMarkdown>
      <p>{question}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="option-item">
            <label>
              <input
                type="radio"
                name={`question_${question_number}`}
                value={option}
                checked={localSelectedOption === option}
                onChange={handleOptionChange}
                className="option-input"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
