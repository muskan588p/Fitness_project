const express = require('express');
const path = require('path');
const app = express();
const hbs=require('hbs');
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const userModel=require("./models/UserSignupModel")
const dotenv = require("dotenv");
dotenv.config();

connectDb();

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
              res.status(201).render("index");
              console.log("Data Sent on our Database");
        }
       
        else{
            res.send("password are not matching");
        }
        

    } catch(error){
        res.status(400).send(error);
    }          
})

app.post("/login",async (req,res)=>{
    
    try{
        const email=req.body.email;
        const password=req.body.password;

        
        const userdata=await userModel.findOne({email:email});
        if(userdata.password==password){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid Login details");
        }
        console.log("Login Successful");

    }catch(error){
        res.status(400).send("invalid login details");
    }
})


console.log(template_path);
app.get('/',(req,res)=>{
    res.render("index");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
