const express = require("express");
const router = express.Router();

const { showAllProducts } = require("../controllers/products");
// path.join() returns a path joined together
// works on both Linux and Windows
router.get("/", showAllProducts);

module.exports = router;
