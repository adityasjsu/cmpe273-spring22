const db = require('../../config/db.config');
const mongoose = require('mongoose');

// Encryption
const bcrypt = require('bcrypt');
const salt = 10;

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    city: {
        type: String,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    image: {
        type: String,
        default: "/default.jpeg"
    }
},{
    versionKey: false
});

const User = mongoose.model('user', UserSchema);

module.exports.getAllUsers = (result) =>{
    
    User.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting users: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create user
module.exports.createUser = async (userReqData, result) => {

    userReqData.password = await bcrypt.hash(userReqData.password, salt);
    userReqData.save((err,res)=>{
        if(err){
                     console.log(err);
                     result(null, {status:false, message:"user exists"},err);
                 }
                 else{
                     result(null, {status: true, message:'User Created'});
                 }
    })
}


// Get User by email
module.exports.getUserByEmail = (email, result) => {

 
    User.findOne({email: email}, (err,res) => {
        if(err){
            console.log("Error while fetching user data", err);
            result(null, err);
        }
        else{
            console.log("User Fetched");
            result(null , res);
        }
    })
    
}


// Update Profile
module.exports.updateProfile = async(id, userReqData, result) => {
        console.log("id--",id);
        User.findByIdAndUpdate
    User.findOneAndUpdate({_id : id}, userReqData, {new:true}, (err, res) => {
        if(err){
            console.log(err);
            result(null ,err);
        }
        else{
            console.log("Profile updated");
            console.log(res);
            result(null , {message: "User Updated" , status: true});
        }
    })
    
}


module.exports.User = User