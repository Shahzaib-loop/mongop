require('./associations')
const { sequelize } = require("../config/db")
const logger = require("../utils/logger")

const db = {}
db.sequelize = sequelize;

(async () => {
  try {
    await sequelize.authenticate()
    logger.info("PostgreSQL Connected Successfully")

    await sequelize.sync()
    logger.info("Tables synced!")
  }
  catch (err) {
    logger.error(`PostgreSQL connection Error: ${ err }`)
  }
})()

module.exports = db
