const { sequelize } = require("../config/db")
const logger = require("../utils/logger")
const Admin = require("./admin")
const Gym = require("./gym")
const Trainer = require("./trainer")
const Trainee = require("./trainee")

const db = {}
db.sequelize = sequelize
db.Admin = Admin
db.Gym = Gym
db.Trainer = Trainer
db.Trainee = Trainee;

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
