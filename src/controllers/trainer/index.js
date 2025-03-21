const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const uniqueCheck = require("../../utils/uniqueCheck")
const {
  registerTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
} = require("../../services/trainer")

const trainerRegister = async (req, res) => {
  try {
    const trainer = await registerTrainer(req.body)

    responseHandler.created(res, "Trainer registered successfully", trainer)
  }
  catch (error) {
    logger.info(`${ error }`)
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainerLogin = async (req, res) => {
  try {
    const tokens = await loginTrainer(req.body)

    responseHandler.success(res, "Trainer Login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainerLogout = async (req, res) => {
  try {
    const tokens = await logoutTrainer(req.body)

    responseHandler.success(res, "Trainer Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainersData = async (req, res) => {
  try {
    const data = await getTrainers()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainerData = async (req, res) => {
  try {
    const data = await getTrainer()

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainerUpdate = async (req, res) => {
  try {
    const data = await updateTrainer()

    responseHandler.success(res, "Trainer Updated successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const trainerDelete = async (req, res) => {
  try {
    const data = await deleteTrainer()

    responseHandler.success(res, "Trainer Deleted successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

module.exports = {
  trainerRegister,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerUpdate,
  trainerDelete,
}
