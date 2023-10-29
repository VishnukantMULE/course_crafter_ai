import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './style/CourseLanding.css';

export default function CourseLanding() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getCourseStructure', { courseId });
        setCourse(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch course data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const renderButton = () => {
    let buttonText = "Start Course";
    if (course && course.progress > 0) {
      buttonText = "Continue";
    }

    return (
      <Link to={`/coursepage/${courseId}`}>
        <button className="button">{buttonText}</button>
      </Link>
    );
  };

  const calculateProgress = (module) => {
    if (!module.completedChapters) return 0;
    return (module.completedChapters.length / module.chapters.length) * 100;
  };

  return (
    <div className="course-landing">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {course && (
        <>
          <img src={course.courseImage} alt={course.courseName} className="course-image" />
          <h2 className="course-name">{course.courseName}</h2>
          <p className="course-id">{courseId}</p>
          {renderButton()}

          <div className="modules">
            {course.modules.map((module, index) => (
              <div key={index} className="module">
                <div
                  className={`module-namer ${selectedModule === index ? 'active' : ''}`}
                  onClick={() => setSelectedModule(selectedModule === index ? null : index)}
                >
                  {module.moduleName}

                </div>
                <div className="progress-bard">
                  <div className="progressd" style={{ width: `${calculateProgress(module)}%` }}>
                  
                  </div>
                </div>
                {selectedModule === index && (
                  <div className="chapters">
                    {module.chapters.map((chapter, cIndex) => (
                      <div key={cIndex} className="chapter">
                        <div className="chapter-namer">{chapter.chapterName}</div>


                      </div>
                    ))}

                    {module.mcqs && module.mcqs.toLowerCase() === 'mcq test' && (
                      <Link to={`/mcqtest/${courseId}/${index}`}>
                        <button className="mcq-button">MCQ Test</button>
                      </Link>
                    )}
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
