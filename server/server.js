const express=require("express");
const bcrypt=require("bcrypt");
const path=require("path");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const connectDb=require("../server/config/dbConnection");

dotenv.config();

connectDb();




const app=express();
const port= 6000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})