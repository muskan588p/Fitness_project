const bcrypt = require("bcrypt");
const userModel = require("../models/UserSignupModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Handler
const signup = async (req, res) => {
  try {
    const { fullname, email, phonenumber, age, gender, password, confirmpassword } = req.body;

    if (!fullname || !email|| !phonenumber || !age || !gender || !password || !confirmpassword) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    if (password.trim() !== confirmpassword.trim()) {
      return res.status(400).send("Passwords do not match");
    }

    const hashedPass = await bcrypt.hash(password.trim(), 10);

    const gym_new_user = new userModel({
      fullname,
      email,
      phonenumber,
      age,
      gender,
      password: hashedPass,
    });

    await gym_new_user.save();
    console.log("User successfully registered");

    // Render the login page with a success message
    // return res.status(201).render("login", { success: 1 });
    return res.status(201).redirect("/login?success=1");

  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(400).send("An error occurred during signup.");
  }
};

// Login Handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }

    const userdata = await userModel.findOne({ email });
    if (!userdata) {
      return res.status(401).send("Invalid email or password");
    }

    //validate password
    const isMatch = await bcrypt.compare(password, userdata.password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
        { 
            id: userdata._id, 
            email: userdata.email 
        },
        process.env.JWT_SECRET_KEY,
        { 
            expiresIn: "1h" 
        }
      );  

    console.log("Generated Token:", token);

    // Store user info in session
    req.session.user = { username: userdata.fullname }; 

    return res.redirect("/");

    // return res.status(200).json({
    //     message: "Login successful",
    //     token,
    //     user: {
    //       id: userdata._id,
    //       fullname: userdata.fullname,
    //       email: userdata.email,
    //     },
    //   });
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({ message: "An error occurred during login" });
    }
};

// Logout Handler
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Error logging out.");
    }
    res.redirect("/");
  });
};

module.exports = { signup, login, logout };
