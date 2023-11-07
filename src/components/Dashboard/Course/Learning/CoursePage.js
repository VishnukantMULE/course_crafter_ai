import React, { useState } from 'react';
import CourseHeader from './CourseHeader';
import Explaination from './Explaination';
// import McqTest from './McqTest';
import CourseNavbar from './CourseNavbar';
// import ModuleHeader from './ModuleHeader';
import { useParams } from 'react-router-dom';
import './style/CoursePage.css';

export default function CoursePage() {
  const { courseId } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isNavbarCollapsed, setNavbarCollapsed] = useState(false); 

  const handleChapterClick = (moduleIndex, chapterIndex, chapter) => {
    // Set the selected module, chapter number, and chapter name
    setSelectedModule(moduleIndex);
    setSelectedChapter({ chapterIndex, chapter });
    
  };

  // Toggle the CourseNavbar visibility
  const toggleNavbar = () => {
    setNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <div className="course-page">
      <CourseHeader courseId={courseId} onToggleNavbar={toggleNavbar} className="header" />
      <div className="content-area">
        <div className="scrollable-content">
          {!isNavbarCollapsed && (
            <CourseNavbar courseId={courseId} onChapterClick={handleChapterClick} className="navbar" />
          )}
          <div className="right-section">
            {/* <ModuleHeader courseId={courseId} className="module-header" /> */}
            <Explaination courseId={courseId} selectedChapter={selectedChapter} selectedModule={selectedModule} className="explanation" />
            {/* <McqTest courseId={courseId} className="mcq-test" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
