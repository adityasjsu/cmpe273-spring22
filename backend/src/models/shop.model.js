const db = require('../../config/db.config');
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
// var Shop = function(shop){
//    // this.shop_ID = shop.shop_ID;
//     this.email = shop.email;
//     this.total_sales = shop.total_sales;
//     this.name = shop.name;
//     this.image = shop.image;
// }




module.exports.getAllShops = (result) =>{
    Shop.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting shops: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
    // db.query('SELECT * FROM shop', (err,res) =>{
    //     if(err){
    //         console.log("Error while getting shops: ", err);
    //         result(null, err);
    //     }
    //     else{
    //         result(null, res);
    //     }
    // })
}

// Create Shop
module.exports.createShop = async (shopReqData, result) => {

    shopReqData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Shop exists"},err);
        }
        else{
            result(null, {status: true, message:'Shop Created'});
        }
    })
    // db.query('INSERT INTO shop SET ?', shopReqData, (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null, {status:false, message:"Shop exists"},err);
    //     }
    //     else{
    //         result(null, {status: true, message:'Shop Created'});
    //     }
    // })
}


// Get Shop by name
module.exports.getShopByName = (name, result) => {

    Shop.findOne({name : name}, (err,res) => {
        if(err){
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else{
            console.log("Shop Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM shop WHERE name = ?', name , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching Shop data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Shop Fetched");
    //         result(null , res);
    //     }
    // })
}


// Get Shop by Email
module.exports.getShopByUser = (email, result) => {

    Shop.findOne({email : email}, (err,res) => {
        if(err){
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else{
            console.log("Shop Fetched");
            //console.log(result);
            result(null , res);
        }
    })
    // db.query('SELECT * FROM shop WHERE email = ?', email , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching Shop data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Shop Fetched");
    //         //console.log(result);
    //         result(null , res);
    //     }
    // })

}


// Update Shop
module.exports.updateShop = async(name, shopReqData, result) => {

    Shop.findOneAndUpdate({name: name},shopReqData,{new: true}, (err, res) => {
        if(err){
            console.log(err);
            result(null ,err);
        }
        else{
            console.log("Shop updated");
            console.log(res);
            result(null , {message: "Shop Updated" , status: true});
        }
    })
    // db.query('UPDATE shop SET name=?, total_sales=?, image=? WHERE name=?' , 
    // [shopReqData.name, shopReqData.total_sales, shopReqData.image, name], 
    // (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null ,err);
    //     }
    //     else{
    //         console.log("Shop updated");
    //         console.log(res);
    //         result(null , {message: "Shop Updated" , status: true});
    //     }
    // })
}


// Update Shop Sales
module.exports.updateShopSales = (name, shopReqData, result) => {
    Shop.findOneAndUpdate({name: name},shopReqData,{new: true}, (err, res) => {
        if(err){
            console.log('Error while updating Shop total sales', err);
            result(null, err);
        }
        else{
            console.log("Shop total sales  updated successfully");
            result(null, {status: true, message:"Shop total sales udated"});
        }
    })
    // db.query('UPDATE shop SET total_sales = ? WHERE name=?', 
    // [shopReqData.total_sales,  name], 
    // (err, res) => {
    //     if(err){
    //         console.log('Error while updating Shop total sales', err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Shop total sales  updated successfully");
    //         result(null, {status: true, message:"Shop total sales udated"});
    //     }
    // })
}


// UPDATE IMAGE
module.exports.updateShopImage = async(name, shopReqData, result) => {

    Shop.findOneAndUpdate({name: name},shopReqData,{new: true}, (err, res) => {
        if(err){
            console.log('Error while updating Shop image', err);
            result(null, err);
        }
        else{
            console.log("Shop image  updated successfully");
            result(null, {status: true, message:"Shop image udated"});
        }
    })
    // db.query('UPDATE shop SET image = ? WHERE name=?', 
    // [shopReqData.image,  name], 
    // (err, res) => {
    //     if(err){
    //         console.log('Error while updating Shop image', err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Shop image  updated successfully");
    //         result(null, {status: true, message:"Shop image udated"});
    //     }
    // })
}

module.exports.Shop = Shop;