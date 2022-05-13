// const db = require("../utils/database");

// module.exports = class Product {
//   constructor(name, imageUrl, description, price) {
//     this.name = name;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   async save() {
//     try {
//       // products.push(this)
//       db.execute(
//         "INSERT INTO products(name, price, description, imageUrl) VALUES (?, ?, ?, ?)",
//         [this.name, this.price, this.description, this.imageUrl]
//       );
//     } catch (e) {
//       if (e) console.log(e);
//     }
//   }
//   // enables to call directly on Class Product
//   static async fetchAll() {
//     // let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
//     // if (!data) {
//     //   // if there is no data write an empty [] for storage
//     //   console.log("no data");
//     //   await fs.writeFile(`${filePath}/db.txt`, JSON.stringify([]));
//     // }
//     // let products = await JSON.parse(data);
//     // return products;
//     return db.execute("SELECT * FROM products");
//   }

//   static async findProduct(id) {
//     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
//   }

//   static async edit(product) {
//     const { name, imageUrl, price, description, id } = product;
//     const products = await this.getDataJSON();
//     for (let i = 0; i < products.length; i++) {
//       if (Number(products[i].id) === Number(product.id)) {
//         products[i] = {
//           ...product,
//           name,
//           imageUrl,
//           price,
//           description,
//           id: Number(id),
//         };
//       }
//       await fs.writeFile(`${filePath}/db.txt`, JSON.stringify(products));
//     }
//   }

//   static async delete(id) {
//     const products = await this.getDataJSON();
//     for (let i = 0; i < products.length; i++) {
//       if (products[i].id === id) {
//         products.splice(i, 1);
//       }
//     }

//     await fs.writeFile(`${filePath}/db.txt`, JSON.stringify(products));
//   }

//   static async getDataJSON() {
//     let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
//     let products = await JSON.parse(data);
//     return products;
//   }
// };

const Sequelize = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../utils/database");
// Define model attributes
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// export module
module.exports = Product
