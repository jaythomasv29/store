const express = require("express");
const router = express.Router();
const path = require("path");

const rootDir = require("../utils/path");
const products = []; // data structure to store products

router.get("/", (req, res, next) => {
  res.redirect("/admin/add");
});

router.get("/add", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render('add-product', {pageTitle: 'Add Item', path:'/admin/add'})
});

router.post("/add", (req, res) => {
  products.push({ name: req.body.name });

  res.redirect("/shop");
});

exports.router = router;
exports.products = products;
