const db = require('../../config/db.config');

var Shop = function(shop){
   // this.shop_ID = shop.shop_ID;
    this.email = shop.email;
    this.total_sales = shop.total_sales;
    this.name = shop.name;
    this.image = shop.image;
}


Shop.getAllShops = (result) =>{
    db.query('SELECT * FROM shop', (err,res) =>{
        if(err){
            console.log("Error while getting shops: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Shop
Shop.createShop = async (shopReqData, result) => {

    db.query('INSERT INTO shop SET ?', shopReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Shop exists"},err);
        }
        else{
            result(null, {status: true, message:'Shop Created'});
        }
    })
}


// Get Shop by name
Shop.getShopByName = (name, result) => {

    db.query('SELECT * FROM shop WHERE name = ?', name , (err,res) => {
        if(err){
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else{
            console.log("Shop Fetched");
            result(null , res);
        }
    })
}


// Get Shop by Email
Shop.getShopByUser = (email, result) => {

    db.query('SELECT * FROM shop WHERE email = ?', email , (err,res) => {
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

}


// Update Shop
Shop.updateShop = async(name, shopReqData, result) => {

    db.query('UPDATE shop SET name=?, total_sales=?, image=? WHERE name=?' , 
    [shopReqData.name, shopReqData.total_sales, shopReqData.image, name], 
    (err, res) => {
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
}


// Update Shop Sales
Shop.updateShopSales = (name, shopReqData, result) => {
    db.query('UPDATE shop SET total_sales = ? WHERE name=?', 
    [shopReqData.total_sales,  name], 
    (err, res) => {
        if(err){
            console.log('Error while updating Shop total sales', err);
            result(null, err);
        }
        else{
            console.log("Shop total sales  updated successfully");
            result(null, {status: true, message:"Shop total sales udated"});
        }
    })
}


// UPDATE IMAGE
Shop.updateShopImage = async(name, shopReqData, result) => {

    db.query('UPDATE shop SET image = ? WHERE name=?', 
    [shopReqData.image,  name], 
    (err, res) => {
        if(err){
            console.log('Error while updating Shop image', err);
            result(null, err);
        }
        else{
            console.log("Shop image  updated successfully");
            result(null, {status: true, message:"Shop image udated"});
        }
    })
}

module.exports = Shop;