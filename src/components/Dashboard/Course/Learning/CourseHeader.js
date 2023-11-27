import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/CourseHeader.css'
import crosspng from './style/ICONS/cross.png'
import togglepng from './style/ICONS/toggle.png'

export default function CourseHeader({ courseId, username, onToggleNavbar }) {
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);


  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await fetch('http://localhost:5000/access/getcoursename', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId: courseId }),
        });
    
        if (response.ok) {
          const data = await response.json();
          const { courseName } = data;
          setCourseName(courseName);
        } else {
          console.error('Error fetching course name:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course name:', error);
      }
    };
    
    fetchCourseName();
    // fetchUserProgress();
  }, [courseId, username]);
  
  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    onToggleNavbar(); 
  };
  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
<div className="course-header">
      {isNavbarVisible ? (
        <img src={crosspng} alt="Toggle Navbar" className="navbar-icon" onClick={handleToggleNavbar} />
      ) : (
        <img src={togglepng} alt="Toggle Navbar" className="navbar-icon" onClick={handleToggleNavbar} />
      )}
      <div className="course-name">{courseName}</div>
      <button className='button' onClick={handleGoBack}>Back</button>
      
    </div>
  );
}
