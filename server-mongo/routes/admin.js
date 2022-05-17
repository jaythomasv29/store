const express = require("express");
const router = express.Router();
const {renderAddProductPage, addProduct, getAdminProducts, renderEditProduct, editProduct, deleteProduct } = require('../controllers/admin')

router.get("/", (req, res, next) => {
  res.redirect("/admin/add");
});

// GET => /admin/add => Renders add product form
router.get("/add", renderAddProductPage)

// /admin/products
router.get("/products", getAdminProducts)

// POST => /admin/add
router.post("/add", addProduct);

// POST => /admin/edit
router.post("/edit", editProduct)

// POST => /admin/delete
router.post("/delete", deleteProduct)

router.get('/edit/:productId', renderEditProduct)

module.exports = router;

