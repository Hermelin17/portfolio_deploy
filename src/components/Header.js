import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-photo">
          <img
            src="/Images/Teo.JPEG"
            alt="Teo Hedelin"
          />
        </div>
        <div className="header-info">
          <h1>Teo Hedelin</h1>
          <p className="tagline">Developer &amp; Creator</p>
          <h2 className="education-label">Education</h2>
          <p className="education">Master of Science in Media Technology, AI and Engineering</p>
          <a
            href="/Betyg_ENG.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="courses-btn"
          >
            Completed Courses
          </a>
          <p className="bio">
            Hi! My name is Teo and here are some of my projects — scroll
            through to explore.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
