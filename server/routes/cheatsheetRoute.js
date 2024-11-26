const express = require("express");
const authorizeTrainer = require("../middlewares/authorizeTrainer");

const router = express.Router();

router.get("/cheatsheet", authorizeTrainer, (req, res) => {
  // Logic for serving the cheatsheet page
  res.status(200).send(`
    <html>
      <head><title>Trainer Cheatsheet</title></head>
      <body>
        <h1>Welcome, Trainer!</h1>
        <p>This is your exclusive cheatsheet.</p>
      </body>
    </html>
  `);
});

module.exports = router;
