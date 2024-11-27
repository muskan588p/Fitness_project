import React from "react";
import "../styles/signup.css";

const Navbar = () => {
  return (
    <nav>
      {/* Placeholder for Navbar content */}
    </nav>
  );
};

const SignupForm = () => {
  return (
    <div className="form__container">
      <div className="form__card">
        <h2>Join Us!</h2>
        <p>Create an account to get started</p>
        <form action="/signup" method="POST">
          <div className="form__group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="fullname"
              placeholder="Enter your full name"
              required
            />
          </div>
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
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Enter your gender"
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
          <div className="form__group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmpassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="form__link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <SignupForm />
    </div>
  );
};

export default App;