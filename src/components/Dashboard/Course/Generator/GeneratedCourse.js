import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/GeneratedCourse.css";
import { useNavigate } from "react-router-dom";

export default function GeneratedCourse({ courseData }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();

  const handleModuleClick = (moduleNo) => {
    if (selectedModule === moduleNo) {
      setSelectedModule(null);
    } else {
      setSelectedModule(moduleNo);
    }
  };

  const handleStartCourseClick = () => {
    navigate(`/coursepage/${courseData.CourseLink}`);
  };

  return (
    <div className="container mt-4">
      <div>
        <button className="button" onClick={handleStartCourseClick}>
          Start Course
        </button>
      </div>
      <h2 className="mb-4">{courseData.courseData.course_name}</h2>
      {courseData.courseData.modules.map((module) => (
        <div className="module-container mb-3" key={module.module_no}>
          <h3
            className={`module-name ${
              selectedModule === module.module_no ? "active" : ""
            }`}
            onClick={() => handleModuleClick(module.module_no)}
          >
            {module.module_name}
          </h3>
          {selectedModule === module.module_no && (
            <ul className="list-group mt-2">
              {module.chapters.map((chapter, index) => (
                <li className="list-group-item" key={index}>
                  <strong>{chapter.chapter_name}</strong>
                 

                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
