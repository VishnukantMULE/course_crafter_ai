


import React, { useState, useEffect } from 'react';
import './style/mycourse.css'; // Import external CSS file for styling
import loadinggif from '../../../SVG/loading.gif';
import { Link } from 'react-router-dom';
import axios from 'axios';
import deletepng from './style/ICONS/delete.png';

export default function Mycourses({ userid }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch course data from the API endpoint using the provided userid
    fetch('http://localhost:5000/api/getCourseData', {
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
      console.error('Error fetching course data: ', error);
      setIsLoading(false);
    });
  }, [userid]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete('http://localhost:5000/deletecourse', {
        data: {
          courseId: courseId,
        },
      });
      // Remove the deleted course from the state
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="my-courses-container">
      <h2 className="course-heading">My Courses</h2>
      {isLoading ? (
        <div className="loading-container">
          <img src={loadinggif} alt="Loading Icon" className="loading-icon" />
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
              <h5 className="course-name">{course.courseName}</h5>
              <p className="course-info">
                Number of Modules: {course.numberOfModules}
                <br />
                <progress value={course.progress} max="100" className="progress-bar" />
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
    </div>
  );
}
