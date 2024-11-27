import React, { useState, useEffect } from "react";
import "../styles/book.css";

const BookGymSession = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [bookedSlots, setBookedSlots] = useState([]);

  const handleCardClick = (category, value) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: value }));
  };

  const handleBookNow = () => {
    const { preferredDay, exerciseType, timeSlot, trainer, sessionType } =
      selectedOptions;

    if (preferredDay && exerciseType && timeSlot && trainer && sessionType) {
      const bookingData = { preferredDay, exerciseType, timeSlot, trainer, sessionType };

      fetch("/book-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: Bearer ${localStorage.getItem("token")}, // Ensure token is provided if required
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Booking successful!");
            window.location.href = "/";
          } else if (response.status === 409) {
            alert("This session is already booked.");
          } else {
            alert("Error booking session. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error booking session:", error);
          alert("Error booking session. Please try again.");
        });
    } else {
      alert("Please select all options before booking.");
    }
  };

  useEffect(() => {
    // Fetch booked slots when component loads
    fetch("/booked-slots")
      .then((response) => response.json())
      .then((bookings) => {
        setBookedSlots(bookings);
      })
      .catch((error) => console.error("Error fetching booked slots:", error));
  }, []);

  const isBooked = (category, value) =>
    bookedSlots.some(
      (booking) => booking[category] === value || booking.timeSlot === value
    );

  const renderCards = (category, items) =>
    items.map((item) => (
      <div
        key={item}
        className={`card ${
          selectedOptions[category] === item ? "selected" : ""
        } ${isBooked(category, item) ? "booked" : "available"}`}
        onClick={() =>
          !isBooked(category, item) && handleCardClick(category, item)
        }
      >
        {item}
      </div>
    ));

  return (
    <div>
      <header>
        <h1>Book Your Gym Session</h1>
        <p>Select your preferences and schedule your workout!</p>
      </header>

      {/* Preferred Day Section */}
      <section className="category">
        <h2>Preferred Day</h2>
        <div className="card-container">
          {renderCards("preferredDay", [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ])}
        </div>
      </section>

      {/* Exercise Type Section */}
      <section className="category">
        <h2>Exercise Type</h2>
        <div className="card-container">
          {renderCards("exerciseType", [
            "Cardio",
            "Yoga",
            "Strength-Training",
            "Zumba",
            "Weight-Lifting",
            "Pilates",
          ])}
        </div>
      </section>

      {/* Time Slot Section */}
      <section className="category">
        <h2>Preferred Time Slot</h2>
        <div className="card-container">
          {renderCards("timeSlot", [
            "6:00 AM - 7:00 AM",
            "7:00 AM - 8:00 AM",
            "8:00 AM - 9:00 AM",
            "9:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "12:00 PM - 1:00 PM",
            "1:00 PM - 2:00 PM",
            "2:00 PM - 3:00 PM",
            "3:00 PM - 4:00 PM",
            "4:00 PM - 5:00 PM",
          ])}
        </div>
      </section>

      {/* Trainer Section */}
      <section className="category">
        <h2>Preferred Trainer</h2>
        <div className="card-container">
          {renderCards("trainer", ["John Doe", "Jane Smith", "Alex Johnson"])}
        </div>
      </section>

      {/* Session Type Section */}
      <section className="category">
        <h2>Session Type</h2>
        <div className="card-container">
          {renderCards("sessionType", ["Online", "Offline"])}
        </div>
      </section>

      {/* Book Now Button */}
      <div className="book-now">
        <button id="book-now" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookGymSession;