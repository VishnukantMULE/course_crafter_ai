import React, { useState, useEffect } from "react";
import EnglisTestNav from "./EnglisTestNav";
import QuestionDetail from "./QuestionDetail";
import ManageTest from "./ManageTest";
import "./style/EnglishTestDash.css";
import { useAuth } from "../../../Auth/AuthContext";
import Loading from "../../../Auth/Loading";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "selectedOptions";

export default function EnglishTestDash() {
  const navigate =useNavigate();
  const { userId } = useAuth();
  const [mcqData, setMcqData] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  );

  useEffect(() => {
    fetch("http://localhost:5000/lang/getenglishtest")
      .then((response) => response.json())
      .then((data) => setMcqData(data))
      .catch((error) =>
        console.error("Error fetching English test data:", error)
      );
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleQuestionClick = (questionNumber) => {
    setSelectedQuestionIndex(
      mcqData.questions.findIndex(
        (question) => question.question_number === questionNumber
      )
    );
  };

  const handleOptionSelect = (questionNumber, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionNumber]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const selectedAnswers = Object.entries(selectedOptions).map(
      ([questionNumber, selectedOption]) => ({
        question_number: questionNumber,
        selected_option: selectedOption,
      })
    );

    fetch("http://localhost:5000/lang/submitenglishtest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        selectedAnswers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/dashboard');
        console.log("Submission response:", data);

        if (data.warning) {
          alert(data.warning);
        }

        if (data.alert) {
          alert(data.alert);
        }
      })
      .catch((error) => console.error("Error submitting test:", error));
  };

  const handleNextQuestion = () => {
    if (
      mcqData &&
      mcqData.questions &&
      selectedQuestionIndex < mcqData.questions.length - 1
    ) {
      setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBackQuestion = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleUnselectQuestion = () => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [mcqData.questions[selectedQuestionIndex].question_number]: null,
    }));
  };

  if (!mcqData) {
    return <Loading />;
  }

  return (
    <div>
      <EnglisTestNav
        mcqData={mcqData}
        onQuestionClick={handleQuestionClick}
        selectedOptions={selectedOptions}
        currentQuestion={selectedQuestionIndex + 1}
      />
      <QuestionDetail
        selectedQuestion={mcqData.questions[selectedQuestionIndex]}
        selectedOption={
          selectedOptions[
            mcqData.questions[selectedQuestionIndex]?.question_number
          ]
        }
        onOptionSelect={handleOptionSelect}
      />
      {mcqData.questions[selectedQuestionIndex] && (
        <ManageTest
          selectedQuestion={mcqData.questions[selectedQuestionIndex]}
          selectedOption={
            selectedOptions[
              mcqData.questions[selectedQuestionIndex]?.question_number
            ]
          }
          onSubmit={handleSubmit}
          onNext={handleNextQuestion}
          onBack={handleBackQuestion}
          onUnselect={handleUnselectQuestion}
        />
      )}
    </div>
  );
}
