import React, { useState, useEffect } from 'react';
import './mycourse.css'; // Import external CSS file for styling
import loadinggif from '../../../SVG/loading.gif'

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
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching course data: ', error);
        setIsLoading(false); // Set loading state to false in case of an error
      });
  }, [userid]); // Dependency array includes userid to re-fetch data when userid changes

  return (
    <div className="my-courses-container">
      <h2 className="course-heading">My Courses</h2>
      {isLoading ? ( // Check loading state and show loading message or content accordingly
         <div className="loading-container">
         <img src={loadinggif} alt="Loading Icon" className="loading-icon" /> {/* Display the loading icon */}
       </div>
      ) : (
        <div className="course-cards-container">
          {courses.map((course) => (
            <div key={course.courseId} className="course-card">
              <div className="course-card-content">
                <img src={course.CourseImage} alt={course.courseName} className="course-image" />
                <div className="course-details">
                  <h5 className="course-name">{course.courseName}</h5>
                  <p className="course-info">
                    Number of Modules: {course.numberOfModules}
                    <br />
                    Progress:
                    <progress value={course.progress} max="100" className="progress-bar" />
                  </p>
                  <a href="/" className="view-details-link">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
