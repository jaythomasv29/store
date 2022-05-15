const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("shop/index", {
    pageTitle: "Shop",
    prods: products,
    path: "/",
  });
};

exports.showAllProducts = async (req, res, next) => {
  const products = await Product.findAll();
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
  try {
    const cart = await req.user.getCart();  // get cart associated to user
    const products = await cart.getProducts();  
    console.log('Products--->', products)
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Cart",
      cart: products
    });

  } catch (e) {
    if(e) console.log('Error Retrieving Cart', e)
  }
  
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
        id: id,
      },
    });
    res.render("shop/product-detail", {
      path: "/checkout",
      pageTitle: "Checkout",
      product: product[0],
    });
  } catch (e) {
    if (e) console.log(e);
  }
};

exports.addToCart = async (req, res, next) => {
  console.log("added");
  const { productId } = req.body;
  const cart = await req.user.getCart();  // get cart associated to user
  const productMatch = await cart.getProducts({ where: {id: productId}})
  const product = await Product.findByPk(productId)
  try {
    // check if product is NOT in cart yet
    if (productMatch.length === 0) {
        console.log(product)
        await cart.addProduct(product, { through: { quantity: 1 } })
        console.log('product added');
    } else {
      let quantity = productMatch[0].cartItem.quantity
      await cart.addProduct(product, { through: { quantity: quantity+1 } })
    }
 
  } catch (e) {
    console.log(e)
  }
  
  res.redirect('back');

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
