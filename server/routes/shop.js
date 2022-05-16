const express = require("express");
const router = express.Router();

const { showAllProducts, getIndex, getCart, getCheckout, getOrders, getProductDetails, addToCart, decreaseCartItem, increaseCartItem, deleteProductFromCart } = require("../controllers/shop");
// path.join() returns a path joined together
// works on both Linux and Windows
// router.get("/", showAllProducts); 
router.get("/", getIndex); //shop
router.get("/products", showAllProducts)
router.get('/products/:id', getProductDetails)

router.get("/cart", getCart)
router.post('/cart', addToCart)
router.post('/cart/delete', deleteProductFromCart)

// router.post('/cart/increase', increaseCartItem)
router.get("/checkout", getCheckout)
router.get('/orders', getOrders)
module.exports = router;
