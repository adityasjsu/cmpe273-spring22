const db = require('../../config/db.config');
const mongoose = require('mongoose');
//import {escapeStringRegexp} from 'escape-string-regexp';
// const escapeStringRegexp = require('escape-string-regexp');

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

// var Product = function(product){
//     this.product_ID = product.product_ID;
//  //   this.shop = product.shop;
//     this.name = product.name;
//     this.category = product.category;
//     this.description = product.description;
//     this.price = product.price;
//     this.quantity = product.quantity;
//     this.fav = product.fav;
//     this.image = product.image;
//     this.shopname = product.shopname;
// }


module.exports.getAllProducts = (result) =>{
    Product.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting products: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
    // db.query('SELECT * FROM product', (err,res) =>{
    //     if(err){
    //         console.log("Error while getting products: ", err);
    //         result(null, err);
    //     }
    //     else{
    //         result(null, res);
    //     }
    // })
}

// Create Product
module.exports.createProduct = async (productReqData, result) => {

    productReqData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Product already exists"},err);
        }
        else{
            result(null, {status: true, message:'Product Created'});
        }
    })
    // db.query('INSERT INTO product SET ?', productReqData, (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null, {status:false, message:"Product already exists"},err);
    //     }
    //     else{
    //         result(null, {status: true, message:'Product Created'});
    //     }
    // })
}


// Get Product by product_ID
module.exports.getProductByID = (product_ID, result) => {

    Product.findOne({product_ID: product_ID}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM product WHERE product_ID = ?', product_ID , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching Product data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Product Fetched");
    //         result(null , res);
    //     }
    // })
}




// Get Product by shop name
module.exports.getProductByShopName = (shopname, result) => {

    Product.find({shopname: shopname}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM product WHERE shopname = ?', shopname , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching Product data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Product Fetched");
    //         result(null , res);
    //     }
    // })
}


// Get Product by NAME
module.exports.getProductByName = (name, result) => {

    Product.find({name : {$regex : ".*" + name + "*." , "$options": "i"}}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
    // db.query('SELECT * FROM product WHERE INSTR(name , ?) > 0', name , (err,res) => {
    //     if(err){
    //         console.log("Error while fetching Product data", err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Product Fetched");
    //         result(null , res);
    //     }
    // })
}


// Update Product
module.exports.updateProduct = (product_ID, productData, result) => {

    Product.findOneAndUpdate({product_ID: product_ID}, productData,{new: true}, (err, res) => {
        if(err){
            console.log(err);
            result(null ,err);
        }
        else{
            console.log("product updated");
            console.log(res);
            result(null , {message: "product Updated" , status: true});
        }
    })
    // db.query('UPDATE product SET name=?, category=?, description=?, price=?, quantity=?, fav=?, image=? WHERE product_ID=?' , 
    // [productData.name, productData.category, productData.description, productData.price, productData.quantity, productData.fav, productData.image, product_ID], 
    // (err, res) => {
    //     if(err){
    //         console.log(err);
    //         result(null ,err);
    //     }
    //     else{
    //         console.log("Shopname updated");
    //         console.log(res);
    //         result(null , {message: "Shopname Updated" , status: true});
    //     }
    // })
}


// Update Product Quantity
module.exports.updateProductQuantity = (product_ID, productData, result) => {
    Product.findOneAndUpdate({product_ID: product_ID}, productData, {new: true}, (err, res) => {
        if(err){
            console.log('Error while updating Product quantity', err);
            result(null, err);
        }
        else{
            console.log("Product quantity  updated successfully");
            result(null, {status: true, message:"Product quantity udated"});
        }
    })
    // db.query('UPDATE product SET quantity = ? WHERE product_ID=?', 
    // [productData.quantity,  product_ID], 
    // (err, res) => {
    //     if(err){
    //         console.log('Error while updating Product quantity', err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Product quantity  updated successfully");
    //         result(null, {status: true, message:"Product quantity udated"});
    //     }
    // })
}

// Update Product Fav
module.exports.updateProductFav = (product_ID, productData, result) => {
    Product.findOneAndUpdate({product_ID: product_ID}, productData, {new: true}, (err, res) => {
        if(err){
            console.log('Error while Favoriting Product', err);
            result(null, err);
        }
        else{
            console.log("Product Favorite/Unfav successfully");
            result(null, {status: true, message:"Product Fav udated"});
        }
    })
    // db.query('UPDATE product SET fav = ? WHERE product_ID=?', 
    // [productData.fav,  product_ID], 
    // (err, res) => {
    //     if(err){
    //         console.log('Error while Favoriting Product', err);
    //         result(null, err);
    //     }
    //     else{
    //         console.log("Product Favorite/Unfav successfully");
    //         result(null, {status: true, message:"Product Fav udated"});
    //     }
    // })
}


// Delete Product
module.exports.deleteProduct = (product_ID, result) => {

    Product.deleteOne({product_ID: product_ID}, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Product Deleted"});
        }
    })
    // db.query("DELETE FROM product WHERE product_ID = ?", product_ID, (err,res) => {
    //     if(err){
    //         console.log(err)
    //         result(null, err);
    //     }
    //     else{
    //         result(null, {status: true , message:"Product Deleted"});
    //     }
    // })
}


module.exports.Product = Product;