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

    // Generate JWT token
    const token = jwt.sign(
      { 
          id: gym_new_user._id, 
          email: gym_new_user.email ,
          role: "user",
      },
      process.env.JWT_SECRET_KEY,
      { 
          expiresIn: "1h" 
      }
    );  

  console.log("Generated Token:", token);

  gym_new_user.token=token;
  gym_new_user.password=undefined;   //server will not send password to the user-undefined

    // Render the login page with a success message
    // return res.status(201).render("login", { success: 1 });
    // return res.status(201).redirect("/login?success=1");
    res.status(201).json(gym_new_user)

  } catch (error) {
    console.error("Error during signup:", error);
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

      // If found in trainer database, assign role as 'trainer'
      if (userData) {
        role = "trainer";
      }
    }

    if (!userData) {
      return res.status(401).send("user in not registered");
    }

    //validate password(match)
    const isMatch = await bcrypt.compare(password, userData.password);

    if (isMatch && userData) {
        // Generate JWT token
      const token = jwt.sign(
        { 
            id: userData._id, 
            email: userData.email ,
            role,
        },
        process.env.JWT_SECRET_KEY,
        { 
            expiresIn: "1h" 
        }
      );  
      userData.token=token;
      userData.password=undefined;
      
      console.log("Generated Token:", token);

      //cookie
      // const options={
      //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      //   httpOnly:true
      // };
      // res.status(200).cookie("token", token, options).json({
      //   success:true,
      //   token,
      //   user:userData
      // })

      // res.cookie("token", token, options).json({
      //   success: true,
      //   message: "Login successful",
      //   user: {
      //     id: userData._id,
      //     fullname: userData.fullname,
      //     email: userData.email,
      //     role: userData.role,
      //   }
      // });

      const ver=await jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(ver);

      req.session.user = { username: userData.fullname, role: role }; 
       return res.redirect("/");
    }

    

    // console.log("Generated Token:", token);

    // Store user info in session
    // req.session.user = { username: userData.fullname, role: role }; 

    // return res.redirect("/");

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
