// products array to store products
const Product = require('../models/product')

// renders the add-product form page
exports.renderAddProductPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Item",
    path: "/admin/add",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};


exports.addProduct = (req, res) => {
  const product = new Product(req.body.name)
  // console.log(product)
  product.save()

  res.redirect("/shop");
};

exports.showAllProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render("shop", {
    pageTitle: "shop",
    prods: products,
    path: "/shop",
    hasProducts: true,
    activeShop: true,
    productCSS: true,
  });
};
