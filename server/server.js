const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { signup, login, logout } = require("./controllers/userControllers");
const path = require("path");
const app = express();
const hbs = require("hbs");
// const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const userModel = require("./models/UserSignupModel");
const trainerModel=require("./models/applicationModel");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const multer=require("multer");
const bookingSchema=require("./models/bookingModel");
// const authorizeTrainer = require("./middleware/jwtAuthMiddleware");
const cookieparser = require("cookie-parser");

const authenticateToken = require('./middleware/jwtAuthMiddleware');
const Booking = require('./models/bookingModel');
// const cheatsheetRoute = require("./routes/cheatsheetRoute");

// const storage=multer.diskStorage({
//     destination: function(req,file,cb) {          //konse folder ke andar file ko store krna hai
//         return cb(null,"./uploads");
//     },  
//     filename: function(req,file,cb){
//         return cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload=multer({storage: storage});

// dotenv.config();

connectDb();

app.use(
  session({
    secret: "123abc", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())

// const static_path=path.join(__dirname, "../client");
const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

// app.use(express.static(static_path));  //isse main index.hmtl khulgyi
//app.("public", "public");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  if (arg1 == arg2) {
    return options.fn(this); // Render the block inside {{#ifEquals}}
  }
  return options.inverse(this); // Render the block inside {{else}}
});
// app.get('/',(req,res)=>{
//     res.send("working");
// });

console.log(template_path);

app.get("/login",  (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});


//signup route
// app.post("/signup", async (req, res) => {
//   try {
//     const pass = req.body.password.trim();
//     const cpass = req.body.confirmpassword.trim();

//     if (pass === cpass) {
//       const hashedPass = await bcrypt.hash(pass, 10);

//       const gym_new_user = new userModel({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         phonenumber: req.body.phonenumber,
//         age: req.body.age,
//         gender: req.body.gender,
//         password: hashedPass,
//       });

//       const registered = await gym_new_user.save();
//       //   res.redirect('/login');
//       //   res.status(201).render("login");
//       // res.redirect("/login?success=1");
//       res.status(201).render("login", { success: 1 });

//       console.log("User successfully registered");
//     } else {
//       res.send("password are not matching");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// //login route
// // app.post("/login", async (req, res) => {
// //   try {
// //     const email = req.body.email;
// //     const password = req.body.password;

// //     const userdata = await userModel.findOne({ email: email });

// //     bcrypt.compare(password, userdata.password, function (err, isMatch) {
// //       if (isMatch === true) {
// //         req.session.user = { username: userdata.fullname }; // Store username in the session// res.status(201).render("index");
        
// //         console.log("Login Successful");
// //         res.status(201).redirect("/");
// //       } else {
// //         res.status(401).send("Invalid email or password");
// //         // res.send("Invalid Login details");
// //       }
// //     });
// //   } catch (error) {
// //     res.status(400).send("invalid login details");
// //   }
// // });

// //login route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userdata = await userModel.findOne({ email });

//     if (!userdata) {
//       return res.status(401).send("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, userdata.password);

//     if (!isMatch) {
//       return res.status(401).send("Invalid email or password");
//     }

//     const token = userdata.generateToken();
//     console.log(token);

//     req.session.user = { username: userdata.fullname };

//     // res.status(200).json({
//     //   message: "Login successful",
//     //   token,
//     //   user: {
//     //     id: userdata._id,
//     //     fullname: userdata.fullname,
//     //     email: userdata.email,
//     //   },
//     // })
//     return res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred during login.");
//   }
// });


// //logout route
// app.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error during logout:", err);
//       return res.status(500).send("Error logging out.");
//     }
//     res.redirect("/");
//   });
// });

app.post("/signup", signup); // signup controller
app.post("/login", login);   // login controller
app.get("/logout", logout);  // logout controller
// app.post("/cheatsheet", cheatsheet);  // logout controller

app.get("/", (req, res) => {
  const username = req.session.user?.username || null; // Retrieve username from session
  const role = req.session.user?.role || null; // Retrieve role from session
  res.render("index", { username, role });
});

// console.log(template_path);

app.get("/apply", (req, res) => {
  res.render("apply");
});

app.get("/book", (req, res) => {
  res.render("book");
});

app.get("/cheatsheet", (req, res) => {
  res.status(200).render("cheatsheet");
});


// app.get("/cheatsheet", authorizeTrainer, (req, res) => {
//   res.render("cheatsheet");
// });

// app.post("/apply", upload.single("file"), async (req, res) => {
app.post("/apply", async (req, res) => {
  try {
    const trainer_user = new trainerModel({
      fullname: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      country:req.body.country,
      state:req.body.state,
      city:req.body.city,
      postalcode:req.body.postalcode,
    //   file:req.body.file,
    });

    const registered = await trainer_user.save();
    res.status(201).redirect("/");
    console.log("new trainer applied");

  } catch (error) {
    res.status(400).send("invalid login details");
  }
});

// app.post("/book-session", async (req, res) => {
//   const bookinguser=new bookingSchema({
//     preferredDay:req.body.preferredDay,
//     exerciseType:req.body.exerciseType,
//     timeSlot:req.body.timeSlot,
//     trainer:req.body.trainer,
//     sessionType:req.body.sessionType,

//   });

//   try {
//     const bookuser=await bookinguser.save();
//     res.send('<h1>Booking successful!</h1><a href="/">Go back</a>');
//   } catch (error) {
//     res.status(500).send('<h1>Error saving booking!</h1><a href="/">Try again</a>');
//   }
// });

////////////////////////////////////////////////////////////////////////////////
// app.post('/book-session', async (req, res) => {
//   const { preferredDay, exerciseType, timeSlot, trainer, sessionType } = req.body;

//   try {
//       // Save the booking
//       const newBooking = new Booking({ preferredDay, exerciseType, timeSlot, trainer, sessionType });
//       await newBooking.save();
//       res.status(200).json({ message: "Booking successful!" });
//   } catch (error) {
//       if (error.code === 11000) { // MongoDB duplicate key error
//           res.status(409).json({ message: "This session is already booked." });
//       } else {
//           console.error("Error creating booking:", error);
//           res.status(500).json({ message: "Internal server error." });
//       }
//   }
// });

app.post("/book-session", async (req, res) => {
  try {
      const { preferredDay, exerciseType, timeSlot, trainer, sessionType, userId } = req.body;

       // Log the received data
       console.log("Booking data received:", req.body);


      // Check if the same time slot is already booked
      const existingBooking = await Booking.findOne({ timeSlot, preferredDay, trainer });
      if (existingBooking) {
          return res.status(400).json({ message: 'This session is already booked.' });
      }

      // Create a new booking record
      const newBooking = new Booking({
          preferredDay,
          exerciseType,
          timeSlot,
          trainer,
          sessionType,
          userId,
      });

      // Save the booking to the database
      await newBooking.save();
      
      res.status(200).json({ message: 'Booking successful!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error booking session. Please try again.' });
  }
});


app.get('/booked-slots', async (req, res) => {
  try {
      const bookings = await Booking.find({});
      res.status(200).json(bookings);
  } catch (error) {
      console.error("Error fetching booked slots:", error);
      res.status(500).json({ message: "Internal server error." });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
