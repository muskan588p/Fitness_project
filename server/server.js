const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { signup, login, logout } = require("./controllers/userControllers");
const authenticate = require("./middleware/jwtAuthMiddleware");
const path = require("path");
const app = express();
const hbs = require("hbs");
// const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const userModel = require("./models/UserSignupModel");
const trainerModel=require("./models/TrainerSignupModel");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const multer=require("multer");
const bookingSchema=require("./models/bookingModel");
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
// app.get('/',(req,res)=>{
//     res.send("working");
// });

console.log(template_path);

app.get("/login", (req, res) => {
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

app.get("/", (req, res) => {
  const username = req.session.user?.username || null; // Retrieve username from session
  res.render("index", { username });
});

// console.log(template_path);

app.get("/apply", (req, res) => {
  res.render("apply");
});

app.get("/book", (req, res) => {
  res.render("book");
});

app.get("/cheatsheet", (req, res) => {
  res.render("cheatsheet");
});

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
    console.log("Trainer data updated");

  } catch (error) {
    res.status(400).send("invalid login details");
  }
});

app.post("/book-session", async (req, res) => {
  const bookinguser=new bookingSchema({
    preferredDay:req.body.preferredDay,
    exerciseType:req.body.exerciseType,
    timeSlot:req.body.timeSlot,
    trainer:req.body.trainer,
    sessionType:req.body.sessionType,

  });

  try {
    const bookuser=await bookinguser.save();
    res.send('<h1>Booking successful!</h1><a href="/">Go back</a>');
  } catch (error) {
    res.status(500).send('<h1>Error saving booking!</h1><a href="/">Try again</a>');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
