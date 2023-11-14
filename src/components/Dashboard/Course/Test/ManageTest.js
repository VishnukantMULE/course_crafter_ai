import React from "react";
import "./style/ManageTest.css";

export default function ManageTest({
  selectedQuestion,
  selectedOption,
  onSubmit,
  onNext,
  onBack,
  onUnselect,
}) {
  return (
    <div className="manage-test-container">
      <div className="Question-Manage">
        <button className="back-button" onClick={onBack}>
          Back
        </button>

        <button className="unselect-button" onClick={onUnselect}>
          Unselect
        </button>
        <button className="next-button" onClick={onNext}>
          Next
        </button>
      </div>
      <button className="submit-button" onClick={onSubmit}>
        Submit Test
      </button>
    </div>
  );
}
