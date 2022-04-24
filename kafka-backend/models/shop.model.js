const db = require('../config/db.config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ShopSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    total_sales:{
        type: Number
        },
    image:{
        type: String
        }
},{
    versionKey: false
});

const Shop = mongoose.model('shop', ShopSchema);

module.exports.Shop = Shop;