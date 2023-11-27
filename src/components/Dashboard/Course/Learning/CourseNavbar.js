import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/CourseNav.css';

export default function CourseNavbar({ courseId, onChapterClick, isNavbarCollapsed }) {
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/access/getCourseStructure`, { courseId });
        setCourse(response.data);
        calculateOverallProgress(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchCourse();
    // eslint-disable-next-line
  }, [courseId, refreshKey]);

  const calculateOverallProgress = async (courseData) => {
    try {
      let totalChapters = 0;
      let completedChapters = 0;
  
      courseData.modules.forEach((module) => {
        totalChapters += module.chapters.length;
  
        if (module.completedChapters.length === module.chapters.length) {
          completedChapters += module.chapters.length;
        } else {
          completedChapters += module.completedChapters.length;
        }
      });
  
      const progress = (completedChapters / totalChapters) * 100;
      setOverallProgress(progress);
  
      const response = await fetch('http://localhost:5000/manage/updateprogress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, overallProgress: progress }),
      });
  
      if (response.ok) {
        console.log('Overall progress updated:', progress);
      } else {
        console.error('Error updating overall progress:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating overall progress:', error);
    }
  };

  

  const handleModuleClick = (index) => {
    setSelectedModule(index);
    setSelectedChapter(0);
    const selectedModuleObject = course.modules[index];
    onChapterClick(index, 0, selectedModuleObject.chapters[0].chapterName);
  };

  const handleChapterClick = (moduleIndex, chapterIndex, chapter) => {
    setSelectedChapter(chapterIndex);
    onChapterClick(moduleIndex, chapterIndex, chapter);
    setRefreshKey((oldKey) => oldKey + 1);
  };
  

  return (
    <div className={`course-navbar ${isNavbarCollapsed ? 'collapsed' : ''}`}>
      {course && (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${overallProgress}%` }}></div>
          </div>
          <div className="modules">
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module">
                <div
                  className={`module-name ${selectedModule === moduleIndex ? 'active' : ''}`}
                  onClick={() => handleModuleClick(moduleIndex)}
                >
                  {`${moduleIndex + 1}. ${module.moduleName}`}
                </div>
                {selectedModule === moduleIndex && (
                  <div className="chapters">
                    {module.chapters.map((chapter, chapterIndex) => {
                      const isChapterCompleted = module.completedChapters.includes(chapterIndex);
                      const progress = isChapterCompleted ? 100 : 0;
                      return (
                        <div
                          key={chapterIndex}
                          className={`chapter ${selectedChapter === chapterIndex ? 'active' : ''}`}
                          onClick={() => handleChapterClick(moduleIndex, chapterIndex, chapter.chapterName)}
                        >
                          <div className="chapter-name">{`${chapterIndex + 1}. ${chapter.chapterName}`}</div>
                          <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
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
