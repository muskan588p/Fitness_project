import React, { useState } from "react";
import "../styles/apply.css"; // Import your CSS

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    dob: "",
    gender: "male",
    address: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
          setFormData({
            fullname: "",
            email: "",
            phonenumber: "",
            dob: "",
            gender: "male",
            address: "",
            state: "",
            city: "",
          });
        } else {
          alert("Failed to submit the form. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting the form.");
      });
  };

  return (
    <section className="container">
      <header>Registration Form</header>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="number"
              name="phonenumber"
              placeholder="Enter phone number"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input
              type="date"
              name="dob"
              placeholder="Enter birth date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input
                type="radio"
                id="check-male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="check-female">Female</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-other"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              <label htmlFor="check-other">Prefer not to say</label>
            </div>
          </div>
        </div>

        <div className="input-box address">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter street address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="column">
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default RegistrationForm;