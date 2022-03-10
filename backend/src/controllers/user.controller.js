const userModel = require('../models/user.model');

// Get All Users
exports.getAllUsers = (req,res) => {
    console.log("\nGET ALL USERS");

    userModel.getAllUsers((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create  user 
exports.createUser = (req,res) => {
    console.log("\nCREATE USER");

    const userData = new userModel(req.body);
    userModel.createUser(userData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside USER CONTROLLER: User Created");
            res.send(result);
        }
        else res.send("User Already exists");
        console.log(userData);
    })
}



// Get User by email
exports.getUserByEmail = (req, res) => {
    console.log("Inside Controller: Get Profile");

    userModel.getUserByEmail(req.params.email ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such User exists");
            res.send("No such user exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Update Profile
exports.updateProfile = (req, res) => {
    console.log("Inside User Controller: Update Profile");

    const userReqData = new userModel(req.body);
    userModel.updateProfile(req.params.email, userReqData , (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            res.send(result)
        }
    })
}