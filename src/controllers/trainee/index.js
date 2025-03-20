const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler');
const {
  registerTrainee,
  loginTrainee,
  logoutTrainee,
  getTrainees,
  getTrainee,
  updateTrainee,
  deleteTrainee,
} = require("../../services/trainee")

const traineeRegister = async (req, res) => {
  try {
    const trainee = await registerTrainee(req.body)

    responseHandler.created(res, "Trainee registered successfully", trainee)
  }
  catch (error) {
    logger.info(`${ error }`)
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineeLogin = async (req, res) => {
  try {
    const tokens = await loginTrainee(req.body)

    responseHandler.success(res, "Trainee Login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineeLogout = async (req, res) => {
  try {
    const tokens = await logoutTrainee(req.body)

    responseHandler.success(res, "Trainee Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineesData = async (req, res) => {
  try {
    const data = await getTrainees()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineeData = async (req, res) => {
  try {
    const data = await getTrainee()

    responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineeUpdate = async (req, res) => {
  try {
    const data = await updateTrainee()

    responseHandler.success(res, "Trainee Updated successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const traineeDelete = async (req, res) => {
  try {
    const data = await deleteTrainee()

    responseHandler.success(res, "Trainee Deleted successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

module.exports = {
  traineeRegister,
  traineeLogin,
  traineeLogout,
  traineesData,
  traineeData,
  traineeUpdate,
  traineeDelete,
}
