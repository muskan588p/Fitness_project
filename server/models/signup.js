const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String , 
        require : [ true , "please add your name"],
    },
    email:{
        type : String , 
        require : [ true , "please add your last name"],
        unique:true
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
    confirmpassword:{
        type : String,
        require : [ true , "please add your passwprd"],
    }
},
{
    timestamps : true ,
});
module.exports = new mongoose.model("User" , userSchema);