import React, { useEffect } from "react";
import "../styles/login.css";

// Navbar Component
const Navbar = () => {
  return (
    <nav>
      {/* Placeholder for Navbar content */}
      <div className="nav__container">
        <a href="/" className="nav__logo">MyApp</a>
        <ul className="nav__links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
        </ul>
      </div>
    </nav>
  );
};

// Alert Box Component
const AlertBox = ({ show, onClose }) => {
  return (
    <div className={`alert ${show ? "" : "hidden"}`}>
      <p>User registered successfully!</p>
      <span className="close-btn" onClick={onClose}>
        ✖
      </span>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add logic to handle login, such as sending a request to your server
  };

  return (
    <div className="form__container">
      <div className="form__card">
        <h2>Welcome Back!</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <p className="form__link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [showAlert, setShowAlert] = React.useState(false);

  useEffect(() => {
    // Simulating token handling
    const token = "{{token}}"; // Replace with actual server-side token
    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved in localStorage");
    }

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "1") {
      setShowAlert(true);
    }
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <Navbar />
      <AlertBox show={showAlert} onClose={closeAlert} />
      <LoginForm />
    </div>
  );
};

export default App;
