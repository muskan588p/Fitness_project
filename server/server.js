const express = require('express');
const path = require('path');
const app = express();
const hbs=require('hbs');
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv");
dotenv.config();

connectDb();

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


console.log(template_path);
app.get('/',(req,res)=>{
    res.render("index");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
