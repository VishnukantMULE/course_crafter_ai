import React, { useState, useEffect } from "react";
import Generator from "./Generator";
import English from "./English";
import KnowledgeBase from "./KnowledgeBase";
import TalkWithAI from "./TalkWithAI";
import MakeRoadmap from "./MakeRoadmap";
import MakeNotes from "./MakeNotes";
import "./style/CreateCourse.css";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios";

export default function CreateCourse() {
  const userId = useAuth();
  const [showComponent, setShowComponent] = useState("");
  const [englishScore, setEnglishScore] = useState(null);

  useEffect(() => {
    axios
      .post("https://coursecrafterai.onrender.com/lang/getenglishscore", { userId })
      .then((response) => {
        if (response.data) {
          setEnglishScore(response.data.score);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleGeneratorClick = () => {
    setShowComponent("generator");
  };

  const handleEnglishClick = () => {
    setShowComponent("english");
  };

  const handleKnowledgeBaseClick = () => {
    setShowComponent("knowledgeBase");
  };

  const handleTalkWithAIClick = () => {
    setShowComponent("talkWithAI");
  };

  const handleMakeRoadmapClick = () => {
    setShowComponent("makeRoadmap");
  };

  const handleMakeNotesClick = () => {
    setShowComponent("makeNotes");
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

{/* Section when showComponent is empty */}
{showComponent === "" && (
  <div className="container mt-5 custom-updated-container mt-5">
    <div className="custom-updated-row justify-content-center">
      <div className="custom-updated-card text-center">
        <div className="custom-updated-card-body">
          <div className="custom-english-test-container">
            {englishScore !== null ? (
              <>
                <h2 className="hn">Your English score is: {englishScore}/100</h2>
                           
            <hr />
                <div className="custom-updated-container-button">
                  <button className="custom-button" onClick={handleEnglishClick}>
                    + Retake English Test
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="custom-english-test-heading hn">
                  Give Language Proficiency Test (English)
                </h2>
                <div className="custom-updated-container-button">
                  <button className="custom-button" onClick={handleEnglishClick}>
                    + English Test
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="custom-updated-card text-center">
        <div className="custom-updated-card-body">
          <h2 className="custom-knowledge-level-heading hn">
            Check Knowledge Level{" "}
          </h2>
          <hr />
          <label htmlFor="subject">Enter Subject:</label>
          <input type="text" id="subject" name="subject" />
          <br></br>
          <div className="custom-updated-container-button text-center">
            <button className="custom-button" onClick={handleKnowledgeBaseClick}>
              + Knowledge Test
            </button>
          </div>
        </div>
      </div>
      <div className="custom-updated-card text-center">
        <div className="custom-updated-card-body">
          <h2 className="custom-talk-with-ai-heading hn">Talk with AI </h2>
          <div className="custom-updated-container-button text-center">
           
            <hr />
           
            <button className="custom-button" onClick={handleTalkWithAIClick}>
              + Talk with Vielle
            </button>
            <p>comming soon ...</p>
          </div>
        </div>
      </div>
      <div className="custom-updated-card text-center">
        <div className="custom-updated-card-body">
          <h2 className="custom-make-roadmap-heading hn">Make Personalised Learning Roadmap </h2>
         
            <hr />
          <div className="custom-updated-container-button text-center">
            <button className="custom-button" onClick={handleMakeRoadmapClick}>
              + Make  Roadmap
            </button>
            <p>comming soon ...</p>

          </div>
        </div>
      </div>
      <div className="custom-updated-card text-center">
        <div className="custom-updated-card-body">
          <h2 className="custom-make-notes-heading hn">Make Notes </h2>
          <div className="custom-updated-container-button text-center">
         
            <hr />
           
            <button className="custom-button" onClick={handleMakeNotesClick}>
              + Make Notes
            </button>
            <p>Under Devlopment ..</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      {showComponent === "english" && (
        <English onGoBack={() => setShowComponent("")} />
      )}

      {showComponent === "knowledgeBase" && (
        <KnowledgeBase onGoBack={() => setShowComponent("")} />
      )}

      {showComponent === "talkWithAI" && (
        <TalkWithAI onGoBack={() => setShowComponent("")} />
      )}

      {showComponent === "makeRoadmap" && (
        <MakeRoadmap onGoBack={() => setShowComponent("")} />
      )}

      {showComponent === "makeNotes" && (
        <MakeNotes onGoBack={() => setShowComponent("")} />
      )}
    </>
  );
}
