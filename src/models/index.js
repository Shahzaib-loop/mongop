const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const basename = path.basename(__filename)
const mongoose = require('mongoose')

// const { mysql, mysql2, mongoDB } = require('../../config')

mongoose.connect(
  `mongodb://localhost:27017/institute`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(error => console.log('Cannot Connect To Mongo Database!', error))
mongoose.set('useCreateIndex', true)

// const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
//   host: mysql.hostname,
//   dialect: 'mysql',
//   logging: false,
//
//   pool: {
//     max: Number(mysql.pool.max),
//     min: Number(mysql.pool.min),
//     acquire: 30000,
//     idle: 10000
//   },
// })
//
// const sequelize2 = new Sequelize(mysql2.database, mysql2.username, mysql2.password, {
//   host: mysql2.hostname,
//   dialect: 'mysql',
//   logging: false,
//
//   pool: {
//     max: Number(mysql2.pool.max),
//     min: Number(mysql2.pool.min),
//     acquire: 30000,
//     idle: 10000
//   },
// })

const db = {}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize)
//
//     db[model.name] = model
//   })
//
// fs
//   .readdirSync(__dirname + '/db2')
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//   .forEach(file => {
//     const model2 = require(path.join(__dirname + '/db2', file))(sequelize2, Sequelize)
//
//     db[model2.name] = model2
//   })
//
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

// db.sequelize = sequelize
// db.sequelize2 = sequelize2

module.exports = db
