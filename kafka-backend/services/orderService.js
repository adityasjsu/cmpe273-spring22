const orderModel = require('../models/order.model');


// Get All Order Items
getAllOrders = (result) =>{
    orderModel.Order.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting order items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}


// Create an Order Item
createOrderItem = (orderReqData, result) => {
    const orderData = new orderModel.Order(orderReqData.body);
    orderData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"order item exists"},err);
        }
        else{
            result(null, {status: true, message:'order item Created'});
        }
    })
}


// Get ORDER ITEMS by Email
getOrdersByEmail = (email, result) => {

    orderModel.Order.find({email: email}, (err,res) => {
        if(err){
            console.log("Error while fetching order data", err);
            result(null, err);
        }
        else{
            console.log("Order Items Fetched");
            result(null , res);
        }
    })
}

function handle_request(msg, callback) {

    console.log("Inside OrderService kafka backend");
    console.log(msg);
    switch (msg.path) {
        case 'getAllOrders':
            getAllOrders(callback);
            break;
        case 'createOrderItem':
            createOrderItem(msg, callback);
            break;
        case 'getOrdersByEmail':
            getOrdersByEmail(msg.email, callback);
            break;
        }

        console.log("after callback");
    };
    
    
    exports.handle_request = handle_request;
    