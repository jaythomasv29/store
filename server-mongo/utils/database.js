// const mysql = require('mysql2')

// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "James123!",
//   port: 3306,
//   database: 'node-complete'
// })

// module.exports = pool.promise()
const { Sequelize } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('node-complete', 'root', 'James123!', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;