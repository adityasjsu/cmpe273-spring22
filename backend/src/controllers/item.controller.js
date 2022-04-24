//const productModel = require('../models/item.model');
var kafka = require('../../kafka/client');

// Get All Products
exports.getAllProducts = (req,res) => {
    console.log("\nGET ALL PRODUCTS");
    var msg = {};
    msg.path='getAllProducts';
    kafka.make_request('Item',msg,(err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create a Product
exports.createProduct = (req,res) => {
    console.log("\nCREATE PRODUCT");
    var msg = {};
    msg.path='createProduct';
    msg.body=req.body;
    kafka.make_request('Item',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside ITEM CONTROLLER: PRODUCT Created");
            res.send(result);
        }
        else res.send("PRODUCT Already exists");
    })
}



// Get PRODUCT by PRODUCT_ID
exports.getProductByID = (req, res) => {
    console.log("Inside ITEM Controller: Get PRODUCT");
    var msg = {};
    msg.path='getProductByID';
    msg.product_ID=req.params.product_ID;
    kafka.make_request('Item',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Product exists");
            res.send("No such Product exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get PRODUCT by SHOP name
exports.getProductByShopName = (req, res) => {
    console.log("Inside ITEM Controller: Get PRODUCT by SHOPNAME");
    var msg = {};
    msg.path='getProductByShopName';
    msg.shopname=req.params.shopname;
    kafka.make_request('Item',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Product exists");
            res.send("");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Get PRODUCT by NAME
exports.getProductByName = (req, res) => {
    console.log("Inside PRODUCT Controller: Get PRODUCT by NAME");
    var msg = {};
    msg.path='getProductByName';
    msg.name=req.params.name;
    kafka.make_request('Item',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.length == 0)
        {
            console.log("No Such Product exists");
            res.send("");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}




// Update PRODUCT
exports.updateProduct = (req, res) => {
    console.log("Inside Product Controller: Update Product");
    var msg = {};
    msg.path='updateProduct';
    msg.product_ID=req.params.product_ID;
    msg.body=req.body;
    kafka.make_request('Item',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            res.send(result)
        }
    })
}



// Update Product Quantity
exports.updateProductQuantity = (req, res) => {
    var msg = {};
    msg.path='updateProductQuantity';
    msg.product_ID=req.params.product_ID;
    msg.body=req.body;
    kafka.make_request('Item',msg, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// Favorite/Unfav Product
exports.updateProductFav = (req, res) => {
    var msg = {};
    msg.path='updateProductFav';
    msg.product_ID=req.params.product_ID;
    msg.body=req.body;
    kafka.make_request('Item',msg, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// delete Product by ID
exports.deleteProduct = (req, res) => {
    var msg = {};
    msg.path='deleteProduct';
    msg.product_ID=req.params.product_ID;
    kafka.make_request('Item',msg, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Products Deleted"});
    });
}




