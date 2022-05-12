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

exports.addProduct = async (req, res) => {
  const { name, imageUrl, price, description } = req.body;
  console.log(req.body);
  const product = new Product(name, imageUrl, description, price);
  // console.log(product)
  await product.save();
  const products = await Product.fetchAll();
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products Dashboard",
    prods: products,
    path: "/admin/products",
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products Dashboard",
    prods: products,
    path: "/admin/products",
  });
};

exports.renderEditProduct = async (req, res, next) => {
  const product = await Product.findProduct(req.params.productId);
  const editMode = req.query.edit;
  console.log(product, editMode);
  if (!product) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    product: product,
    path: "/admin/edit",
    editing: true,
  });
};

exports.editProduct = async (req, res, next) => {
  const product = req.body; // edited product
  Product.edit(product);
  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;
  console.log(typeof id);
  Product.delete(Number(id));
  res.redirect("/admin/products");
};
