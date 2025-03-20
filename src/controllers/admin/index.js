const logger = require("../../utils/logger")
const responseHandler = require("../../utils/responseHandler")
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../services/admin")

const adminRegister = async (req, res) => {
  try {
    const user = await registerAdmin(req.body)

    responseHandler.created(res, "Admin registered successfully", user)
  }
  catch (error) {
    logger.info(`${ error }`)
    responseHandler.error(res, error.message, 500, error,)
  }
}

const adminLogin = async (req, res) => {
  try {
    const tokens = await loginAdmin(req.body)

    responseHandler.success(res, "Admin login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const adminLogout = async (req, res) => {
  try {
    const tokens = await logoutAdmin(req.body)

    responseHandler.success(res, "Admin logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const adminsData = async (req, res) => {
  try {
    const data = await getAdmins()

    responseHandler.success(res, "Admins Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const adminData = async (req, res) => {
  try {
    const data = await getAdmin()

    responseHandler.success(res, "Admin Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const adminUpdate = async (req, res) => {
  try {
    const data = await updateAdmin()

    responseHandler.success(res, "Admins Updated successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

const adminDelete = async (req, res) => {
  try {
    const data = await deleteAdmin()

    responseHandler.success(res, "Admins Deleted successfully", data)
  }
  catch (error) {
    responseHandler.error(res, error.message, 400, error,)
  }
}

module.exports = {
  adminRegister,
  adminLogin,
  adminLogout,
  adminsData,
  adminData,
  adminUpdate,
  adminDelete,
}
