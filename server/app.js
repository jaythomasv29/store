const express = require('express')
const PORT = 4000
const app = express()
const bodyParser = require('express')
const path = require('path')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
// app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.urlencoded())
// app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/shop', shopRouter)

// const server = http.createServer(app)
// server.listen(PORT)
// same as below

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, ()=> {
  console.log('App is listening on port ' + PORT);
})

