import React, { useState } from 'react';
import AddCourseData from './Generator/AddCourseData';
import './style/CreateCourse.css';
import EnglishTest from './EnglishTest';

export default function CreateCourse() {
  const [showGenerateCourse, setShowGenerateCourse] = useState(false);
  const [showEnglishTest, setShowEnglishTest] = useState(false);

  const handleGenerateCourseClick = () => {
    setShowGenerateCourse(true);
    setShowEnglishTest(false);
  };

  const handleEnglishTestClick = () => {
    setShowEnglishTest(true);
    setShowGenerateCourse(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="card text-center">
            <div className="card-body">
              {showGenerateCourse && <AddCourseData onGoBack={() => setShowGenerateCourse(false)} />}
              {!showGenerateCourse && !showEnglishTest && (
                <div className="container-button">
                  <button className="button" onClick={handleGenerateCourseClick}>
                    + Generate Course
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="card text-center">
            <div className="card-body">
              {showEnglishTest && <EnglishTest onGoBack={() => setShowEnglishTest(false)} />}
              {!showGenerateCourse && !showEnglishTest && (
                <div className="container-button">
                  <button className="button" onClick={handleEnglishTestClick}>
                    + English Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
