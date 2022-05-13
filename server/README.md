# Express and NodeJS
----


#### Managing Data Using MYSQL and Sequelize ORM Object Relational Mapper
* Create Models: Product, User, Carts, Orders
* Understanding relationships, E.g - One to many, One to one
* "A User can have many orders", "A product can be in many Carts", "A user has one cart"
* Model methods Model.create(), Model.findAll(), Model.update()
`   const product = await Product.create({
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
    });`

----
## Understanding Templating Engines (EJS)
* Using EJS tags to display dynamic data
* `<% %>`
* `<%- %>`
* `<%= %>`
* ...much more!
----
### MVC (Model, View, Controller)
##### Models:
* Represent your data in your code
* Work with your data (save, fetch)
* Responsible for saving, fetching & modeling data
##### Views
* What the user sees
* Decoupled from application logic and is only the interface
##### Controller 
* Where the magic happens and where we delegate actions towards the model and spit it back to the views
* Connects the models and your views e.g routes
* Allows for communication between Model and View
#### Routes
* Within this application contains `/admin` routes and basic `/` root shop routes.
* These routes comprise of requests such as: GET, POST, DELETE, PUT to perform various CRUD operations.

* GET => /admin/add => Renders add product form
`router.get("/add", renderAddProductPage)`

* GET => admin/products
`router.get("/products", getAdminProducts)`

* POST => /admin/add
`router.post("/add", addProduct);`
* POST => /admin/edit
`router.post("/edit", editProduct)`

* POST => /admin/delete
`router.post("/delete", deleteProduct)`
* GET => /admin/edit/1 (dynamic query parameter)
`router.get('/edit/:productId', renderEditProduct)`
```
----
#### (In progress)
* Create a live Mongo Version of E-Commerce
* Add an edit product route /admin/edit to populate a form
* 