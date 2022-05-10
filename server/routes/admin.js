const express = require("express");
const router = express.Router();
const {renderAddProductPage, addProduct, getAdminProducts } = require('../controllers/admin')

router.get("/", (req, res, next) => {
  res.redirect("/admin/add");
});

// GET => /admin/add => Renders add product form
router.get("/add", renderAddProductPage)

// /admin/products
router.get("/products", getAdminProducts)

// POST => /admin/add
router.post("/add", addProduct);

//

router.get('/edit/:productName', (req, res, next) => {
  res.json(req.params.productName)
})

module.exports = router;

