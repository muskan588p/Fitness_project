const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type : String , 
        require : [ true , "please add your name"],
    },
    email:{
        type : String , 
        require : [ true , "please add your last name"],
        unique: true
    },
    phonenumber:{
        type : Number , 
        require : [ true , "please add your phone number"],
        unique:true
    },
    age:{
        type : Number , 
        require : [ true , "please add your age"],
    },
    gender:{
        type : String , 
        require : [ true , "please add your gender"],
    },
    password:{
        type : String,
        require : [ true , "please add your passwprd"],
    },
},
{
    timestamps : true ,
});

const user = new mongoose.model("User" , userSchema);
module.exports=user;