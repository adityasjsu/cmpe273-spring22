//const db = require('../config/db.config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Cart Schema
const CartSchema = new Schema({
    cart_item_ID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "/default-item.png"
    },
    gift: {
        type: String,
        default: '0'
    },
    giftDesc: {
        type: String,
    }
}, {
    versionKey: false
});

const Cart = mongoose.model('cart', CartSchema);



module.exports.Cart = Cart;