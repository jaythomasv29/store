const fs = require('fs/promises')
const path = require('../utils/path')
const filePath = `${path}/data/db.txt`


module.exports = class Product {
  constructor(name) {
    this.name = name
  }
  async save() {
    try {
      // products.push(this)
      let data = await fs.readFile(filePath, {encoding: 'utf8'} )
      let products = await JSON.parse(data)
      products.push(this)
      
      await fs.writeFile(filePath, JSON.stringify(products))
    
    } catch(err) {
      console.log(err);
    }
  }
// enables to call directly on Class Product
   static async fetchAll() {
    let data = await fs.readFile(filePath, {encoding: 'utf8'} )
    let products = await JSON.parse(data)
    return products
  }
}