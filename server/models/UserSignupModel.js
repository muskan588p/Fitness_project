const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

userSchema.methods.generateToken = async function(){
    const token =  jwt.sign({
        id: this._id, 
        // email: this.email
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    });
    return token;
    };
    
const user = new mongoose.model("User" , userSchema);
module.exports=user;