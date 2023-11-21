import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Auth/Loading';
import { Link } from 'react-router-dom';
import deletepng from '../../components/Dashboard/Course/style/ICONS/delete.png';
import CustomAlert from '../../services/CustomAlert';
import { useAdminContext } from '../Login/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { adminToken } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/adminlogin');
      return;
    }

    axios
      .get('http://localhost:5000/allcourses', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertMessage(`Error fetching courses: ${error.message}`);
        setShowAlert(true);
      });
  }, [adminToken, navigate]);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/deletecourse/${courseId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
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
                        state: { courseId: course.courseId },
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
            ))}
          </div>
        )}
        {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
      </div>
    </div>
  );
}
