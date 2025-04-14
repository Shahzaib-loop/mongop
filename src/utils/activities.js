const logger = require("./logger")

const addActivity = async (model, idField, idValue, action, activity, t) => {
  // try {
    console.log("Add Activity Data: ", model, idField, idValue, action, activity)

    return model.create({ [idField]: idValue, action, activity }, { transaction: t })
  // }
  // catch (err) {
  //   logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
  // }
}

// const addActivity = async (model, id, action, activity) => {
//   try {
//     console.log("Add Activity Data: ", model, id, action, activity)
//
//     return model.create({ id, action, activity })
//   }
//   catch (err) {
//     logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
//   }
// }

const addAdminActivity = async (model, gym_id, action, activity) => {
  try {
    console.log("Add Activity Data: ", model, gym_id, action, activity)

    return model.create({ gym_id, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
  }
}

const addGymActivity = async (model, id, action, activity) => {
  try {
    console.log("Add Activity Data: ", model, id, action, activity)

    return model.create({ id, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
  }
}

const addTrainerActivity = async (model, id, action, activity) => {
  try {
    console.log("Add Activity Data: ", model, id, action, activity)

    return model.create({ id, action, activity })
  }
  catch (err) {
    logger.error({ message: `Error Creating ${ model } Activity: ${ err }` })
  }
}

const addTraineeActivity = async (model, id, action, activity) => {
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
  addAdminActivity,
  addGymActivity,
  addTrainerActivity,
  addTraineeActivity,
}