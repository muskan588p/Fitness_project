const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type : String , 
        require : [ true , ""],
        unique: true
    },
    password:{
        type : String,
        require : [ true , "please add your password"],
    },
    
},
{
    timestamps : true ,
});
module.exports = new mongoose.model("User" , userSchema);