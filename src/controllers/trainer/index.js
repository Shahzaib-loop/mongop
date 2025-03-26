const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainer = db.sequelize.model('Trainer')
const TrainerActivities = db.sequelize.model('TrainerActivities')
const {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,
} = require("../../services/trainer")

const trainerCreate = async (req, res) => {
  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      number = '',
      password = '',
    } = req?.body

    if (!(firstName && lastName && email && number && password)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainee = await createTrainer(req.body)

    await addActivity(TrainerActivities, trainee?.id, "TRAINER_CREATED", "trainer registered")

    responseHandler.created(res, "Trainer registered successfully", trainee)
  }
  catch (error) {
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerLogin = async (req, res) => {
  try {
    const tokens = await loginTrainer(req.body)

    responseHandler.success(res, "Trainer Login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerLogout = async (req, res) => {
  try {
    const tokens = await logoutTrainer(req.body)

    responseHandler.success(res, "Trainer Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainersData = async (req, res) => {
  try {
    const data = await getTrainers()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerData = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getTrainer(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    await updateTrainer(id, rest)

    await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    responseHandler.success(res, "Trainer Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await deleteTrainer(id)

    await addActivity(TrainerActivities, id, "TRAINER_DELETED", "trainer deleted")

    responseHandler.success(res, "Trainer Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await restoreTrainer(id)

    await addActivity(TrainerActivities, id, "TRAINER_RESTORED", "trainer restored")

    responseHandler.success(res, "Trainer Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

module.exports = {
  trainerCreate,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerUpdate,
  trainerDelete,
  trainerRestore,
}
