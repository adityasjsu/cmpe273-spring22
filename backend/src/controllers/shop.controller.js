const shopModel = require('../models/shop.model');

// Get All Shops
exports.getAllShops = (req,res) => {
    console.log("\nGET ALL SHOPS");

    shopModel.getAllShops((err, result) => {
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

    const shopData = new shopModel.Shop(req.body);
    shopModel.createShop(shopData, (err, result) => {
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
    shopModel.getShopByName(req.params.name ,(err, result) => {
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

    shopModel.getShopByUser(req.params.email ,(err, result) => {
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
    const shopReqData = {
        total_sales: req.body.total_sales,
        name : req.body.name,
        image : req.body.image}
 //   const shopReqData = new shopModel(req.body);
    shopModel.updateShop(req.params.name, shopReqData , (err, result) => {
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

    const shopReqData = {
        total_sales: req.body.total_sales
    }
   // const shopReqData= new shopModel(req.body);
    shopModel.updateShopSales(req.params.name, shopReqData, (err,result) => {
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
    const shopReqData = {
        image : req.body.image
    }
    //const shopReqData= new shopModel(req.body);
    shopModel.updateShopImage(req.params.name, shopReqData, (err,result) => {
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


