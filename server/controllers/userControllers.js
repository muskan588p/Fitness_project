const bcrypt = require("bcrypt");
const userModel = require("../models/UserSignupModel");
const trainerModel = require("../models/trainerModel");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
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

    return res.send(`
      <script>
        alert("Registration successful! You can now log in.");
        window.location.href = "/login";
      </script>
    `);

  //   // Generate JWT token
  //   const token = jwt.sign(
  //     { 
  //         id: gym_new_user._id, 
  //         email: gym_new_user.email ,
  //         role: "user",
  //     },
  //     process.env.JWT_SECRET_KEY,
  //     { 
  //         expiresIn: "1h" 
  //     }
  //   );  

  // console.log("Generated Token:", token);

  // gym_new_user.token=token;
  // gym_new_user.password=undefined;   //server will not send password to the user-undefined

    // Render the login page with a success message
    // return res.status(201).render("login", { success: 1 });
    // return res.status(201).redirect("/login?success=1");
    // res.status(201).json(gym_new_user)

  } catch (error) {
    console.log("Error during signup:", error);
    return res.status(400).send("An error occurred during signup.");
  }
};


//Login Handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    let userData = await userModel.findOne({ email });
    let role = "user";

    // If not found in user database, check in trainer database
    if (!userData) {
      userData = await trainerModel.findOne({ email });
      if (userData) role = "trainer";
    }

    if (!userData) {
      return res.status(401).send("User is not registered");
    }

    //validate password(match)
    // const isMatch = await bcrypt.compare(password, userData.password);
    const isMatch = userData.password === password || await bcrypt.compare(password, userData.password);

    if (isMatch && userData) {
        // Generate JWT token
      const token = jwt.sign(
        {
          id: userData._id,
          email: userData.email,
          role,
          user: { fullname: userData.fullname, role },
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      userData.password = undefined;

      console.log("Generated Token:", token);

      // Passing the token to the login page
      // return res.render("login", {

      //   token,
      //   user: {
      //     fullname: userData.fullname,
      //     role,
      //   },
      // });

      // Respond with JSON containing the token and user info
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          fullname: userData.fullname,
          role,
        },
      });
    }

    res.status(401).send("Invalid email or password");
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("An error occurred during login");
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