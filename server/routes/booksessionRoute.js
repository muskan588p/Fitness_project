const express = require("express");
const bookingSchema = require("./models/bookingModel");
const authenticateUser = require("./middleware/authenticateUser"); // Import the authentication middleware
const { signup, login, logout } = require("./controllers/userControllers");


const router = express.Router();

router.post("/book-session", async (req, res) => {
  try {

    //console.log(req.userData.email);
    const bookingData = new bookingSchema({
      preferredDay: req.body.preferredDay,
      exerciseType: req.body.exerciseType,
      timeSlot: req.body.timeSlot,
      trainer: req.body.trainer,
      sessionType: req.body.sessionType,
      // userId: req.user.id // Storing the user who is booking the session
     // email: req.userData.email  // Store the email of the user who is booking the session
    });

    const bookedSession = await bookingData.save();
    res.send('<h1>Booking successful!</h1><a href="/">Go back</a>');
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).send('<h1>Error saving booking!</h1><a href="/">Try again</a>');
  }
});

module.exports = router;
