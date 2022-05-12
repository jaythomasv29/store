const fs = require("fs/promises");
const path = require("../utils/path");
const filePath = `${path}/data`;
const Product = require("../models/product");

module.exports = class Cart {
  // static allows to be called on the class
  static async getCartItems() {
    // read from cart.txt
    let data = await fs.readFile(`${filePath}/cart.txt`, { encoding: "utf-8" });
    if (!data) {
      let cart = { products: [], totalPrice: 0 };
      cart.products.push({ ...productToAdd, quantity: 1 });
      await fs.writeFile(`${filePath}/cart.txt`, JSON.stringify(cart));
    }
    let cart = JSON.parse(data);
    return cart;
  }

  static async addProduct(id) {
    const productToAdd = await Product.findProduct(id);
    
    let cart = await this.getCartItems();
    // if the product already exists in the cart
    if (cart.products.find((product) => product.id === productToAdd.id)) {
      cart.products.map((product) => {
        if (product.id === productToAdd.id) {
          return { ...product, ...{ quantity: product.quantity++ } };
        } else {
          return product;
        }
      });
    } else {
      // case where product does not exist in cart yet
      cart.products.push({ ...productToAdd, quantity: 1 });
    }
    let totalPrice = cart.products.reduce((acc, product) => {
      return acc + Number(product.price * product.quantity);
    }, 0);

    await fs.writeFile(
      `${filePath}/cart.txt`,
      JSON.stringify({ ...cart, totalPrice })
    );
  }

  static async increaseCartItem(id) {
    let cart = await this.getCartItems();
    // if the product already exists in the cart
    const products = cart.products.map((product) => {
      //find the item that is related to the id,
      if (Number(product.id) === Number(id)) {
        return { ...product, quantity: ++product.quantity };
      } else {
        return product;
      }
    });
    let totalPrice = cart.products.reduce((acc, product) => {
      return acc + Number(product.price * product.quantity);
    }, 0);

    await fs.writeFile(
      `${filePath}/cart.txt`,
      JSON.stringify({ ...cart, products: products, totalPrice })
    );
  }

  static async decreaseCartItem(id) {
    let cart = await this.getCartItems()
    let decreasingItem = cart.products.find(product => Number(product.id) === Number(id))
    
    if(decreasingItem.quantity == 1) {
      await this.deleteCartItemQuantity(id)
    } else {
      const products = cart.products.map((product) => {
        //find the item that is related to the id,
        
        if (Number(product.id) === Number(id)) {
          return { ...product, quantity: --product.quantity };
        } else {
          return product;
        }
      });
      // console.log('de', products);
      let totalPrice = cart.products.reduce((acc, product) => {
        return acc + Number(product.price * product.quantity);
      }, 0);
  
      await fs.writeFile(
        `${filePath}/cart.txt`,
        JSON.stringify({ ...cart, products: products, totalPrice })
      );
    }
  
  }

  static async deleteCartItemQuantity(id) {
    let cart = await this.getCartItems()
    const revisedCart =  cart.products.filter(product => Number(product.id) !== Number(id))
    let totalPrice = cart.products.reduce((acc, product) => {
      return acc + Number(product.price * product.quantity);
    }, 0);
    await fs.writeFile(
      `${filePath}/cart.txt`,
      JSON.stringify({ ...cart, products: revisedCart, totalPrice })
    );
  }


};
