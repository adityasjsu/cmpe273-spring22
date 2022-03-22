const orderModel = require('../models/order.model');


// Get All Order Items
exports.getAllOrders = (req,res) => {
    console.log("\nGET ALL ORDER ITEMS");

    orderModel.getAllOrders((err, result) => {
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

    const orderData = new orderModel(req.body);
    orderModel.createOrderItem(orderData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside Order CONTROLLER: ORDER ITEM Created");
            res.send(result);
        }
        else res.send("ITEM Already exists");
        console.log(orderData);
    })
}


// Get ORDER ITEMS by Email
exports.getOrdersByEmail = (req, res) => {
    console.log("Inside ORDER Controller: Get ORDER ITEM");

    orderModel.getOrdersByEmail(req.params.email  ,(err, result) => {
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
