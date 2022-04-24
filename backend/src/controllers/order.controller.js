//const orderModel = require('../models/order.model');
var kafka = require('../../kafka/client');

// Get All Order Items
exports.getAllOrders = (req,res) => {
    console.log("\nGET ALL ORDER ITEMS");
    var msg = {};
    msg.path='getAllOrders';

    kafka.make_request('Order',msg, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create an Order Item
exports.createOrderItem = (req,res) => {
    console.log("\nCREATE ORDER ITEM");
    var msg = {};
    msg.path='createOrderItem';
    msg.body=req.body;
    kafka.make_request('Order',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside Order CONTROLLER: ORDER ITEM Created");
            res.send(result);
        }
        else res.send("ITEM Already exists");
        console.log(req.body);
    })
}


// Get ORDER ITEMS by Email
exports.getOrdersByEmail = (req, res) => {
    console.log("Inside ORDER Controller: Get ORDER ITEM");
    var msg = {};
    msg.path='getOrdersByEmail';
    msg.email=req.params.email;
    kafka.make_request('Order',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Order Item exists");
            res.send("No such Order Item exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}
