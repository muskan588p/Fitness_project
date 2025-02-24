const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    fullname:{
        type : String , 
        required : [ true , "please add your name"],
    },
    email:{
        type : String , 
        required : [ true , "please add your last name"],
        unique: true
    },
    phonenumber:{
        type : Number , 
        required : [ true , "please add your phone number"],
        unique:true
    },
    dob:{
        type : Date , 
        required : [ true , "please add your dob"],
    },
    gender:{
        type : String , 
        required : [ true , "please add your gender"],
    },
    address:{
        type : String,
        required : [ true , "please add your address"],
    },
    state:{
        type : String,
        required : [ true , "please add your state"],
    },
    city:{
        type : String,
        required : [ true , "please add your city"],
    },
    // file:{
    //     type: file,
    //     required: [true] ,
    // },
},
{
    timestamps : true ,
});
const application = new mongoose.model("application" , applicationSchema);
module.exports=application;