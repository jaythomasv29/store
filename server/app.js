const express = require("express");
const PORT = 4000;
const app = express();
const bodyParser = require("express");
const path = require("path");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.router);
app.use("/shop", shopRouter);

// const server = http.createServer(app)
// server.listen(PORT)
// same as below

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found'});
});

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
