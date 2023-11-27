import React, { useState } from 'react';
import './Course/style/DashbordNav.css';
// import logo from '../Home/Images/Logo/Course_Crafter.png';

import togglepng from './Course/Learning/style/ICONS/toggle.png'
import crosspng from './Course/Learning/style/ICONS/cross.png'
import { FaNotesMedical,FaMicrochip } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SiProgress } from "react-icons/si";





export default function DashbordNav({ setSelectedOption, selectedOption }) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);



    const handleOptionClick = (option) => {
        setSelectedOption(option);
        document.querySelector(".navbar-collapse").classList.remove("show");
        setIsNavExpanded(false);
    };
    const handleNavToggleClick = () => {
        setIsNavExpanded(!isNavExpanded);
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className='comapanyname'>
                 <a href="/" className='comapanyname'>
                CourseCrafter AI
                    </a>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={handleNavToggleClick}
                    
                >
                     {isNavExpanded ? (
            <img src={crosspng} alt="Cross Icon" className="navbar-icon" />
          ) : (
            <img src={togglepng} alt="Toggle Icon" className="navbar-icon" />
          )}
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${selectedOption === 'create-course' ? 'active' : ''}`} onClick={() => handleOptionClick('create-course')}>
                            <span className="nav-link"> <FaMicrochip/> &nbsp; Generate Course</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'my-learning' ? 'active' : ''}`} onClick={() => handleOptionClick('my-learning')}>
                            <span className="nav-link"><SiProgress /> &nbsp; My Learning</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'completed-courses' ? 'active' : ''}`} onClick={() => handleOptionClick('completed-courses')}>
                            <span className="nav-link"><IoCheckmarkDoneCircle /> &nbsp; Completed Courses</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'notes' ? 'active' : ''}`} onClick={() => handleOptionClick('notes')}>
                            <span className="nav-link"> <FaNotesMedical /> &nbsp; Notes</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'profile' ? 'active' : ''}`} onClick={() => handleOptionClick('profile')}>
                        <span className="nav-link"> <FaUserCircle /> &nbsp; Profile</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
