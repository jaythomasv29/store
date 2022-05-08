const express = require('express')
const router = express.Router()
const path = require('path')

const rootDir = require('../utils/path')

router.get('/', (req, res, next) => {
  res.redirect('/admin/add')
})

router.get('/add', (req, res, next) => {
  console.log(rootDir)
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})


router.post('/add', (req, res) => {
  console.log(req.body)
  res.redirect('/shop')
})


module.exports = router