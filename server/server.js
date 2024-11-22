const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const hbs=require('hbs');
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const userModel=require("./models/UserSignupModel")
const dotenv = require("dotenv");
dotenv.config();

connectDb();

app.use(session({
    secret: '123abc', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// const static_path=path.join(__dirname, "../client");
const template_path=path.join(__dirname, "./templates/views");
const partials_path=path.join(__dirname, "./templates/partials");

// app.use(express.static(static_path));  //isse main index.hmtl khulgyi
//app.("public", "public");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"assets")));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
// app.get('/',(req,res)=>{
//     res.send("working");
// });

console.log(template_path);

app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/signup',(req,res)=>{
    res.render("signup");
});


//signup route
app.post("/signup", async(req,res)=>{
    try{
    
        const pass=req.body.password.trim();
        const cpass=req.body.confirmpassword.trim();

        if(pass===cpass){
            const gym_new_user=new userModel({
                fullname:req.body.fullname,
                email:req.body.email,
                phonenumber:req.body.phonenumber,
                age:req.body.age,
                gender:req.body.gender,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
       
              })
           
              const registered=await gym_new_user.save();
            //   res.redirect('/login');
            //   res.status(201).render("login");
              res.redirect('/login?success=1');
              console.log("User successfully registered");
        }
       
        else{
            res.send("password are not matching");
        }
        

    } catch(error){
        res.status(400).send(error);
    }          
})

//login route
app.post("/login",async (req,res)=>{
    
    try{
        const email=req.body.email;
        const password=req.body.password;

        
        const userdata=await userModel.findOne({email:email});
        if(userdata && userdata.password === password){
            req.session.user = { username: userdata.fullname }; // Store username in the session
            // res.status(201).render("index");
            console.log("Login Successful");
            res.status(201).redirect('/');
        }
        else{
            res.status(401).send('Invalid email or password');
            // res.send("Invalid Login details");
        }
        // console.log("Login Successful");

    }catch(error){
        res.status(400).send("invalid login details");
    }
})

//logout route
app.get('/logout', (req,res) =>{
    req.session.destroy((err)=> {
        if(err){
            console.error("Error during logout:", err);
            return res.status(500).send("Error logging out.");
        }
        res.redirect('/');
    })
})


// console.log(template_path);
app.get('/',(req,res)=>{
    const username = req.session.user?.username || null; // Retrieve username from session
    res.render("index", { username });
    // res.render("index");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
