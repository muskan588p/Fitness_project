// routes/cheatsheet.js
const express = require('express');
const authenticateUser = require("../middleware/jwtAuthMiddleware");

const router = express.Router();

// Route to access the cheatsheet, only available to trainers
router.get('/cheatsheet', authenticateUser, (req, res) => {
  // Check if the user is a trainer
  if (req.user.role !== 'trainer') {
    return res.status(403).send("Only trainers can access this page");
  }
  
  // If the user is a trainer, allow access to the cheatsheet
  res.render('cheatsheet', { user: req.user }); // Render the cheatsheet page
});

module.exports = router;
