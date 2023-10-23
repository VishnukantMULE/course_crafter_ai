import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './GeneratedCourse.css'; // Import your custom CSS file for additional styling if needed

export default function GeneratedCourse({ courseData }) {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleModuleClick = (moduleNo) => {
    if (selectedModule === moduleNo) {
      setSelectedModule(null);
    } else {
      setSelectedModule(moduleNo);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{courseData.courseData.course_name}</h2>
      {courseData.courseData.modules.map((module) => (
        <div className="module-container mb-3" key={module.module_no}>
          <h3
            className={`module-name ${selectedModule === module.module_no ? 'active' : ''}`}
            onClick={() => handleModuleClick(module.module_no)}
          >
            {module.module_name}
          </h3>
          {selectedModule === module.module_no && (
            <ul className="list-group mt-2">
              {module.chapters.map((chapter, index) => (
                <li className="list-group-item" key={index}>
                  {chapter}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
