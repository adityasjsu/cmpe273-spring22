const db = require('../config/db.config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    product_ID:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
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
    fav:{
        type: String,
        default:"0"
    },
    shopname:{
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

const Product = mongoose.model('product', ProductSchema);


module.exports.Product = Product;