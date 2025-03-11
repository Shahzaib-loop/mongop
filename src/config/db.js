const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const basename = path.basename(__filename)
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const { Pool } = require("pg")

const { mysql, mysql2, mongoDB } = require('./config')

const uri = `mongodb://${ mongoDB.hostname }:${ mongoDB.port }/${ mongoDB.database }`

async function connectDB() {
  try {
    await mongoose.connect(uri)
    logger.info("MongoDB connected successfully")
  }
  catch (error) {
    logger.error(`MongoDB connection Error: ${ error }`)
    process.exit(1)
  }
}

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
})

// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((err) => console.error("Connection error", err))

module.exports = { connectDB, pool }




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