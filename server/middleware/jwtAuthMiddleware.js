// const jwt = require("jsonwebtoken");
// const userModel = require("../models/UserSignupModel");

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; 

//   if (!token) {
//     return res.status(401).send("Access denied. No token provided.");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await userModel.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(400).send("Invalid token.");
//   }
// };

// module.exports = authenticate;

const jwt = require("jsonwebtoken");

const validateJwtToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    console.error("Authorization header missing");
    return res.status(401).json({ error: "Token not available" });
  }

  // Extract the token from the header
  const token = authorization.split(" ")[1];
  if (!token) {
    console.error("Token not found in Authorization header");
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    // Verify the token using the secret/private key
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decodedToken; // Attach the decoded user information to the request object
    console.log("JWT validation successful:", decodedToken);
    next(); 
  } catch (err) {
    console.error("JWT validation failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { validateJwtToken };
