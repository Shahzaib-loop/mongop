const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const basename = path.basename(__filename)
const mongoose = require('mongoose')
const logger = require('../utils/logger')
const { mongoDB, pgdb, } = require('./config')
const { Pool, } = require("pg")

const uri = `mongodb://${ mongoDB.hostname }:${ mongoDB.port }/${ mongoDB.database }`

async function connectDB() {
  try {
    // await mongoose.connect(uri)
    // logger.info("MongoDB Connected Successfully")
  }
  catch (error) {
    // logger.error(`MongoDB connection Error: ${error}`)
    // process.exit(1)
  }
}

const pool = new Pool({
  user: pgdb.user,
  password: pgdb.password,
  host: pgdb.host,
  database: pgdb.database,
  port: pgdb.port,
  pool: {
    max: Number(pgdb.max) || 10,
    min: Number(pgdb.max) || 1,
    acquire: 30000,
    idle: 10000,
  },
})
//
// pool.connect()
//     .then(() => logger.info("PostgreSQL Connected Successfully"))
//     .catch(err => logger.error(`PostgreSQL connection Error: ${err}`))

const sequelize = new Sequelize(
  pgdb.database,
  'postgres',
  pgdb.password,
  {
    host: pgdb.host,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: Number(pgdb.max) || 10,
      min: Number(pgdb.max) || 1,
      acquire: 30000,
      idle: 10000,
    },
  })

module.exports = { connectDB, sequelize, pool }


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
//
// const db = {}
//
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
//
// db.sequelize = sequelize
// db.sequelize2 = sequelize2