const logger = require("./logger")

const addActivity = async (model, id, action, activity) => {
  try {
    console.log("Add Activity Data: ", model, id, action, activity)

    return model.create({ id, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
  }
}

module.exports = {
  addActivity,
}