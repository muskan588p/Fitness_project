import React, { useState, useEffect } from "react";
import "../styles/styles.css"; // Adjust the path based on your project structure.

const Header = ({ username, role }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/logout";
  };

  const accessGymData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/cheatsheet", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "/cheatsheet";
          } else {
            alert("You do not have access to this page.");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("You need to log in first.");
    }
  };

  return (
    <header>
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img
                src="../../logo-white.png"
                alt="logo"
                className="logo-white"
              />
              <img src="../../logo-dark.png" alt="logo" className="logo-dark" />
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#service">Services</a>
          </li>
          <li>
            <a href="#class">Classes</a>
          </li>
          <li>
            <a href="#contact">Blog</a>
          </li>
        </ul>
        <div className="nav__btns">
          {username ? (
            <>
              <span className="welcome-text">Welcome, {username}</span>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          )}
        </div>
      </nav>

      <div className="section__container header__container" id="home">
        <div className="header__content">
          <h1>DON'T STOP TILL YOUR SUCCESS!</h1>
          <h2>GET FIT TO HAPPY</h2>
          <p>
            Unlock your full potential with our expert training and
            state-of-the-art facilities. Every step you take brings you closer
            to a healthier, happier you. Let's make fitness a lifestyle!
          </p>
          <div className="header__btn">
            <button className="btn">Explore More</button>
          </div>
        </div>
        <div className="header__image">
          <img src="../../about.png" alt="header" />
        </div>
      </div>
    </header>
  );
};

const About = ({ role }) => (
  <div className="about" id="about">
    <div className="section__container about__container">
      <div className="about__image">
        <img src="../../header.png" alt="about" />
      </div>
      <div className="about__content">
        <h2 className="section__header">Ready To Make A Change?</h2>
        <p>
          Taking the first step towards a healthier, stronger you can be the
          most challenging part of the journey, but it's also the most
          rewarding. Whether you're a beginner or a seasoned athlete, our
          personalized training programs are designed to help you reach your
          goals faster and more efficiently.
        </p>
        <p>
          With our motivating trainers, energizing classes, and
          state-of-the-art equipment, you'll have everything you need to stay
          committed and see real results.
        </p>
        <h3>Please login to book a session.........</h3>
        {role === "user" && (
          <div className="about__btn">
            <button
              className="btn"
              onClick={() => (window.location.href = "/book")}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Services = () => (
  <section className="service" id="service">
    <div className="section__container service__container">
      <h2 className="section__header">Services We Provide</h2>
      <div className="service__grid">
        {[
          { title: "Fitness Training", desc: "Build strength and endurance." },
          { title: "Yoga", desc: "Improve flexibility and mental clarity." },
          { title: "Gymnastics", desc: "Boost coordination and strength." },
          { title: "Karate", desc: "Focus on technique and growth." },
        ].map((service, index) => (
          <div className="service__card" key={index}>
            <span>{index + 1}</span>
            <h4>{service.title}</h4>
            <p>{service.desc}</p>
          </div>
        ))}
        <div className="service__image">
          <img src="../../service.png" alt="service" />
        </div>
      </div>
    </div>
  </section>
);

// You can follow the same pattern for other sections (Popular Classes, Mentor Section, etc.)

const App = () => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Simulating fetching user data from API/local storage
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    setUsername(storedUsername || null);
    setRole(storedRole || null);
  }, []);

  return (
    <>
      <Header username={username} role={role} />
      <About role={role} />
      <Services />
      {/* Add more components like Popular, MentorSection, Footer, etc. */}
    </>
  );
};

export default App;
