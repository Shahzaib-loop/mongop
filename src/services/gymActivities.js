const db = require("../models")
const logger = require("../utils/logger")
const GymActivities = db.sequelize.model('GymActivities')

const addActivity = async ({ gymId, action, activity }) => {
  try {
    return GymActivities.create({ gymId, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating Gym Activity: ${ err }` })
  }
}

module.exports = {
  addActivity,
}