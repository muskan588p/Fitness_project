const jwt = require("jsonwebtoken");
const user = require("../models/UserSignupModel");

const authenticateUser = async (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).send("Unauthorized access. No token provided.");
  }

  // const jwttoken = token.replace("bearer", "").trim();
  const jwttoken = token.startsWith("Bearer ") ? token.split(" ")[1] : token.trim();
  console.log("Extracted token:", jwttoken);

  try {
    // Verify the token using the secret/private key
    const decodedToken = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);
    req.user = decodedToken; // Attach the decoded user information to the request object
    console.log("User authenticated:", decodedToken);

    // Fetch user data from the database
    const userData = await user.findOne({ email: decodedToken.email });

    if (!userData) {
      return res.status(404).send("User not found.");
    }

    console.log("Fetched user data:", userData);

    // Check if the user is a trainer
    if (req.originalUrl.includes("cheatsheet") && userData.role !== "trainer") {
      return res.status(403).send("Access denied. Only trainers can access this route.");
    }

    next(); // Allow the request to continue if user is authenticated and has the correct role
  } catch (err) {
    console.error("JWT validation failed:", err.message);
    return res.status(401).send("Invalid or expired token");
  }
};

module.exports = authenticateUser;





// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   const authorization = req.header.authorization;

  

//   if (!authorization) {
//     return res.status(401).send("Please log in to book a session");
//   }

//   // Extract the token from the header
//   const token = authorization.split(" ")[1];
//   console.log("Extracted token:", token);

//   if (!token) {
//     return res.status(401).send("Unauthorized access. No token provided.");
//   }

//   try {
//     // Verify the token using the secret/private key
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decodedToken; // Attach the decoded user information to the request object
//     console.log("User authenticated:", decodedToken);


//     next(); // Allow the request to continue if user is authenticated and not a trainer
//   } catch (err) {
//     console.error("JWT validation failed:", err.message);
//     return res.status(401).send("Invalid or expired token");
//   }
// };

// module.exports = authenticateUser;





// const jwt = require("jsonwebtoken");

// const authorizeTrainer = (req, res, next) => {
//   const authorization = req.headers.authorization;

//   if (!authorization) {
//     // return res.status(401).send("Please log in to book a session");
//     return res.status(401).send("Authorization token missing. Please log in.");
//   }

//   // Extract the token from the header
//   const token = authorization.split(" ")[1];
//   if (!token) {
//     return res.status(401).send("Unauthorized access. No token provided.");
//   }

//   try {
//     // Verify the token using the secret/private key
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // req.user = decodedToken; // Attach the decoded user information to the request object
//     // console.log("User authenticated:", decodedToken);

//     // Check role
//     if (decodedToken.role !== "trainer") {
//       return res.status(403).send("Access denied. Only trainers can view this page.");
//     }

//     req.user = decodedToken; // Attach decoded token to request object
//     next(); // Allow the request to continue if user is authenticated and not a trainer
//   } catch (err) {
//     console.error("Authorization failed", err.message);
//     return res.status(401).send("Invalid or expired token");
//   }
// };

// module.exports = authorizeTrainer;



