const userModel = require('../models/user.model');
// Encryption
const bcrypt = require('bcrypt');
const salt = 10;

// Get All Users
getAllUsers = (result) => {

    userModel.User.find({}, (err, res) => {
        if (err) {
            console.log("Error while getting users: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

// Create  user 
createUser = async (userReqData, result) => {
    const userD = new userModel.User(userReqData.body);

    userD.password = await bcrypt.hash(userD.password, salt);
    userD.save((err, res) => {
        if (err) {
            console.log(err);
            result(null, { status: false, message: "user exists" }, err);
        }
        else {
            result(null, { status: true, message: 'User Created' });
        }
    })
}




// Get User by email
getUserByEmail = (email, result) => {


    userModel.User.findOne({ email: email }, (err, res) => {
        if (err) {
            console.log("Error while fetching user data", err);
            result(null, err);
        }
        else {
            console.log("User Fetched");
            result(null, res);
        }
    })

}

// Update Profile
updateProfile = async (userReqData, result) => {

    const userData = {
        name: userReqData.body.name,
        image: userReqData.body.image,
        email: userReqData.body.email,
        about: userReqData.body.about,
        city: userReqData.body.city,
        dob: userReqData.body.dob,
        address: userReqData.body.address,
        country: userReqData.body.country,
        phone_no: userReqData.body.phone_no
    }
    console.log("userreqdata",userReqData);
    userModel.User.findOneAndUpdate({ _id: userReqData.body.id }, userData, { new: true }, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        }
        else {
            console.log("Profile updated");
            console.log(res,userReqData.email);
            result(null, { message: "User Updated", status: true });
        }
    })

}


function handle_request(msg, callback) {

    console.log("Inside userService kafka backend");
    console.log(msg);
    switch (msg.path) {
        case 'getUserByEmail':
            getUserByEmail(msg.email, callback);
            break;
        case 'getAllUsers':
            getAllUsers(callback);
            break;
        case 'createUser':
            createUser(msg, callback);
            break;
        case 'updateProfile':
            updateProfile(msg, callback);
            break;


    }

    console.log("after callback");
};


exports.handle_request = handle_request;