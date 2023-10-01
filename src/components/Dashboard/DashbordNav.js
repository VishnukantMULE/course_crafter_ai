import React from 'react';
import './DashbordNav.css';
import logo from '../Home/Images/Logo/Course_Crafter.png';

export default function DashbordNav({ setSelectedOption, selectedOption }) {
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const logoStyle = {
        width: '50px',
        height: 'auto',
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={logo} alt="" style={logoStyle} />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${selectedOption === 'create-course' ? 'active' : ''}`} onClick={() => handleOptionClick('create-course')}>
                            <span className="nav-link">Create Course</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'my-learning' ? 'active' : ''}`} onClick={() => handleOptionClick('my-learning')}>
                            <span className="nav-link">My Learning</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'completed-courses' ? 'active' : ''}`} onClick={() => handleOptionClick('completed-courses')}>
                            <span className="nav-link">Completed Courses</span>
                        </li>
                        <li className={`nav-item ${selectedOption === 'notes' ? 'active' : ''}`} onClick={() => handleOptionClick('notes')}>
                            <span className="nav-link">Notes</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
