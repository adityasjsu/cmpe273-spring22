const db = require('../config/db.config');
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
    },
    gift:{
        type: String,
        default:'0'
    },
    giftDesc:{
        type:String,
    }
},{
    versionKey: false
});

const Order = mongoose.model('order', OrderSchema);



module.exports.Order = Order;