const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../utils/path')
const { products } = require('./admin')
const adminData = require('./admin').products

// path.join() returns a path joined together
// works on both Linux and Windows
router.get('/', (req, res, next) => {
  console.log(adminData)
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render('shop', {
    pageTitle : 'shop',
    prods: products,
    path: '/shop',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,

  })
})

module.exports = router