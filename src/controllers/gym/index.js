const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const uniqueCheck = require("../../utils/uniqueCheck")
const {
  registerGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
} = require("../../services/gym")

const gymRegister = async (req, res) => {
  try {
    const gym = await registerGym(req.body)

    responseHandler.created(res, "Gym Created successfully", gym)
  }
  catch (error) {
    logger.info(`${ error }`)
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymLogin = async (req, res) => {
  try {
    const tokens = await loginGym(req.body)

    responseHandler.success(res, "Gym Login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymLogout = async (req, res) => {
  try {
    const tokens = await logoutGym(req.body)

    responseHandler.success(res, "Gym Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymsData = async (req, res) => {
  try {
    const data = await getGyms()

    responseHandler.success(res, "Gyms Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymData = async (req, res) => {
  try {
    const data = await getGym()

    responseHandler.success(res, "Gym Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymUpdate = async (req, res) => {
  try {
    const data = await updateGym()

    responseHandler.success(res, "Gym Updated successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymDelete = async (req, res) => {
  try {
    const data = await deleteGym()

    responseHandler.success(res, "Gym Deleted successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

module.exports = {
  gymRegister,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymUpdate,
  gymDelete,
}
