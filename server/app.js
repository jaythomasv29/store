const express = require("express");
const PORT = 4000;
const app = express();
const bodyParser = require("express");
const path = require("path");
const { showAllProducts, getIndex, getCart, getCheckout } = require("./controllers/shop");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const get404Error = require('./controllers/errors')

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);

app.use("/", shopRouter);

app.use(get404Error);

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
