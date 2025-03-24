const { sequelize } = require("../config/db")
const logger = require("../utils/logger")
const Admin = require("./admin")
const AdminActivities = require("./adminActivities")
const Gym = require("./gym")
const GymActivities = require("./gymActivities")
const Trainer = require("./trainer")
const TrainerActivities = require("./trainerActivities")
const Trainee = require("./trainee")
const TraineeActivities = require("./traineeActivities")

const db = {}
db.sequelize = sequelize

// models
db.Admin = Admin
db.AdminActivities = AdminActivities
db.Gym = Gym
db.GymActivities = GymActivities
db.Trainer = Trainer
db.TrainerActivities = TrainerActivities
db.Trainee = Trainee
db.TraineeActivities = TraineeActivities;

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
