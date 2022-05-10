const express = require("express");
const router = express.Router();

const { showAllProducts, getIndex, getCart, getCheckout, getOrders, getProductDetails } = require("../controllers/shop");
// path.join() returns a path joined together
// works on both Linux and Windows
// router.get("/", showAllProducts); 
router.get("/", getIndex); //shop
router.get("/products", showAllProducts)
router.get("/cart", getCart)
router.get("/checkout", getCheckout)
router.get('/orders', getOrders)
router.get('/products/:id', getProductDetails)
module.exports = router;
