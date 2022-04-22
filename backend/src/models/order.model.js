const db = require('../../config/db.config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Order Schema
const OrderSchema = new Schema({
    order_item_ID:{
        type: Number,
        required: true,
        unique: true
    },
    order_ID:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    shop:{
        type: String,
        required: true
    },
    date_purc:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default:"/default-item.png"
    }
},{
    versionKey: false
});

const Order = mongoose.model('order', OrderSchema);

// var Order = function(order){
//     this.order_item_ID = order.order_item_ID;
//     this.order_ID = order.order_ID
//     this.image = order.image;
//     this.name = order.name;
//     this.shop = order.shop;
//     this.quantity = order.quantity;
//     this.price = order.price;
//     this.date_purc = order.date_purc;
//     this.total = order.total;
//     this.email = order.email;
// }

// Get all Order Items

module.exports.getAllOrders = (result) =>{
    Order.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting order items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
    // db.query('SELECT * FROM orders', (err,res) =>{
    //     if(err){
    //         console.log("Error while getting order items: ", err);
    //         result(null, err);
    //     }
    //     else{
    //         result(null, res);
    //     }
    // })
}

// Create Order Item
module.exports.createOrderItem = (orderReqData, result) => {

    orderReqData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"order item exists"},err);
        }
        else{
            result(null, {status: true, message:'order item Created'});
        }
    })
    // db.query('INSERT INTO orders SET ?', orderReqData, (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null, {status:false, message:"order item exists"},err);
    //     }
    //     else{
    //         result(null, {status: true, message:'order item Created'});
    //     }
    // })
}


// Get Order Items by email
module.exports.getOrdersByEmail = (email, result) => {

    Order.find({email: email}, (err,res) => {
        if(err){
            console.log("Error while fetching order data", err);
            result(null, err);
        }
        else{
            console.log("Order Items Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM orders WHERE email = ?', email , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching order data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Order Items Fetched");
    //         result(null , res);
    //     }
    // })
}



module.exports.Order = Order;