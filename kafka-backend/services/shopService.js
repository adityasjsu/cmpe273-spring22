const shopModel = require('../models/shop.model');

// Get All Shops
getAllShops = (result) => {
    shopModel.Shop.find({}, (err, res) => {
        if (err) {
            console.log("Error while getting shops: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

// Create a Shop
createShop = async (shopReqData, result) => {
    const shopData = new shopModel.Shop(shopReqData.body);
    shopData.save((err, res) => {
        if (err) {
            console.log(err);
            result(null, { status: false, message: "Shop exists" }, err);
        }
        else {
            result(null, { status: true, message: 'Shop Created' });
        }
    })
}


// Get SHOP by SHOP Name
getShopByName = (name, result) => {

    shopModel.Shop.findOne({ name: name }, (err, res) => {
        if (err) {
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else {
            console.log("Shop Fetched");
            result(null, res);
        }
    })
}

// Get SHOP by User
getShopByUser = (email, result) => {

    shopModel.Shop.findOne({ email: email }, (err, res) => {
        if (err) {
            console.log("Error while fetching Shop data", err);
            result(null, err);
        }
        else {
            console.log("Shop Fetched");
            //console.log(result);
            result(null, res);
        }
    })

}


// Update Shop
updateShop = async (name, shopReqData, result) => {

    const shopData = {
        total_sales: shopReqData.body.total_sales,
        name: shopReqData.body.name,
        image: shopReqData.body.image
    }

    shopModel.Shop.findOneAndUpdate({ name: name }, shopData, { new: true }, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        }
        else {
            console.log("Shop updated");
            console.log(res);
            result(null, { message: "Shop Updated", status: true });
        }
    })
}


// Update Shop Total Sales
updateShopSales = (name, shopReqData, result) => {
    const shopData = {
        total_sales: shopReqData.body.total_sales
    }
    shopModel.Shop.findOneAndUpdate({ name: name }, shopData, { new: true }, (err, res) => {
        if (err) {
            console.log('Error while updating Shop total sales', err);
            result(null, err);
        }
        else {
            console.log("Shop total sales  updated successfully");
            result(null, { status: true, message: "Shop total sales udated" });
        }
    })
}


updateShopImage = async (name, shopReqData, result) => {

    const shopData = {
        image: shopReqData.body.image
    }

    shopModel.Shop.findOneAndUpdate({ name: name }, shopData, { new: true }, (err, res) => {
        if (err) {
            console.log('Error while updating Shop image', err);
            result(null, err);
        }
        else {
            console.log("Shop image  updated successfully");
            result(null, { status: true, message: "Shop image udated" });
        }
    })
}


function handle_request(msg, callback) {

    console.log("Inside shopService kafka backend");
    console.log(msg);
    switch (msg.path) {
        case 'getAllShops':
            getAllShops(callback);
            break;
        case 'createShop':
            createShop(msg, callback);
            break;
        case 'getShopByName':
            getShopByName(msg.name, callback);
            break;
        case 'getShopByUser':
            getShopByUser(msg.email, callback);
            break;
        case 'updateShop':
            updateShop(msg.name, msg, callback);
            break;
        case 'updateShopSales':
            updateShopSales(msg.name, msg, callback);
            break;
        case 'updateShopImage':
            updateShopImage(msg.name, msg, callback);
            break;


    }

    console.log("after callback");
};


exports.handle_request = handle_request;

