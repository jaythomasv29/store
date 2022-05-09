const express = require("express");
const router = express.Router();
const {renderAddProductPage, addProduct } = require('../controllers/products')

router.get("/", (req, res, next) => {
  res.redirect("/admin/add");
});

router.get("/add", renderAddProductPage)

router.post("/add", addProduct);

module.exports = router;

