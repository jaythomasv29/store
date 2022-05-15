const express = require("express");
const PORT = 4000;
const app = express();
const bodyParser = require("express");
const path = require("path");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const get404Error = require("./controllers/errors");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));

app.use( async (req, res, next) => {
  const user = await User.findOne({where: { id: 1 }})
  req.user = user // store user in req
  console.log(`set req.user ${req.user.id}`)
  next()
})

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/", shopRouter);
app.use(get404Error);

//associations
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);  // allows a userId to be related to each product
User.hasOne(Cart)  // adds user field to cart

Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: CartItem })  // creates cart item to relate products within a cart by creating a productId and cart
Product.belongsToMany(Cart, {through: CartItem})

// creates all tables if it doesn't exist
// sequelize
//   .sync()
//   .then(() => {
//     return User.findOne({
//       where: {
//         id: 1,
//       },
//     });
//   })
//   .then((user) => {
//     if (!user) {
//       console.log("created");
//       return User.create({ name: "James", email: "james@email.com" });
//     }
//     return user;
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("App is listening on port " + PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.listen(PORT, () => {
        console.log("App is listening on port " + PORT);
      });