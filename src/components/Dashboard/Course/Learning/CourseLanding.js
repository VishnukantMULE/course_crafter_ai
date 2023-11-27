import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './style/CourseLanding.css';
import Loading from '../../../Auth/Loading';
import backpng from '../Generator/style/ICONS/back.png'

export default function CourseLanding() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post(`https://coursecrafterai.onrender.com/access/getCourseStructure`, { courseId });
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

  useEffect(() => {
    window.onpopstate = () => {
      navigate('/dashboard', { state: { from: 'course-landing' }, replace: true });
    };
  }, [navigate]);



  const renderButton = () => {
    let buttonText = "Start Course";
    if (course && course.progress > 0) {
      buttonText = "Continue";
    }

    return (
      <div>

        <Link to={`/coursepage/${courseId}`}>
          <button className="button">{buttonText}</button>
        </Link>
        <button className='btnq img' onClick={() => navigate('/dashboard', { state: { from: 'course-landing' }, replace: true })}>
          <img src={backpng} alt="back" />Home
        </button>
      </div>
    );
  };

  const calculateProgress = (module) => {
    if (!module.completedChapters) return 0;
    return (module.completedChapters.length / module.chapters.length) * 100;
  };

  return (
    <div className="course-landing">


      {loading && <Loading />}
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
                      <Link to={`/mcqtest/${courseId}/${index+1}`}>
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
