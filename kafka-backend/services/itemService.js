const productModel = require('../models/item.model');

// Get All Products
getAllProducts = (result) =>{
    productModel.Product.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting products: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create a Product
createProduct = async (productReqData, result) => {
    const productData = new productModel.Product(productReqData.body);
    productData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Product already exists"},err);
        }
        else{
            result(null, {status: true, message:'Product Created'});
        }
    })
}



// Get PRODUCT by PRODUCT_ID
getProductByID = (product_ID, result) => {

    productModel.Product.findOne({product_ID: product_ID}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
}

// Get PRODUCT by SHOP name

getProductByShopName = (shopname, result) => {

    productModel.Product.find({shopname: shopname}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
}


// Get PRODUCT by NAME
getProductByName = (name, result) => {

    productModel.Product.find({name : {$regex : ".*" + name + "*." , "$options": "i"}}, (err,res) => {
        if(err){
            console.log("Error while fetching Product data", err);
            result(null, err);
        }
        else{
            console.log("Product Fetched");
            result(null , res);
        }
    })
}



// Update PRODUCT

updateProduct = (product_ID, productData, result) => {

    const productD = {
        name: productData.body.name,
category: productData.body.category,
description: productData.body.description,
price: productData.body.price,
quantity: productData.body.quantity,
fav: productData.body.fav,
image: productData.body.image
    }

    productModel.Product.findOneAndUpdate({product_ID: product_ID}, productD,{new: true}, (err, res) => {
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
}

// Update Product Quantity

updateProductQuantity = (product_ID, productData, result) => {
    const productD = {
        quantity: productData.body.quantity
            }
    productModel.Product.findOneAndUpdate({product_ID: product_ID}, productD, {new: true}, (err, res) => {
        if(err){
            console.log('Error while updating Product quantity', err);
            result(null, err);
        }
        else{
            console.log("Product quantity  updated successfully");
            result(null, {status: true, message:"Product quantity udated"});
        }
    })
}


// Favorite/Unfav Product
updateProductFav = (product_ID, productData, result) => {
    const productD = {
        fav: productData.body.fav
            }
    productModel.Product.findOneAndUpdate({product_ID: product_ID}, productD, {new: true}, (err, res) => {
        if(err){
            console.log('Error while Favoriting Product', err);
            result(null, err);
        }
        else{
            console.log("Product Favorite/Unfav successfully");
            result(null, {status: true, message:"Product Fav udated"});
        }
    })
}


// delete Product by ID
deleteProduct = (product_ID, result) => {

    productModel.Product.deleteOne({product_ID: product_ID}, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Product Deleted"});
        }
    })
}


function handle_request(msg, callback) {

    console.log("Inside ItemService kafka backend");
    console.log(msg);
    switch (msg.path) {
        case 'getAllProducts':
            getAllProducts(callback);
            break;
        case 'createProduct':
            createProduct(msg, callback);
            break;
        case 'getProductByID':
            getProductByID(msg.product_ID, callback);
            break;
        case 'getProductByShopName':
            getProductByShopName(msg.shopname, callback);
            break;
        case 'getProductByName':
            getProductByName(msg.name, callback);
            break;
        case 'updateProduct':
            updateProduct(msg.product_ID, msg, callback);
            break;
        case 'updateProductQuantity':
            updateProductQuantity(msg.product_ID, msg, callback);
            break;
        case 'updateProductFav':
            updateProductFav(msg.product_ID, msg, callback);
            break;
        case 'deleteProduct':
            deleteProduct(msg.product_ID, callback);
            break;		



    }

    console.log("after callback");
};


exports.handle_request = handle_request;



