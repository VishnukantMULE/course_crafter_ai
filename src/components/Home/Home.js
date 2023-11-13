import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css';
import { useInView } from 'react-intersection-observer';

import crosspng from '../Dashboard/Course/Learning/style/ICONS/cross.png';
import togglepng from '../Dashboard/Course/Learning/style/ICONS/toggle.png';

import generatorpng from '../Home/Images/Logo/generator.png';
import interactivepng from '../Home/Images/Logo/interactive.png';
import personalisepng from '../Home/Images/Logo/personalise.png';
import progresspng from '../Home/Images/Logo/progress.png';
import wallpaper from './Images/Wallpaper/steptodown.com213485.jpg';

export default function Home() {
  const [isToggled, setIsToggled] = useState(false);

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
  });

  const [navbarRef, navbarInView] = useInView({
    triggerOnce: true,
  });

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="homepage">
    <nav
      ref={navbarRef}
      className={`navbar navbar-expand-lg navbar-dark bg-black ${navbarInView ? 'animate__animated animate__fadeInDown' : ''}`}
    >
        <div className="container">
          <Link className="navbar-brand" to="/">
            {/* <img src={logo} alt="Logo" width="30" height="30" className="mr-2" /> */}
            <span className="brand-text ">CourseCrafter AI</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            {isToggled ? <img src={crosspng} alt="cross" /> : <img src={togglepng} alt="toggle" />}
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
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  For Vishnukant
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="fullscreen-video-container">
        <img  className="fullscreen-video" src={wallpaper} alt="wallpaper" />
        {/* <video autoPlay muted loop className="fullscreen-video">
          <source src={bgvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <div className="video-overlay">
          <h1 className="bordered-text">
            Welcome To CourseCrafterAI
          </h1>
          <p>Your personalized learning experience</p>

        </div>
        


      </div>

      <section className="feature-section-container mt-5">
        <div className="feature-row">
          <div className="feature-col">
            <div className="feature-item">
              <img src={generatorpng} alt="Generator" className="feature-image" />
              <h2>Course Generation</h2>
              <p>Generate courses based on your inputs. Let AI craft your learning path.</p>
            </div>
          </div>
          <div className="feature-col">
            <div className="feature-item">
              <img src={interactivepng} alt="Interactive" className="feature-image" />
              <h2>Interactive Modules</h2>
              <p>Engage with interactive modules and quizzes tailored to your course.</p>
            </div>
          </div>
          <div className="feature-col">
            <div className="feature-item">
              <img src={personalisepng} alt="Personalize" className="feature-image" />
              <h2>Personalized Learning</h2>
              <p>Receive personalized recommendations and adapt your learning experience.</p>
            </div>
          </div>
        </div>
        <div className="feature-row mt-5">
          <div className="feature-col feature-col-wide">
            <div className="feature-item">
              <img src={progresspng} alt="Progress" className="feature-image" />
              <h2>Track Progress</h2>
              <p>Monitor your progress, complete quizzes, and achieve your learning goals.</p>
            </div>
          </div>
        </div>
      </section>

      <br />
      <hr />
      <footer
        ref={footerRef}
        className={`bg-black text-white text-center py-5 ${footerInView ? 'animate__animated animate__fadeInUp' : ''}`}
      >
        <div className="container">
          {/* <h4>About Me</h4>
          <p>Vishnukant Mule       :     India</p> */}
          <p>Connect with Me:</p>
          <div className="social-icons mb-3">
            <a href="https://dev.to/vishnukantmule" className="text-white mx-2">
              Dev.to
            </a>
            <a href="https://github.com/VishnukantMULE" className="text-white mx-2">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vishnukant-mule-5a9ba5221/" className="text-white mx-2">
              LinkdIn
            </a>
          </div>
          <hr />
          <p>&copy; 2023 CourseCrafter AI. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
}
