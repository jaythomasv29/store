const express = require("express");
const PORT = 4000;
const app = express();
const bodyParser = require("express");
const path = require("path");
const { showAllProducts, getIndex, getCart, getCheckout } = require("./controllers/shop");

const sequelize = require('./utils/database')

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");


//test connection
// sequelize.authenticate()
//   .then(result => {
//     console.log('successfully connected')
//   }).catch(err => {
//     console.log(err)
//   })




const get404Error = require('./controllers/errors')

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);

app.use("/", shopRouter);

app.use(get404Error);


// creates all tables if it doesn't exist
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
  });
}).catch(err => {
  console.log(err)
})
