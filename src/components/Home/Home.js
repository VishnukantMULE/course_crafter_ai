import React from 'react';
import { Link } from 'react-router-dom';
import bgvideo from './Videos/backgroundvideo.mp4'
import './style/Home.css'

export default function Home() {
  return (
    <div className="homepage">
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="logo.png" alt="Logo" width="50" height="50" className="mr-2" />
            <span className="brand-text">Course Crafter</span>
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="fullscreen-video-container">
        <video autoPlay muted loop className="fullscreen-video">
          <source src={bgvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to Course Crafter</h1>
          <p>Your personalized learning experience</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="section">
              <h2>Course Generation</h2>
              <p>Generate courses based on your inputs. Let AI craft your learning path.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="section">
              <h2>Interactive Modules</h2>
              <p>Engage with interactive modules and quizzes tailored to your course.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="section">
              <h2>Personalized Learning</h2>
              <p>Receive personalized recommendations and adapt your learning experience.</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <div className="section">
              <h2>Track Progress</h2>
              <p>Monitor your progress, complete quizzes, and achieve your learning goals.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white text-center py-3">
        <div className="container">
          <h4>About Us</h4>
          <p>Connect with Us.</p>
        </div>
      </footer>
    </div>

  );
}
