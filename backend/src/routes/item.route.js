var express = require('express');
var router = express.Router();

// Import item controller
const itemController = require('../controllers/item.controller');

// Get all Items
router.get("/", itemController.getAllProducts);

// Get Item by ID
router.get("/:product_ID", itemController.getProductByID);

// Get Item by Shop Name
router.get("/byshop/:shopname", itemController.getProductByShopName);

// Get Item by NAME
router.get("/searchItem/:name", itemController.getProductByName);

// Create an Item
router.post("/", itemController.createProduct);

// Update Item
router.put("/:product_ID", itemController.updateProduct);

// Update Item Quantity
router.put("/stock/:product_ID", itemController.updateProductQuantity);

// Update Item Fav
router.put("/fav/:product_ID", itemController.updateProductFav);

// Delete Item
router.delete("/:product_ID", itemController.deleteProduct);


module.exports = router;