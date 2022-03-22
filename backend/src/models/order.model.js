const db = require('../../config/db.config');


var Order = function(order){
    this.order_item_ID = order.order_item_ID;
    this.order_ID = order.order_ID
    this.image = order.image;
    this.name = order.name;
    this.shop = order.shop;
    this.quantity = order.quantity;
    this.price = order.price;
    this.date_purc = order.date_purc;
    this.total = order.total;
    this.email = order.email;
}

// Get all Order Items

Order.getAllOrders = (result) =>{
    db.query('SELECT * FROM orders', (err,res) =>{
        if(err){
            console.log("Error while getting order items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Order Item
Order.createOrderItem = (orderReqData, result) => {

    db.query('INSERT INTO orders SET ?', orderReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"order item exists"},err);
        }
        else{
            result(null, {status: true, message:'order item Created'});
        }
    })
}


// Get Order Items by email
Order.getOrdersByEmail = (email, result) => {

    db.query('SELECT * FROM orders WHERE email = ?', email , (err,res) => {
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



module.exports = Order;