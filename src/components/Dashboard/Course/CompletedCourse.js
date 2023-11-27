import React, { useState, useEffect } from 'react';
import './style/mycourse.css';
import axios from 'axios';
import Loading from '../../Auth/Loading';
import deletepng from './style/ICONS/delete.png';
import { Link } from 'react-router-dom';

export default function CompletedCourse({ userid }) {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.post('http://localhost:5000/access/completedcourses', {
            userid: userid,
        });
        setCompletedCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching completed courses:', error);
        setIsLoading(false);
      }
    };

    fetchCompletedCourses();
  }, [userid]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/manage/deletecourse`, {
        data: {
          courseId: courseId,
        },
      });
      setCompletedCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="my-courses-container">
    <h2 className="course-heading">Completed Coursess</h2>
    <hr />
    <div className="completed-courses-container">
      {isLoading ? (
        <div className="loading-container">
          <Loading/>
        </div>
      ) : completedCourses.length === 0 ? (
        <div className="empty-courses-message">
          <p>No completed courses available.</p>
        </div>
      ) : (
        <div className="course-cards-container">
          {completedCourses.map((course) => (
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
    </div>
</div>
  );
}
