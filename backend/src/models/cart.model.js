const db = require('../../config/db.config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Cart Schema
const CartSchema = new Schema({
    cart_item_ID:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    stock:{
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
    image:{
        type: String,
        default:"/default-item.png"
    }
},{
    versionKey: false
});

const Cart = mongoose.model('cart', CartSchema);

// var Cart = function(cart){
//     this.cart_item_ID = cart.cart_item_ID;
//     this.image = cart.image;
//     this.name = cart.name;
//     this.shop = cart.shop;
//     this.quantity = cart.quantity;
//     this.stock = cart.stock;
//     this.price = cart.price;
//     this.email = cart.email;
// }

// Get all Cart Items

module.exports.getAllItems = (result) =>{
    Cart.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting cart items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
    // db.query('SELECT * FROM cart', (err,res) =>{
    //     if(err){
    //         console.log("Error while getting cart items: ", err);
    //         result(null, err);
    //     }
    //     else{
    //         result(null, res);
    //     }
    // })
}

// Create Cart Item
module.exports.createItem = (cartReqData, result) => {

    cartReqData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"cart item exists"},err);
        }
        else{
            result(null, {status: true, message:'Cart item Created'});
        }
    })
    // db.query('INSERT INTO cart SET ?', cartReqData, (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null, {status:false, message:"cart item exists"},err);
    //     }
    //     else{
    //         result(null, {status: true, message:'Cart item Created'});
    //     }
    // })
}

// Get Cart Item by cart_item_ID
module.exports.getItemByID = (cart_item_ID, result) => {

    Cart.find({cart_item_ID: cart_item_ID}, (err,res) => {
        if(err){
            console.log("Error while fetching cart item data", err);
            result(null, err);
        }
        else{
            console.log("Cart Item Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM cart WHERE cart_item_ID = ?', cart_item_ID , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching cart item data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Cart Item Fetched");
    //         result(null , res);
    //     }
    // })
}


// Get Cart Item by email
module.exports.getItemByEmail = (email, result) => {

    Cart.find({email: email}, (err,res) => {
        if(err){
            console.log("Error while fetching cart data", err);
            result(null, err);
        }
        else{
            console.log("Cart Items Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM cart WHERE email = ?', email , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching cart data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Cart Items Fetched");
    //         result(null , res);
    //     }
    // })
}


// Delete Item
module.exports.deleteItem = (email, result) => {

    Cart.deleteMany({email: email}, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Items Cleared"});
        }
    })
    // db.query("DELETE FROM cart WHERE email = ?", email, (err,res) => {
    //     if(err){
    //         console.log(err)
    //         result(null, err);
    //     }
    //     else{
    //         result(null, {status: true , message:"Items Cleared"});
    //     }
    // })
}



module.exports.Cart = Cart;