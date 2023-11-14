import React, { useState } from "react";
import "./style/EnglishTest.css";
import { useNavigate } from "react-router-dom";

export default function EnglishTest(props) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate=useNavigate();

  const handleReadyToTest = () => {
    if (agreeTerms) {
      navigate('/englishtest')
    } else {
      alert("Please agree to the terms before starting the test.");
    }
  };

  const handleGoBack = () => {
    props.onGoBack();
  };

  return (
    <div className="english-test-container">
      <h2 className="testtitle">English Test</h2>

      <div className="instruction-page">
        <p>
          Welcome to the English proficiency test! This test is a crucial step
          in personalizing your learning experience. Our platform generates
          courses tailored to your skills and knowledge, and the English test
          helps us understand your language abilities. Please read the
          instructions carefully before starting the test.
        </p>
        <ul>
          <li>You will have a series of multiple-choice questions.</li>
          <li>Choose the correct option for each question.</li>
          <li>Click "Next" to move to the next question.</li>
          <li>Do not cheat; your level of understanding will be assessed.</li>
        </ul>
        <p>
          The English proficiency test is an integral part of our course
          generation platform. It allows us to create courses that match your
          current skill level, ensuring that you receive a personalized and
          effective learning journey.
        </p>
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          I agree to the terms and conditions.
        </label>
        <button
          className="ready-to-test-button"
          onClick={handleReadyToTest}
          disabled={!agreeTerms}
        >
          Ready To Test
        </button>
      </div>

      <button className="btn button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}
