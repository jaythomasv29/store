const fs = require("fs/promises");
const path = require("../utils/path");
const filePath = `${path}/data`;

module.exports = class Product {
  constructor(name, imageUrl, description, price) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    try {
      // products.push(this)
      let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
      let products = await JSON.parse(data);
      let lastProd = await products[products.length - 1];
      if (!lastProd.id) {
        products.push({ ...this, id: 1 }); // give it an id
      } else {
        products.push({ ...this, id: lastProd.id++ }); // push product with incremented id
      }

      await fs.writeFile(`${filePath}/db.txt`, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }
  // enables to call directly on Class Product
  static async fetchAll() {
    let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
    if (!data) {
      // if there is no data write an empty [] for storage
      console.log("no data");
      await fs.writeFile(`${filePath}/db.txt`, JSON.stringify([]));
    }
    let products = await JSON.parse(data);
    return products;
  }

  static async findProduct(id) {
    let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
    let products = await JSON.parse(data);
    let foundProduct = products.find((product) => product.id === Number(id));

    return foundProduct;
  }

  static async edit(product) {
    const { name, imageUrl, price, description, id } = product;
    const products = await this.getDataJSON();
    for (let i = 0; i < products.length; i++) {
      if (Number(products[i].id) === Number(product.id)) {
        products[i] = {
          ...product,
          name,
          imageUrl,
          price,
          description,
          id: Number(id),
        };
      }
      await fs.writeFile(`${filePath}/db.txt`, JSON.stringify(products));
    }
  }

  static async delete(id) {
    const products = await this.getDataJSON();
    for (let i = 0; i < products.length; i++) {
      if(products[i].id === id) {
        products.splice(i, 1)
      }
    }
    
    await fs.writeFile(`${filePath}/db.txt`, JSON.stringify(products));
    
  }

  static async getDataJSON() {
    let data = await fs.readFile(`${filePath}/db.txt`, { encoding: "utf8" });
    let products = await JSON.parse(data);
    return products;
  }
};
