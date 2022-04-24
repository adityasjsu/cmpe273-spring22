//const userModel = require('../models/user.model');
var kafka = require('../../kafka/client');

// Get All Users
exports.getAllUsers = (req,res) => {
    console.log("\nGET ALL USERS");
    var msg = {};
    msg.path='getAllUsers';
    kafka.make_request('User',msg, function(err,result){
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
    var msg = {};
    msg.path='createUser';
    msg.body = req.body;
    kafka.make_request('User',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside USER CONTROLLER: User Created");
            res.send(result);
        }
        else res.send("User Already exists");
        console.log(msg.body);
    })
}



// Get User by email
exports.getUserByEmail = (req, res) => {
    console.log("Inside Controller: Get Profile");

    var msg = {};
    msg.path='getUserByEmail';
    msg.email=req.params.email;
    kafka.make_request('User',msg, function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result && result.length == 0)
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
    var msg = {};
    msg.path='updateProfile';
    msg.body = req.body;
    //const userReqData = new userModel.User(req.body);
    kafka.make_request('User',msg, (err, result) => {
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