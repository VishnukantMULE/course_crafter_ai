// AdminNavbar.js
import React, { useState } from 'react';
import '../style/AdminNavbar.css';
import { useAdminContext } from '../Login/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar({ onOptionChange }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { logout } = useAdminContext();
  const navigate=useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleOptionClick = (option) => {
    onOptionChange(option);
    setSelectedOption(option);
    toggleSidebar();
  };

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <div className="navbar-container">
      <div className="company-name">
        <a href="/" className='company-name'>
          CourseCrafter AI
        </a>
      </div>
      <div className={`toggle-button ${showSidebar ? 'show' : ''}`} onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <nav>
          <ul className="nav-list">
            <li role="button" className={selectedOption === 'allusers' ? 'selected' : ''} onClick={() => handleOptionClick('allusers')}>
              All Users
            </li>
            <li className={selectedOption === 'allcourses' ? 'selected' : ''} onClick={() => handleOptionClick('allcourses')}>All Courses</li>
            <li role="button" onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
