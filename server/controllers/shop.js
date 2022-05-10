const Product = require("../models/product");

exports.getIndex = async (req, res, next) => {
  let products = await Product.fetchAll();
  console.log("prod cont", products);

  res.render("shop/index", {
    pageTitle: "Shop",
    prods: products,
    path: "/",
    hasProducts: true,
    activeShop: true,
    productCSS: true,
  });
};

exports.showAllProducts = async (req, res, next) => {
  const products = await Product.fetchAll();

  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render("shop/product-list", {
    pageTitle: "Product List",
    prods: products,
    path: "/products",
    hasProducts: true,
    activeShop: true,
    productCSS: true,
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
exports.getProductDetails = async (req, res, next) => {
  console.log(req.params)
  const {id } = req.params
  const productDetail = await Product.findProduct(id)
  console.log('prod details', productDetail);
  res.render("shop/product-detail", {
    path:"/products/",
    pageTitle: "Product Details",
    prod: productDetail,
  })
}
