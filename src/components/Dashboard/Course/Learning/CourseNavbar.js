import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/CourseNav.css';

export default function CourseNavbar({ courseId, onChapterClick, isNavbarCollapsed }) {
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(0); // Set the default selected module index to 0
  const [selectedChapter, setSelectedChapter] = useState(0); // Set the default selected chapter index to 0

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getCourseStructure', { courseId });
        setCourse(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleModuleClick = (index) => {
    setSelectedModule(index);
    setSelectedChapter(0); // Reset selected chapter when a new module is clicked
    const selectedModuleObject = course.modules[index];
    onChapterClick(index, 0, selectedModuleObject.chapters[0].chapterName); // Pass module and chapter indices to the parent component
  };

  const handleChapterClick = (moduleIndex, chapterIndex, chapter) => {
    setSelectedChapter(chapterIndex);
    onChapterClick(moduleIndex, chapterIndex, chapter); // Pass module and chapter indices to the parent component
  };

  return (
    <div className={`course-navbar ${isNavbarCollapsed ? 'collapsed' : ''}`}>
      {course && (
        <>
          <div className="modules">
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module">
                <div
                  className={`module-name ${selectedModule === moduleIndex ? 'active' : ''}`}
                  onClick={() => handleModuleClick(moduleIndex)}
                >
                  {`${moduleIndex + 1}. ${module.moduleName}`} {/* Add module number */}
                </div>
                {selectedModule === moduleIndex && (
                  <div className="chapters">
                    {module.chapters.map((chapter, chapterIndex) => (
                      <div
                        key={chapterIndex}
                        className={`chapter ${selectedChapter === chapterIndex ? 'active' : ''}`}
                        onClick={() => handleChapterClick(moduleIndex, chapterIndex, chapter.chapterName)}
                      >
                        <div className="chapter-name">{`${chapterIndex + 1}. ${chapter.chapterName}`} </div>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: `${module.progress}%` }}>
                            {module.progress}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
