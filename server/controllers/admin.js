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
  try {
    const product = await Product.create({
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
    });
    console.log("Product added " + product.id);
  } catch (err) {
    if (err) console.log(err);
  }
  res.redirect("/admin/products");
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products Dashboard",
    prods: products,
    path: "/admin/products",
  });
};

exports.renderEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findAll({
    where: {
      id: productId,
    },
  });
  if (!productId) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    product: product[0],
    path: "/admin/edit",
    editing: true,
  });
};

exports.editProduct = async (req, res, next) => {
  const { id, name, imageUrl, price, description } = req.body; // edited product
  const updated = await Product.update(
    { name, description, price, imageUrl },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;

  Product.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/admin/products");
};
