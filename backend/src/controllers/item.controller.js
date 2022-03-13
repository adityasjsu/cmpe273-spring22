const productModel = require('../models/item.model');

// Get All Products
exports.getAllProducts = (req,res) => {
    console.log("\nGET ALL PRODUCTS");

    productModel.getAllProducts((err, result) => {
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

    const productData = new productModel(req.body);
    productModel.createProduct(productData, (err, result) => {
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

    productModel.getProductByID(req.params.product_ID ,(err, result) => {
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

    productModel.getProductByShopName(req.params.shopname ,(err, result) => {
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

    productModel.getProductByName(req.params.name ,(err, result) => {
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

    const productData = new productModel(req.body);
    productModel.updateProduct(req.params.product_ID, productData , (err, result) => {
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

    const productData= new productModel(req.body);
    productModel.updateProductQuantity(req.params.product_ID, productData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// Favorite/Unfav Product
exports.updateProductFav = (req, res) => {

    const productData= new productModel(req.body);
    productModel.updateProductFav(req.params.product_ID, productData, (err,result) => {
        if(err)
        res.send(err);

        console.log( result)
        res.send(result)
    })
    console.log("Request Data", req.body);
}


// delete Product by ID
exports.deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.product_ID, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Products Deleted"});
    });
}




