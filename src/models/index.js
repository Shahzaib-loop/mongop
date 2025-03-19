const { sequelize } = require("../config/db")
const Admin = require("./admin")
const Trainer = require("./trainer")
const logger = require("../utils/logger")

const db = {}
db.sequelize = sequelize
db.Admin = Admin
db.Trainer = Trainer;

(async () => {
  try {
    await sequelize.authenticate()
    logger.info("PostgreSQL Connected Successfully")

    await sequelize.sync()
    logger.info("Tables synced!")
  } catch (err) {
    logger.error(`PostgreSQL connection Error: ${err}`)
  }
})()

module.exports = db
