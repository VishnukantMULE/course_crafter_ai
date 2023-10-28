import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/CourseHeader.css'
import crosspng from './style/ICONS/cross.png'
import togglepng from './style/ICONS/toggle.png'

export default function CourseHeader({ courseId, username, onToggleNavbar }) {
  const [courseName, setCourseName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);


  useEffect(() => {
    // Define a function to fetch the course name
    const fetchCourseName = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getcoursename', {
          courseId: courseId,
        });

        // Extract the course name from the response
        const { courseName } = response.data;

        setCourseName(courseName);
      } catch (error) {
        console.error('Error fetching course name:', error);
      }
    };

    // Define a function to fetch the user's progress
    const fetchUserProgress = async () => {
      try {
        // Make an API call to fetch the user's progress based on courseId and username
        const response = await axios.post('http://localhost:5000/getuserprogress', {
          courseId: courseId,
          username: username,
        });

        // Extract the user's progress from the response
        const userProgress = response.data.progress;

        setProgress(userProgress);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    // Call both fetchCourseName and fetchUserProgress functions when the component mounts
    fetchCourseName();
    fetchUserProgress();
  }, [courseId, username]);
  
  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    onToggleNavbar(); // Call the provided onToggleNavbar callback if needed
  };

  return (
<div className="course-header">
      {isNavbarVisible ? (
        <img src={crosspng} alt="Toggle Navbar" className="navbar-icon" onClick={handleToggleNavbar} />
      ) : (
        <img src={togglepng} alt="Toggle Navbar" className="navbar-icon" onClick={handleToggleNavbar} />
      )}
      <div className="course-name">{courseName}</div>
      {progress}
    </div>
  );
}
