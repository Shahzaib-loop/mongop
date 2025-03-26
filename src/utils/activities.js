const logger = require("./logger")

const addActivity = async (model, gymId, action, activity) => {
  try {
    return model.create({ gymId, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating Gym Activity: ${ err }` })
  }
}

module.exports = {
  addActivity,
}