const cartModel = require('../models/cart.model');
var kafka = require('../../kafka/client');

// Get All Items
exports.getAllItems = (req,res) => {
    console.log("\nGET ALL CART ITEMS");
    var msg = {};
    msg.path='getAllItems';
    kafka.make_request('Cart',msg,(err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create an Item
exports.createItem = (req,res) => {
    console.log("\nCREATE CART ITEM");
    var msg = {};
    msg.path='createItem';
    msg.body=req.body;
    kafka.make_request('Cart',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside CART CONTROLLER: CART ITEM Created");
            res.send(result);
        }
        else res.send("ITEM Already exists");
        console.log(req.body);
    })
}



// Get ITEM by ITEM_ID
exports.getItemByID = (req, res) => {
    console.log("Inside CART Controller: Get CART ITEM");
    var msg = {};
    msg.path='getItemByID';
    msg.cart_item_ID=req.params.cart_item_ID;
    kafka.make_request('Cart',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("No such Item exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get ITEM by Email
exports.getItemByEmail = (req, res) => {
    console.log("Inside CART Controller: Get CART ITEM");
    var msg = {};
    msg.path='getItemByEmail';
    msg.email=req.params.email;
    kafka.make_request('Cart',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Item exists");
            res.send("No such Item exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// delete Items by email
exports.deleteItem = (req, res) => {

    var msg = {};
    msg.path='deleteItem';
    msg.email=req.params.email;
    kafka.make_request('Cart',msg, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Cart items cleared"});
    });
}


