var express = require('express');
var router = express.Router();

// Import shop controller
const shopController = require('../controllers/shop.controller');

// Get all Shops
router.get("/", shopController.getAllShops);

// Get Shop by name
router.get("/:name", shopController.getShopByName);

// Get Shop by Email
router.get("/usershop/:email", shopController.getShopByUser);

// Create a Shop
router.post("/", shopController.createShop);

// Update Shop
router.put("/:name", shopController.updateShop);

// Update Shop Sales
router.put("/sales/:name", shopController.updateShopSales);

// Update Shop Image
router.put("/shopimage/:name", shopController.updateShopImage);

module.exports = router;