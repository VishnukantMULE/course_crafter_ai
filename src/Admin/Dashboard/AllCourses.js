// AllCourses.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Auth/Loading';
import { Link } from 'react-router-dom';
import deletepng from '../../components/Dashboard/Course/style/ICONS/delete.png';
import CustomAlert from '../../services/CustomAlert';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Fetch all courses
    axios.get('https://coursecrafterai.onrender.com/allcourses')
      .then(response => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setAlertMessage('Error fetching courses: ', error);
        setShowAlert(true);
      });
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`https://coursecrafterai.onrender.com/deletecourse/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className='my-courses-container'>
    <div className="all-courses-container">
      <h2 className="course-heading">All Courses (Admin View)</h2>
      <hr />
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-courses-message">
          <p>No courses available.</p>
        </div>
      ) : (
        <div className="course-cards-container">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-card-content">
                <img src={course.CourseImage} alt={course.courseName} className="course-image" />
                <div className="course-details">
                  <h5 className="course-names">{course.courseName}</h5>
                  <p className="course-info">
                    Number of Modules: {course.numberOfModules}
                    <br />
                    <progress value={course.overallProgress} max="100" className="progress-bar" />
                  </p>
                  <div className="details-container">
                    <Link
                      to={{
                        pathname: `/course/${course.courseId}`,
                        state: { courseId: course.courseId }
                      }}
                      className="view-details-link"
                    >
                      View Details
                    </Link>
                    <button className="delete-button" onClick={() => handleDeleteCourse(course._id)}>
                      <img src={deletepng} alt="Delete Icon" className="delete-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </div>
    </div>
  );
}
