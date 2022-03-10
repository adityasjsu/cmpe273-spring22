const mysql = require('mysql')
const db = require('../../config/db.config');


// const pool = mysql.createPool({
//     connectionLimit : 500,
//     user:'admin',
//     host:'db-273-lab1.cnhf2ck6mcsk.us-west-1.rds.amazonaws.com',
//     password:'273lab1db',
//     database:'lab1'
// })

// Encryption
const bcrypt = require('bcrypt');
const salt = 10;

var User = function(user){
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.about = user.about;
    this.city = user.city;
    this.dob = user.dob;
    this.address = user.address;
    this.country = user.country;
    this.phone_no = user.phone_no;
    this.image = user.image;
}


User.getAllUsers = (result) =>{
    
    // pool.query('SELECT * FROM user WHERE username = "admin" ', (err,res) =>{
    //     if(err){
    //         console.log("Error while getting users: ", err);
    //         result(null, err);
    //     }
    //     else{
    //         result(null, res);
    //     }
    // })
    
    db.query('SELECT * FROM user', (err,res) =>{
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
User.createUser = async (userReqData, result) => {

    userReqData.password = await bcrypt.hash(userReqData.password, salt);
    db.query('INSERT INTO user SET ?', userReqData, (err, res) => {
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
User.getUserByEmail = (email, result) => {

    db.query('SELECT * FROM user WHERE email = ?', email , (err,res) => {
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
User.updateProfile = async(email, userReqData, result) => {

    db.query('UPDATE user SET email=?, name=?, about=?, city=?, dob=?, address=?, country=?, phone_no=?, image=? WHERE email=?' , 
    [userReqData.email, userReqData.name, userReqData.about, userReqData.city, userReqData.dob, userReqData.address, userReqData.country, userReqData.phone_no, userReqData.image, email], 
    (err, res) => {
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




module.exports = User;