import React, { useState, useEffect } from 'react';
import './mycourse.css'; // Import external CSS file for styling

export default function Mycourses({ userid }) {
  const [courses, setCourses] = useState([]);

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
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching course data: ', error));
  }, [userid]); // Dependency array includes userid to re-fetch data when userid changes

  return (
    <div className="my-courses-container"> {/* Added a class name to the main container */}
      <h2 className="course-heading">My Courses</h2> {/* Added a class name to the heading */}
      <div className="course-cards-container"> {/* Added a class name to the cards container */}
        {courses.map((course) => (
          <div key={course.courseId} className="course-card"> {/* Added a class name to each course card */}
            <div className="course-card-content"> {/* Added a class name to the card content */}
              <img src={course.CourseImage} alt={course.courseName} className="course-image" /> {/* Added a class name to the course image */}
              <div className="course-details"> {/* Added a class name to the course details */}
                <h5 className="course-name">{course.courseName}</h5> {/* Added a class name to the course name */}
                <p className="course-info">
                  Number of Modules: {course.numberOfModules}
                  <br />
                  Progress: 
                  <progress value={course.progress} max="100" className="progress-bar" />
                </p>
                <a href="/" className="view-details-link"> {/* Added a class name to the view details link */}
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
