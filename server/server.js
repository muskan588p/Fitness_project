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
const applicationModel=require("./models/applicationModel");
const trainerModel=require("./models/trainerModel");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const bookingSchema=require("./models/bookingModel");
// const authorizeTrainer = require("./middleware/jwtAuthMiddleware");
const cookieparser = require("cookie-parser");

const Booking = require('./models/bookingModel');
// const authenticateUser = require("./middleware/jwtAuthMiddleware");

// const cheatsheetRoutes = require('./routes/cheatsheet');
// app.use(cheatsheetRoutes);

const crypto=require("crypto");
const multer = require('multer');

const storage=multer.diskStorage({
  destination: function(req,file,cb) {          //konse folder ke andar file ko store krna hai
      return cb(null,"./uploads");
  },  
  filename: function(req,file,cb){
      crypto.randomBytes(12,function(err,bytes){
        const fn=bytes.toString("hex") + path.extname(file.originalname);
        return cb(null, fn);
      })     
  },
});

const upload = multer({ storage: storage });


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

// app.get("/cheatsheet", (req, res) => {
//   res.status(200).render("cheatsheet");
// });


app.post("/appl", upload.single("file"), async (req, res) => {
// app.post("/apply", async (req, res) => {
  try {
    const application_user = new applicationModel({
      fullname: req.body.fullname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      state:req.body.state,
      city:req.body.city,
    //   file:req.body.file,
    });

    await application_user.save();
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
app.post('/book-session', async (req, res) => {
  
  console.log("Request body:", req.body); // Log incoming data
  //console.log("User data:", req.user);   // Log authenticated user data

  const { preferredDay, exerciseType, timeSlot, trainer, sessionType } = req.body;

  try {
      //const email = req.user.email; // Extract email from authenticated user

        // Ensure all required fields are present
        if ( !preferredDay || !exerciseType || !timeSlot || !trainer || !sessionType) {
            return res.status(400).send("All fields are required");
      }
      // Save the booking
      const newBooking = new Booking({ preferredDay, exerciseType, timeSlot, trainer, sessionType });
      await newBooking.save();
      res.status(200).json({ message: "Booking successful!" });
  } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
          res.status(409).json({ message: "This session is already booked." });
      } else {
          console.error("Error creating booking:", error);
          res.status(500).json({ message: "Internal server error." });
      }
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


// // Middleware to verify token
// const verifyToken = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   console.log(authorization);

//   if (!authorization) {
//     return res.status(401).send("Unauthorized access. No token provided.");
//   }

//   const token = authorization.split(" ")[1];
//   console.log("Extracted token:", token);
  
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


const authenticateUser = async (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    console.error("No token provided.");
    return res.status(401).send("Unauthorized access. No token provided.");
  }

  const jwttoken = token.startsWith("Bearer ") ? token.split(" ")[1] : token.trim();
  console.log("Extracted token:", jwttoken);

  try {
    const decodedToken = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;

    if (req.originalUrl.includes("cheatsheet")) {
      console.log("Checking trainer collection for email:", decodedToken.email);
      const trainerData = await trainerModel.findOne({ email: decodedToken.email, role: "trainer" });

      if (!trainerData) {
        console.error("Trainer not found or role mismatch.");
        return res.status(403).send("Access denied. Trainer not found or invalid role.");
      }

      console.log("Trainer validated:", trainerData);
    } else {
      console.log("Checking user collection for email:", decodedToken.email);
      const userData = await userModel.findOne({ email: decodedToken.email });

      if (!userData) {
        console.error("User not found.");
        return res.status(404).send("User not found.");
      }

      console.log("User validated:", userData);
    }

    next();
  } catch (err) {
    console.error("JWT validation failed:", err.message);
    return res.status(401).send(`Invalid or expired token: ${err.message}`);
  }
};



app.get("/cheatsheet",authenticateUser, (req, res) => {
  res.status(200).render("cheatsheet");
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});