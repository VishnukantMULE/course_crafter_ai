import React, { useState, useEffect } from 'react';
import './style/mycourse.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import deletepng from './style/ICONS/delete.png';
import Loading from '../../Auth/Loading';
import CustomAlert from '../../../services/CustomAlert';


export default function Mycourses({ userid }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  useEffect(() => {
    
    fetch(`https://coursecrafterai.onrender.com/access/getCourseData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: userid }),
    })
    .then((response) => response.json())
    .then((data) => {
      setCourses(data);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      setAlertMessage('Error fetching course data: ', error);
      setShowAlert(true);
    });
  }, [userid]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`https://coursecrafterai.onrender.com/manage/deletecourse`, {
        data: {
          courseId: courseId,
        },
      });
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="my-courses-container">
      <h2 className="course-heading">My Courses</h2>
      <hr />
      {isLoading ? (
        <div className="loading-container">
          <Loading/>
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
  );
}
