import React, { useState, useEffect } from "react";
import Generator from "./Generator";
import English from "./English";
import "./style/CreateCourse.css";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios"; // or any other HTTP library


export default function CreateCourse() {
  const userId = useAuth();
  const [showComponent, setShowComponent] = useState("");
  const [englishScore, setEnglishScore] = useState(null);


  useEffect(() => {
    axios.post('http://localhost:5000/getenglishscore', { userId })
      .then(response => {
        if (response.data) {
          setEnglishScore(response.data.score)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  const handleGeneratorClick = () => {
    setShowComponent("generator");
  };

  const handleEnglishClick = () => {
    setShowComponent("english");
  };

  return (
    <>
      {showComponent === "" && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card text-center">
              <div className="card-body">
                <div className="my-courses-container">
                  <h2 className="course-headingr">Generate A New Course </h2>
                  <hr />
                  <div className="container-button">
                    <button className="button" onClick={handleGeneratorClick}>
                      + Generate Course
                    </button>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showComponent === "generator" && (
        <Generator onGoBack={() => setShowComponent("")} />
      )}

      {showComponent === "" && (
        <div className="updated-container mt-5">
          <div className="updated-row justify-content-center">
            <div className="updated-card text-center">
              <div className="updated-card-body">
                <div className="your-updated-class-name">
                  {englishScore !== null ? (
                    <>
                    <h2>Your English score is: {englishScore}/100</h2>
                    <div className="updated-container-button">
                        <button className="button" onClick={handleEnglishClick}>
                          + Retake English Test
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="your-updated-class-name">
                        Give Language Proficiency Test (English)
                      </h2>
                      <div className="updated-container-button">
                        <button className="button" onClick={handleEnglishClick}>
                          + English Test
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      )}

      {showComponent === "english" && (
        <English onGoBack={() => setShowComponent("")} />
      )}
    </>
  );
}
