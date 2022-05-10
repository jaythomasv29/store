// renders the add-product form page
const Product = require("../models/product");
exports.renderAddProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Item",
    path: "/admin/add",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.addProduct = (req, res) => {
  const { name, imageUrl, price, description } = req.body;
  console.log(req.body);
  const product = new Product(name, imageUrl, description, price);
  // console.log(product)
  product.save();

  res.redirect("/");
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products Dashboard",
    prods: products,
    path: "/admin/products",
    hasProducts: true,
    activeShop: true,
    productCSS: true,
  });
};
