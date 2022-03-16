const db = require('../../config/db.config');

var Product = function(product){
    this.product_ID = product.product_ID;
 //   this.shop = product.shop;
    this.name = product.name;
    this.category = product.category;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.fav = product.fav;
    this.image = product.image;
    this.shopname = product.shopname;
}


Product.getAllProducts = (result) =>{
    db.query('SELECT * FROM product', (err,res) =>{
        if(err){
            console.log("Error while getting products: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

// Create Product
Product.createProduct = async (productReqData, result) => {

    db.query('INSERT INTO product SET ?', productReqData, (err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"Product already exists"},err);
        }
        else{
            result(null, {status: true, message:'Product Created'});
        }
    })
}


// Get Product by product_ID
Product.getProductByID = (product_ID, result) => {

    db.query('SELECT * FROM product WHERE product_ID = ?', product_ID , (err,res) => {
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




// Get Product by shop name
Product.getProductByShopName = (shopname, result) => {

    db.query('SELECT * FROM product WHERE shopname = ?', shopname , (err,res) => {
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


// Get Product by NAME
Product.getProductByName = (name, result) => {

    db.query('SELECT * FROM product WHERE INSTR(name , ?) > 0', name , (err,res) => {
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


// Update Product
Product.updateProduct = (product_ID, productData, result) => {

    db.query('UPDATE product SET name=?, category=?, description=?, price=?, quantity=?, fav=?, image=? WHERE product_ID=?' , 
    [productData.name, productData.category, productData.description, productData.price, productData.quantity, productData.fav, productData.image, product_ID], 
    (err, res) => {
        if(err){
            console.log(err);
            result(null ,err);
        }
        else{
            console.log("Shopname updated");
            console.log(res);
            result(null , {message: "Shopname Updated" , status: true});
        }
    })
}


// Update Product Quantity
Product.updateProductQuantity = (product_ID, productData, result) => {
    db.query('UPDATE product SET quantity = ? WHERE product_ID=?', 
    [productData.quantity,  product_ID], 
    (err, res) => {
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

// Update Product Fav
Product.updateProductFav = (product_ID, productData, result) => {
    db.query('UPDATE product SET fav = ? WHERE product_ID=?', 
    [productData.fav,  product_ID], 
    (err, res) => {
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


// Delete Product
Product.deleteProduct = (product_ID, result) => {

    db.query("DELETE FROM product WHERE product_ID = ?", product_ID, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Product Deleted"});
        }
    })
}


module.exports = Product;