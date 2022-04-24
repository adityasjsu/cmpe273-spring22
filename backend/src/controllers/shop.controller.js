const shopModel = require('../models/shop.model');
var kafka = require('../../kafka/client');

// Get All Shops
exports.getAllShops = (req,res) => {
    console.log("\nGET ALL SHOPS");
    var msg = {};
    msg.path='getAllShops';

    kafka.make_request('Shop',msg, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    })
}


// Create a Shop
exports.createShop = (req,res) => {
    console.log("\nInside SHOP Controller: CREATE SHOP");
    var msg = {};
    msg.path='createShop';
    msg.body=req.body;
    kafka.make_request('Shop',msg, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result.status == true){
            console.log("Inside SHOP CONTROLLER: SHOP Created");
            res.send(result);
        }
        else res.send("SHOP Already exists");
        console.log(shopData);
    })
}



// Get SHOP by SHOP Name
exports.getShopByName = (req, res) => {
    console.log("\nInside SHOP Controller: Get SHOP By name");
    console.log("name of shop:",req.params.name);
    var msg = {};
    msg.path='getShopByName';
    msg.name=req.params.name;
    kafka.make_request('Shop',msg,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result && result.length == 0)
        {
            console.log("No Such Shop exists");
            res.send("No such Shop exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}



// Get SHOP by User
exports.getShopByUser = (req, res) => {
    console.log("Inside SHOP Controller:  by USER");

    var msg = {};
    msg.path='getShopByUser';
    msg.email=req.params.email;
    kafka.make_request('Shop',msg,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result && result.length == 0)
        {
            console.log("No Such Shop exists");
            res.send("No such Shop exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}


// Update Shop
exports.updateShop = (req, res) => {
    console.log("Inside Shop Controller: Update Shop");
    var msg = {};
    msg.path='updateShop';
    msg.body=req.body;
    msg.name=req.params.name;
    kafka.make_request('Shop',msg, (err, result) => {
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


// Update Shop Total Sales
exports.updateShopSales = (req, res) => {

    var msg = {};
    msg.path='updateShopSales';
    msg.body=req.body;
    msg.name=req.params.name;
    kafka.make_request('Shop',msg, (err,result) => {
        if(err)
        console.log(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}

// Update Shop Image
exports.updateShopImage = (req, res) => {

    console.log("Inside Shop Controller: Update Shop Image");
    
    var msg = {};
    msg.path='updateShopImage';
    msg.body=req.body;
    msg.name=req.params.name;
    kafka.make_request('Shop',msg, (err,result) => {
        if(err){
            res.send(err);
        }
        if(result){
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err);
        }

        
    })
    console.log("Request Data", req.body);
}


