const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = async (req, res, next) => {
  const products = await Product.findAll()
  console.log('getIndx', products)
  
  res.render("shop/index", {
    pageTitle: "Shop",
    prods: products,
    path: "/",
    
  });
};

exports.showAllProducts = async (req, res, next) => {
  const [products, fieldData] = await Product.fetchAll();
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

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCartItems();
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
    cart: cart,
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
exports.getProductDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
   const product = await Product.findAll({
     where: {
       id: id
     }
   })
   res.render("shop/product-detail", {
    path: "/checkout",
    pageTitle: "Checkout",
    product: product[0]
  });

  } catch (e){
    if(e) console.log(e)
  }
};

exports.addToCart = async (req, res, next) => {
  console.log("added");
  const { productId } = req.body;
  await Cart.addProduct(Number(productId));
  res.redirect(req.get("referer"));
};

exports.increaseCartItem = async (req, res, next) => {
  await Cart.increaseCartItem(Number(req.body.id));
  res.redirect("/cart");
};
exports.decreaseCartItem = async (req, res, next) => {
  // console.log(req.body.id)
  await Cart.decreaseCartItem(req.body.id);
  res.redirect("/cart");
};

exports.deleteProductFromCart = async (req, res, next) => {
  const { id } = req.body;
  await Cart.deleteCartItemQuantity(id);
  res.redirect("/cart");
};
