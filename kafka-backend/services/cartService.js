const cartModel = require('../models/cart.model');


// Get All Items

getAllItems = (result) =>{
    cartModel.Cart.find({}, (err,res) =>{
        if(err){
            console.log("Error while getting cart items: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}


// Create an Item

createItem = (cartReqData, result) => {
    const cartData = new cartModel.Cart(cartReqData.body);
    cartData.save((err, res) => {
        if(err){
            console.log(err);
            result(null, {status:false, message:"cart item exists"},err);
        }
        else{
            result(null, {status: true, message:'Cart item Created'});
        }
    })
}

// Get ITEM by ITEM_ID
getItemByID = (cart_item_ID, result) => {

    cartModel.Cart.find({cart_item_ID: cart_item_ID}, (err,res) => {
        if(err){
            console.log("Error while fetching cart item data", err);
            result(null, err);
        }
        else{
            console.log("Cart Item Fetched");
            result(null , res);
        }
    })
}




// Get ITEM by Email
getItemByEmail = (email, result) => {

    cartModel.Cart.find({email: email}, (err,res) => {
        if(err){
            console.log("Error while fetching cart data", err);
            result(null, err);
        }
        else{
            console.log("Cart Items Fetched");
            result(null , res);
        }
    })
}



// delete Items by email

deleteItem = (email, result) => {

    cartModel.Cart.deleteMany({email: email}, (err,res) => {
        if(err){
            console.log(err)
            result(null, err);
        }
        else{
            result(null, {status: true , message:"Items Cleared"});
        }
    })
}


function handle_request(msg, callback) {

    console.log("Inside ItemService kafka backend");
    console.log(msg);
    switch (msg.path) {
        case 'getAllItems':
            getAllItems(callback);
            break;
        case 'createItem':
            createItem(msg, callback);
            break;
        case 'getItemByID':
            getItemByID(msg.cart_item_ID, callback);
            break;
        case 'getItemByEmail':
            getItemByEmail(msg.email, callback);
            break;
        case 'deleteItem':
            deleteItem(msg.email, callback);
            break;

    }

    console.log("after callback");
};


exports.handle_request = handle_request;


