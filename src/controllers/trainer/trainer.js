const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainer = db.sequelize.model('trainers')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const trainer = require("../../services/trainer/trainer")

exports.trainerLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req?.body

    if (!(email && password)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    const resp = await trainer.loginTrainer({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    responseHandler.success(res, "Gym Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerLogout = async (req, res) => {
  try {
    const tokens = await trainer.logoutTrainer(req.body)

    responseHandler.success(res, "Trainer Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerActivities = async (req, res) => {
  try {
    const { id = '' } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    const data = await trainer.getTrainerActivities(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainersData = async (req, res) => {
  try {
    const data = await trainer.getAllTrainers()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerData = async (req, res) => {
  try {
    const { id = '' } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    const data = await trainer.getTrainerById(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerCreate = async (req, res) => {
  try {
    const tempPassword = 'tester'
    const {
      gym_id = '',
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

    let trainerData = await trainer.createTrainer({ ...req.body, password: password ? password : tempPassword })
    trainerData = await trainerData.toJSON()

    // await addActivity(TrainerActivities, trainer?.id, "TRAINER_CREATED", "trainer registered")

    responseHandler.created(res, "Trainer registered successfully", trainerData)
  }
  catch (error) {
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await trainer.updateTrainer(id, rest)

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    responseHandler.success(res, "Trainer Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await trainer.deleteTrainer(id)

    // await addActivity(TrainerActivities, id, "TRAINER_DELETED", "trainer deleted")

    responseHandler.success(res, "Trainer Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await trainer.restoreTrainer(id)

    // await addActivity(TrainerActivities, id, "TRAINER_RESTORED", "trainer restored")

    responseHandler.success(res, "Trainer Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
