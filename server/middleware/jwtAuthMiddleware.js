const jwt = require("jsonwebtoken");
const userModel = require("../models/UserSignupModel");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;
